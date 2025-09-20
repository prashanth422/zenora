def detect_emotion(text):
    text = text.lower()
    if "happy" in text or "great" in text or "excited" in text:
        return "joyful"
    elif "sad" in text or "tired" in text or "down" in text:
        return "sad"
    elif "angry" in text or "frustrated" in text:
        return "angry"
    elif "anxious" in text or "worried" in text:
        return "anxious"
    else:
        return "neutral"
