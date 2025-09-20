from flask import Flask, request, jsonify
import os
import sys

# Ensure local imports work
sys.path.append(os.path.dirname(__file__))

from emotion_model import detect_emotion
from chat_model import generate_reply
from safety_filter import is_safe

app = Flask(__name__)

@app.route("/api/emotion", methods=["POST"])
def emotion():
    data = request.get_json()
    text = data.get("text", "")
    emotion = detect_emotion(text)
    return jsonify({ "emotion": emotion })

@app.route("/api/chat", methods=["POST"])
def chat():
    data = request.get_json()
    text = data.get("text", "")
    if not is_safe(text):
        return jsonify({ "reply": "Let's talk about something uplifting 💛" })
    reply = generate_reply(text)
    return jsonify({ "reply": reply })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
