from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pathlib import Path

from app.api import game, players

app = FastAPI(title="Ekstraklasa Guessing Game")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Static photos
BASE_DIR = Path(__file__).resolve().parents[2]
PHOTOS_DIR = BASE_DIR / "photos"
app.mount("/photos", StaticFiles(directory=PHOTOS_DIR), name="photos")

# ✅ NO extra prefixes here
app.include_router(game.router)
app.include_router(players.router)
