def is_safe(text):
    banned = ["hate", "kill", "suicide", "die", "worthless"]
    return not any(word in text.lower() for word in banned)
