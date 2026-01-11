from sqlalchemy import Column, Integer, Date
from app.core.database import Base

class DailyVisit(Base):
    __tablename__ = "daily_visits"

    date = Column(Date, primary_key=True, index=True)
    count = Column(Integer, default=0)
