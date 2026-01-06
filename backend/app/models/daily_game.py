from sqlalchemy import Column, Integer, Date, String
from app.core.database import Base


class DailyGame(Base):
    __tablename__ = "daily_games"

    id = Column(Integer, primary_key=True, index=True)
    date = Column(Date, unique=True, nullable=False)

    player_id = Column(Integer, nullable=False)
    player_name = Column(String, nullable=False)
