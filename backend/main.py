from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from pathlib import Path
import os
from openai import OpenAI

# Load environment variables
load_dotenv(dotenv_path=Path(".env"))

# ✅ FastAPI app instance
app = FastAPI()

# ✅ CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can restrict this to your Firebase domain later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ OpenAI client (new syntax for openai>=1.0.0)
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

@app.get("/")
def root():
    return {"message": "Zenora backend live (OpenAI v1.0+)"}

@app.get("/chat")
def chat(message: str = Query(...)):
    try:
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": "You are Zenora, a friendly and supportive AI companion."},
                {"role": "user", "content": message}
            ]
        )
        return {"reply": response.choices[0].message.content}
    except Exception as e:
        return {"error": str(e)}
