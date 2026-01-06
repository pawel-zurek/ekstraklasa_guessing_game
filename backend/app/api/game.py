from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import date

from app.core.database import SessionLocal
from app.core.daily_player import get_daily_player
from app.schemas.guess import GuessRequest
from app.schemas.result import GuessResponse
from app.utils.comparison import compare_players
from app.models.player import Player

router = APIRouter(prefix="/game", tags=["game"])

MAX_GUESSES = 7

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/today")
def game_today(db: Session = Depends(get_db)):
    player = get_daily_player(db)

    return {
        "date": date.today().isoformat(),
        "max_guesses": MAX_GUESSES,
        "player_id": player.id  # optional, for debugging
    }


@router.post("/guess", response_model=GuessResponse)
def make_guess(payload: GuessRequest, db: Session = Depends(get_db)):
    if payload.guess_number > MAX_GUESSES:
        raise HTTPException(status_code=400, detail="No guesses remaining")

    target = get_daily_player(db)
    guess = db.query(Player).get(payload.player_id)

    if not guess:
        raise HTTPException(status_code=404, detail="Player not found")

    is_correct = guess.id == target.id
    remaining = MAX_GUESSES - payload.guess_number

    comparison = compare_players(guess, target)

    if is_correct:
        return {
            "status": "won",
            "remaining_guesses": remaining,
            "comparison": comparison,
            "player": {
                "id": target.id,
                "first_name": target.first_name,
                "last_name": target.last_name,
                "team": target.team,
                "number": target.number,
                "position": target.position,
                "country": target.country,
                "birth_year": target.birth_year,
                "photo": target.photo,
            }
        }

    if payload.guess_number == MAX_GUESSES:
        return {
            "status": "lost",
            "remaining_guesses": 0,
            "comparison": comparison,
            "player": {
                "id": target.id,
                "first_name": target.first_name,
                "last_name": target.last_name,
                "team": target.team,
                "number": target.number,
                "position": target.position,
                "country": target.country,
                "birth_year": target.birth_year,
                "photo": target.photo,
            }
        }

    return {
        "status": "playing",
        "remaining_guesses": remaining,
        "comparison": comparison,
        "player": None
    }
