import useProgress from "../state/useProgress";
import { t } from "../i18n";
import useTheme from "../state/useTheme";
import PageLayout from "../components/PageLayout";

export default function Rewards({ locale }) {
  const { xp, streak, badges } = useProgress();
  const { themeData } = useTheme();

  const badgeDefs = {
    FirstSteps: { name: "First Steps", desc: "Earn 50 XP by sharing and reflecting." },
    ConsistencyStar: { name: "Consistency Star", desc: "Earn 200 XP — steady and strong." },
  };

  return (
    <PageLayout
      title={t("rewards", locale)}
      subtitle="Track your progress and celebrate wins"
      hero="https://undraw.co/api/illustrations/9e2c4d7a-1b3f-4f7b-8a3e-2c4d7a1b3f9e.svg"
      gradient={themeData.gradient}
    >
      <Stat label={t("streak", locale)} value={`${streak} 🔥`} />
      <Stat label={t("xp", locale)} value={`${xp} ⭐`} />

      <div>
        <h3 className="font-semibold mb-2">{t("badges", locale)}</h3>
        <div className="grid grid-cols-2 gap-3">
          {badges.length === 0 && (
            <div className="text-slate-500">Start chatting to earn your first badge.</div>
          )}
          {badges.map((b) => (
            <div key={b} className="rounded-xl p-3 bg-white shadow">
              <div className="text-lg">🏅 {badgeDefs[b]?.name || b}</div>
              <div className="text-sm text-slate-600">{badgeDefs[b]?.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-xl p-4 bg-white shadow flex items-center justify-between mb-3">
      <span className="text-slate-600">{label}</span>
      <span className="text-xl font-semibold">{value}</span>
    </div>
  );
}