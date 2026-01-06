from sqlalchemy import Column, Integer, String
from app.core.database import Base

class Player(Base):
    __tablename__ = "players"

    id = Column(Integer, primary_key=True, index=True)
    team = Column(String)
    first_name = Column(String)
    last_name = Column(String)
    number = Column(Integer)
    position = Column(String)
    country = Column(String)
    birth_year = Column(Integer)
    photo = Column(String)
