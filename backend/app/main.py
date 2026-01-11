from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pathlib import Path

from app.api import game, players
from contextlib import asynccontextmanager
from app.core.visit_counter import visit_counter

@asynccontextmanager
async def lifespan(app: FastAPI):
    yield
    print("Shutting down, persisting visit count...")
    visit_counter.persist()

app = FastAPI(title="Ekstraklasa Guessing Game", lifespan=lifespan)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
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
