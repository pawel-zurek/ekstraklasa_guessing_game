from datetime import date
from sqlalchemy.orm import Session
from app.models.daily_visit import DailyVisit
from app.core.database import SessionLocal

class VisitCounter:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(VisitCounter, cls).__new__(cls)
            cls._instance.current_date = date.today()
            cls._instance.count = 0
            # Try to load existing count for today from DB if server restarted
            cls._instance._load_initial_count()
        return cls._instance

    def _load_initial_count(self):
        db: Session = SessionLocal()
        try:
            today_visit = db.query(DailyVisit).filter(DailyVisit.date == self.current_date).first()
            if today_visit:
                self.count = today_visit.count
        except Exception as e:
            print(f"Error loading initial visit count: {e}")
        finally:
            db.close()

    def increment(self):
        today = date.today()
        
        if today != self.current_date:
            self.persist() # Save yesterday's data
            self.current_date = today
            self.count = 0 # Reset for new day
        
        self.count += 1

    def persist(self):
        """Save the current in-memory count to the database."""
        db: Session = SessionLocal()
        try:
            visit_record = db.query(DailyVisit).filter(DailyVisit.date == self.current_date).first()
            if not visit_record:
                visit_record = DailyVisit(date=self.current_date, count=self.count)
                db.add(visit_record)
            else:
                visit_record.count = self.count
            
            db.commit()
            print(f"Persisted visit count for {self.current_date}: {self.count}")
        except Exception as e:
            print(f"Error persisting visit count: {e}")
        finally:
            db.close()

visit_counter = VisitCounter()
