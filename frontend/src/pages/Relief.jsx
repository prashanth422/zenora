import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { t } from "../i18n";
import useTheme from "../state/useTheme";
import PageLayout from "../components/PageLayout";

export default function Relief({ locale }) {
  const { themeData } = useTheme();

  return (
    <PageLayout
      title={t("relief", locale)}
      subtitle="Quick tools to calm your mind"
      hero="https://undraw.co/api/illustrations/9e2c4d7a-1b3f-4f7b-8a3e-2c4d7a1b3f9e.svg"
      gradient={themeData.gradient}
    >
      <Breathing locale={locale} accent={themeData.accent} />
      <Grounding />
      <Resources />
    </PageLayout>
  );
}

function Breathing({ locale, accent }) {
  const [running, setRunning] = useState(false);
  const controls = useAnimation();
  const [phase, setPhase] = useState("Inhale");

  useEffect(() => {
    if (!running) return;
    let i = 0;
    const seq = [
      { label: "Inhale", dur: 4000, scale: 1.1 },
      { label: "Hold", dur: 2000, scale: 1.1 },
      { label: "Exhale", dur: 4000, scale: 0.9 },
      { label: "Hold", dur: 2000, scale: 0.9 },
    ];
    let active = true;
    (async function loop() {
      while (active) {
        const step = seq[i % seq.length];
        setPhase(step.label);
        await controls.start({ scale: step.scale, transition: { duration: step.dur / 1000 } });
        i++;
      }
    })();
    return () => { active = false; };
  }, [running, controls]);

  return (
    <div className="bg-white rounded-2xl p-5 shadow text-center mb-4">
      <div className="text-slate-600 mb-2">{t("startBreathing", locale)}</div>
      <motion.div animate={controls} className="w-32 h-32 mx-auto rounded-full bg-indigo-100 grid place-items-center">
        <span className="text-indigo-700 font-semibold">{phase}</span>
      </motion.div>
      <button className={`mt-4 px-4 py-2 rounded-xl ${accent} text-white`} onClick={() => setRunning(r => !r)}>
        {running ? "Stop" : "Start"}
      </button>
    </div>
  );
}

function Grounding() {
  const steps = [
    "Name 5 things you can see.",
    "Name 4 things you can touch.",
    "Name 3 things you can hear.",
    "Name 2 things you can smell.",
    "Name 1 thing you can taste.",
  ];
  return (
    <div className="bg-white rounded-2xl p-5 shadow mb-4">
      <h3 className="font-semibold mb-2">5‑4‑3‑2‑1 Grounding</h3>
      <ul className="list-disc pl-6 space-y-1 text-slate-700">
        {steps.map((s) => <li key={s}>{s}</li>)}
      </ul>
    </div>
  );
}

function Resources() {
  return (
    <div className="bg-white rounded-2xl p-5 shadow">
      <h3 className="font-semibold mb-2">Support resources</h3>
      <p className="text-sm text-slate-600">
        If you feel in danger or in crisis, consider contacting local helplines or someone you trust.
      </p>
    </div>
  );
}