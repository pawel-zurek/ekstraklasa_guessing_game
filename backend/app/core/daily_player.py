from datetime import date
import random
from sqlalchemy.orm import Session

from app.models.player import Player
from app.models.daily_game import DailyGame


def get_daily_player(db: Session) -> Player:
    today = date.today()

    # 1️⃣ Check if today's game already exists
    daily_game = (
        db.query(DailyGame)
        .filter(DailyGame.date == today)
        .first()
    )

    if daily_game:
        player = db.query(Player).get(daily_game.player_id)
        if player:
            return player

    # 2️⃣ No game yet → pick random player
    player = (
        db.query(Player)
        .order_by(Player.id)
        .all()
    )

    if not player:
        raise RuntimeError("No players in database")

    chosen = random.choice(player)

    # 3️⃣ Store today's game
    daily_game = DailyGame(
        date=today,
        player_id=chosen.id,
        player_name=f"{chosen.first_name} {chosen.last_name}",
    )

    db.add(daily_game)
    db.commit()

    return chosen
