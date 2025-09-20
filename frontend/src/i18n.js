export const LOCALES = ["en", "hi", "te"];

export const t = (key, locale = "en") => {
  const dict = {
    en: {
      appName: "Zenora",
      inputPlaceholder: "Type how you feel…",
      send: "Send",
      rewards: "Rewards",
      relief: "Relief",
      journal: "Journal",
      settings: "Settings",
      streak: "Streak",
      xp: "XP",
      badges: "Badges",
      startBreathing: "Start breathing",
      todayMood: "Today's mood",
    },
    hi: {
      appName: "ज़ेनोरा",
      inputPlaceholder: "कैसा महसूस कर रहे हो…",
      send: "भेजें",
      rewards: "रिवार्ड्स",
      relief: "राहत",
      journal: "जर्नल",
      settings: "सेटिंग्स",
      streak: "स्ट्रिक",
      xp: "XP",
      badges: "बैज",
      startBreathing: "शुरू करें",
      todayMood: "आज का मूड",
    },
    te: {
      appName: "జెనోరా",
      inputPlaceholder: "ఎలా అనిపిస్తుంది…",
      send: "పంపు",
      rewards: "రివార్డ్స్",
      relief: "రిలీఫ్",
      journal: "జర్నల్",
      settings: "సెట్టింగ్స్",
      streak: "స్ట్రీక్",
      xp: "XP",
      badges: "బాడ్జ్‌లు",
      startBreathing: "ప్రారంభించు",
      todayMood: "ఈరోజు భావం",
    },
  };
  return dict[locale]?.[key] ?? dict.en[key] ?? key;
};
