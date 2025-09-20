import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Chat from "./pages/Chat";
import Rewards from "./pages/Rewards";
import Relief from "./pages/Relief";
import Journal from "./pages/Journal";
import Settings from "./pages/Settings";
import { LOCALES, t } from "./i18n";

export default function App() {
  const [route, setRoute] = useState("chat");
  const [locale, setLocale] = useState(localStorage.getItem("locale") || "en");

  const nav = [
    { key: "chat", label: t("appName", locale) },
    { key: "rewards", label: t("rewards", locale) },
    { key: "relief", label: t("relief", locale) },
    { key: "journal", label: t("journal", locale) },
    { key: "settings", label: t("settings", locale) },
  ];

  // ✅ Save locale to localStorage
  useEffect(() => localStorage.setItem("locale", locale), [locale]);

  // ✅ Connect to backend on load
  useEffect(() => {
    fetch("http://localhost:3000/api/hello")
      .then(res => res.json())
      .then(data => console.log("✅ Backend says:", data.message))
      .catch(err => console.error("❌ Backend error:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-rose-50 text-slate-800">
      <header className="flex items-center justify-between px-4 py-3 sticky top-0 bg-white/70 backdrop-blur border-b">
        <h1 className="font-semibold text-lg">{t("appName", locale)}</h1>
        <select
          className="border rounded px-2 py-1 text-sm"
          value={locale}
          onChange={(e) => setLocale(e.target.value)}
        >
          {LOCALES.map((l) => (
            <option key={l} value={l}>{l.toUpperCase()}</option>
          ))}
        </select>
      </header>

      <main className="max-w-2xl mx-auto p-4">
        {/* Tailwind test heading */}
        <h1 className="text-3xl font-bold underline mb-4">Hello Tailwind</h1>

        <motion.div key={route} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          {route === "chat" && <Chat locale={locale} />}
          {route === "rewards" && <Rewards locale={locale} />}
          {route === "relief" && <Relief locale={locale} />}
          {route === "journal" && <Journal locale={locale} />}
          {route === "settings" && <Settings />}
        </motion.div>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur border-t">
        <ul className="max-w-2xl mx-auto grid grid-cols-5">
          {nav.map((n) => (
            <li key={n.key}>
              <button
                className={`w-full py-2 text-sm ${route === n.key ? "text-indigo-600 font-semibold" : "text-slate-600"}`}
                onClick={() => setRoute(n.key)}
              >
                {n.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
