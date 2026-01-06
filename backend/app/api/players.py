from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import or_

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
        .filter(
            or_(
                Player.first_name.ilike(f"%{q}%"),
                Player.last_name.ilike(f"%{q}%"),
            )
        )
        .limit(10)
        .all()
    )

    return [
        {
            "id": p.id,
            "first_name": p.first_name,
            "last_name": p.last_name,
            "team": p.team,
            "number": p.number,
            "position": p.position,
            "country": p.country,
            "birth_year": p.birth_year,
            "photo": p.photo,
        }
        for p in players
    ]
