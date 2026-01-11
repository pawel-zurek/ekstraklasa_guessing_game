import csv
from datetime import datetime
from pathlib import Path

from app.core.database import SessionLocal
from app.models.player import Player

BASE_DIR = Path(__file__).resolve().parents[2]
CSV_PATH = BASE_DIR / "data" / "ekstraklasa_final.csv"



def load_csv():
    db = SessionLocal()

    try:
        with open(CSV_PATH, newline="", encoding="utf-8-sig") as csvfile:
            reader = csv.DictReader(csvfile)

            players_added = 0

            for row in reader:
                # Skip rows with missing critical data
                if not all([
                    row.get("team"),
                    row.get("first_name"),
                    row.get("last_name"),
                    row.get("number"),
                    row.get("position"),
                    row.get("country"),
                    row.get("born_on"),
                ]):
                    continue

                # Extract birth date
                try:
                    birth_date_str = row["born_on"]
                    # Format in CSV is YYYY-MM-DD based on sample
                    birth_date = datetime.strptime(birth_date_str, "%Y-%m-%d").date()
                except ValueError:
                    continue

                player = Player(
                    team=row["team"],
                    first_name=row["first_name"],
                    last_name=row["last_name"],
                    number=int(row["number"]),
                    position=row["position"],
                    country=row["country"],
                    birth_date=birth_date,
                    photo=row.get("photo"),
                )

                db.add(player)
                players_added += 1

            db.commit()
            print(f"✅ Loaded {players_added} players")

    finally:
        db.close()


if __name__ == "__main__":
    load_csv()
