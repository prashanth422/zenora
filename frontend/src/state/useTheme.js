import { useState, useEffect } from "react";

export const THEMES = {
  sunrise: {
    label: "🌅 Sunrise",
    gradient: "from-pink-200 via-orange-100 to-yellow-200",
    accent: "bg-pink-500",
  },
  ocean: {
    label: "🌊 Ocean",
    gradient: "from-blue-200 via-cyan-100 to-teal-200",
    accent: "bg-blue-500",
  },
  forest: {
    label: "🌳 Forest",
    gradient: "from-green-200 via-emerald-100 to-lime-200",
    accent: "bg-green-500",
  },
  neon: {
    label: "🌈 Neon",
    gradient: "from-purple-300 via-pink-200 to-cyan-200",
    accent: "bg-purple-500",
  },
};

export const THEME_KEYS = Object.keys(THEMES); // ["sunrise", "ocean", "forest", "neon"]

export default function useTheme() {
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem("theme");
    return stored && THEMES[stored] ? stored : "sunrise";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return {
    theme,
    setTheme,
    themeData: THEMES[theme],
    themeList: THEME_KEYS.map((key) => ({
      key,
      label: THEMES[key].label,
    })),
  };
}
