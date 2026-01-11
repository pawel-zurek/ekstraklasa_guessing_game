from app.core.database import engine, Base

# Import models so SQLAlchemy knows about them
from app.models.player import Player
from app.models.daily_game import DailyGame
from app.models.daily_visit import DailyVisit


def init_db():
    Base.metadata.create_all(bind=engine)


if __name__ == "__main__":
    init_db()
    print("✅ Database initialized")
