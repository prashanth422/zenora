import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import useProgress from "../state/useProgress";
import { t } from "../i18n";
import useTheme from "../state/useTheme";
import PageLayout from "../components/PageLayout";

export default function Journal({ locale }) {
  const { themeData } = useTheme();
  const [mood, setMood] = useState(localStorage.getItem("mood") || "");
  const [entry, setEntry] = useState("");
  const [filter, setFilter] = useState("All");
  const { addXP, addStreak } = useProgress();

  useEffect(() => {
    localStorage.setItem("mood", mood);
  }, [mood]);

  async function detectMood(text) {
    try {
      const res = await fetch("http://localhost:5000/api/emotion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      return data.emotion || "😐";
    } catch (err) {
      console.error("❌ Mood detection failed:", err);
      return "😐";
    }
  }

  async function save() {
    if (!entry.trim()) return;

    const autoMood = await detectMood(entry.trim());
    const finalMood = mood || autoMood;

    const newEntry = {
      at: new Date().toISOString(),
      mood: finalMood,
      entry: entry.trim(),
    };

    const history = JSON.parse(localStorage.getItem("journal") || "[]");
    history.unshift(newEntry);
    localStorage.setItem("journal", JSON.stringify(history.slice(0, 50)));

    saveEntry(newEntry.entry);

    setEntry("");
    addXP(10);
    addStreak();
  }

  function saveEntry(text) {
    fetch("http://localhost:3000/api/journal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          console.log("✅ Journal saved:", data.entry);
        } else {
          console.error("❌ Save failed:", data.error);
        }
      })
      .catch(err => console.error("❌ Backend error:", err));
  }

  const moods = ["🙂", "😐", "😔", "😟", "😤", "😴", "😄"];

  return (
    <PageLayout
      title={t("journal", locale)}
      subtitle="Reflect on your day"
      hero="https://undraw.co/api/illustrations/9e2c4d7a-1b3f-4f7b-8a3e-2c4d7a1b3f9e.svg"
      gradient={themeData.gradient}
    >
      <div className="mb-4">
        <div className="mb-2 text-slate-600">{t("todayMood", locale)}</div>
        <div className="flex gap-2 mb-2">
          {moods.map((m) => (
            <button
              key={m}
              className={`text-2xl ${
                mood === m ? "ring-2 ring-indigo-500 rounded-full" : ""
              }`}
              onClick={() => setMood(m)}
            >
              {m}
            </button>
          ))}
        </div>
        <textarea
          className="w-full mt-3 border rounded-xl p-3"
          rows={4}
          placeholder="Write a few lines…"
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
        />
        <button
          className={`${themeData.accent} mt-3 px-4 py-2 text-white rounded-xl`}
          onClick={save}
        >
          Save
        </button>
      </div>

      <div className="mb-4">
        <label className="text-slate-600 mr-2">Filter by mood:</label>
        <select
          className="border rounded px-2 py-1"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All</option>
          {moods.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      <History filter={filter} />
    </PageLayout>
  );
}

function History({ filter }) {
  const items = JSON.parse(localStorage.getItem("journal") || "[]");
  const filtered = filter === "All" ? items : items.filter((i) => i.mood === filter);

  if (filtered.length === 0) return null;

  return (
    <div className="space-y-2">
      {filtered.map(({ at, mood, entry }, index) => (
        <div key={index} className="p-4 bg-white rounded-xl shadow">
          <div className="text-sm text-slate-500 mb-1">
            {new Date(at).toLocaleString()}
          </div>
          <div className="text-xl mb-2">{mood}</div>
          <div className="text-slate-700 whitespace-pre-wrap">{entry}</div>
        </div>
      ))}
    </div>
  );
}
