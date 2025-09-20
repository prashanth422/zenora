import { useState, useEffect } from "react";
import PageLayout from "../components/PageLayout";
import useTheme from "../state/useTheme";
import { t } from "../i18n";

export default function Chat({ locale }) {
  const { themeData } = useTheme();
  const [input, setInput] = useState("");
  const [reply, setReply] = useState("");
  const [emotion, setEmotion] = useState("");
  const [loading, setLoading] = useState(false);

  const BACKEND_URL = "https://zenora-backend.onrender.com/api/chat"; // Replace with your live URL

  async function getReply() {
    try {
      setLoading(true);
      const res = await fetch(BACKEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input }),
      });

      if (!res.ok) throw new Error("Server error");

      const data = await res.json();
      setReply(data.reply || "Zenora didn’t respond.");
      setEmotion(data.emotion || "");
    } catch (err) {
      console.error("❌ Chat failed:", err);
      setReply("Something went wrong. Try again later.");
      setEmotion("");
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    getReply();
  };

  useEffect(() => {
    if (reply) {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }
  }, [reply]);

  return (
    <PageLayout
      title={t("chat", locale)}
      subtitle="Talk to Zenora"
      hero="https://undraw.co/api/illustrations/9e2c4d7a-1b3f-4f7b-8a3e-2c4d7a1b3f9e.svg"
      gradient={themeData.gradient}
    >
      <div className="mb-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            className="w-full border rounded-xl p-3"
            rows={4}
            placeholder="Tell Zenora how you're feeling…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            className={`${themeData.accent} px-4 py-2 text-white rounded-xl`}
          >
            Send
          </button>
        </form>

        {loading && (
          <div className="mt-4 text-slate-500">Zenora is thinking…</div>
        )}

        {reply && (
          <div className="mt-4 p-4 bg-white rounded-xl shadow">
            {emotion && (
              <div className="text-2xl mb-2">🧠 Detected Mood: {emotion}</div>
            )}
            <div className="text-slate-600 mb-2">Zenora says:</div>
            <div className="text-slate-800 whitespace-pre-wrap">{reply}</div>
          </div>
        )}
      </div>
    </PageLayout>
  );
}
