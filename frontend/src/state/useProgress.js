import { useState, useEffect } from "react";

export default function useProgress() {
  const [xp, setXP] = useState(() => {
    const stored = localStorage.getItem("xp");
    return stored ? parseInt(stored) : 0;
  });

  const [streak, setStreak] = useState(() => {
    const stored = localStorage.getItem("streak");
    return stored ? parseInt(stored) : 0;
  });

  const [lastDate, setLastDate] = useState(() => {
    return localStorage.getItem("lastJournalDate") || "";
  });

  useEffect(() => {
    localStorage.setItem("xp", xp.toString());
  }, [xp]);

  useEffect(() => {
    localStorage.setItem("streak", streak.toString());
  }, [streak]);

  useEffect(() => {
    if (lastDate) {
      localStorage.setItem("lastJournalDate", lastDate);
    }
  }, [lastDate]);

  function addXP(amount = 10) {
    setXP((prev) => prev + amount);
  }

  function addStreak() {
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    if (lastDate === today) return; // already counted today

    const yesterday = new Date(Date.now() - 86400000)
      .toISOString()
      .split("T")[0];

    if (lastDate === yesterday) {
      setStreak((prev) => prev + 1);
    } else {
      setStreak(1); // reset streak
    }

    setLastDate(today);
  }

  function resetProgress() {
    setXP(0);
    setStreak(0);
    setLastDate("");
    localStorage.removeItem("xp");
    localStorage.removeItem("streak");
    localStorage.removeItem("lastJournalDate");
  }

  return {
    xp,
    streak,
    addXP,
    addStreak,
    resetProgress,
  };
}
