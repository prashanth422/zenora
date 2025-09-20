import useTheme, { THEMES } from "../state/useTheme";
import PageLayout from "../components/PageLayout";
import settingsHero from "../assets/settings-hero.svg";

export default function Settings() {
  const { theme, setTheme, themeData } = useTheme();

  return (
    <PageLayout
      title="Settings"
      subtitle="Customize your Zenora experience"
hero="https://undraw.co/api/illustrations/9e2c4d7a-1b3f-4f7b-8a3e-2c4d7a1b3f9e.svg"
      gradient={themeData.gradient}
    >
      <div className="space-y-4">
        <div className="bg-white rounded-2xl p-4 shadow">
          <h3 className="font-semibold mb-1">Theme</h3>
          <select
            className="border rounded px-2 py-1"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
          >
            {Object.keys(THEMES).map((t) => (
              <option key={t} value={t}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow">
          <h3 className="font-semibold mb-1">Anonymous mode</h3>
          <p className="text-sm text-slate-600">
            You’re using Zenora anonymously. No phone or email is required for this prototype.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow">
          <h3 className="font-semibold mb-1">About</h3>
          <p className="text-sm text-slate-600">
            Zenora is an empathetic companion for youth mental wellness, with cultural sensitivity for India.
          </p>
        </div>
      </div>
    </PageLayout>
  );
}
