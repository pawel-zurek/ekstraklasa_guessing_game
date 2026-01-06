from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.models.player import Player

router = APIRouter(prefix="/players", tags=["players"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/search")
def search_players(q: str, db: Session = Depends(get_db)):
    players = (
        db.query(Player)
        .filter((Player.first_name + " " + Player.last_name).ilike(f"%{q}%"))
        .all()
    )

    return [
        {
            "id": p.id,
            "label": f"{p.first_name} {p.last_name} ({p.team})"
        }
        for p in players
    ]
