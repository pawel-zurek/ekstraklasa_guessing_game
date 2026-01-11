# Ekstraklasa Guessing Game

A web-based guessing game inspired by NBA Poeltl Game, featuring players from the Polish Ekstraklasa football league (Season 2025/26).

## How to Play

1.  **Guess the Player:** Type a player's name in the search box.
2.  **Get Hints:** After each guess, you will receive feedback:
    *   **Green:** The attribute matches the mystery player exactly.
    *   **Red:** The attribute does not match.
    *   **Arrows:** For numeric values (Age, Number), arrows indicate if the target value is higher or lower.
3.  **Win:** Guess the correct player within 7 tries!

## Features

*   Helpers to scrape the data from the Ekstraklasa website and scripts to load them into the sqlite database.
*   Daily mystery player selection.
*   Autocomplete search for players.
*   Visual feedback on Team, Position, Country, Age, and Number.

## Running locally

1.  **Clone the repo**
2.  **Install dependencies:** Run `pip install -r requirements.txt`.
3.  **Run the backend + frontend:** Run `uvicorn app.main:app --reload` and `npm install npm run dev` in another terminal
4.  **Access the backend and frontend:**  By default, backend at `Localhost:8000/docs` and frontend at `http://localhost:5173`

![Screenshot](photos/documentation.png)
