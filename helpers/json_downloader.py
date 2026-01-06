import requests
import json
import os
import time

clubs = {
    "199": "arka-gdynia",
    "8": "bruk-bet-termalica-nieciecza",
    "1": "cracovia",
    "167": "gks-katowice",
    "2": "gornik-zabrze",
    "4": "jagiellonia-bialystok",
    "18": "kghm-zaglebie-lubin",
    "67": "korona-kielce",
    "5": "lech-poznan",
    "6": "lechia-gdansk",
    "7": "legia-warszawa",
    "166": "motor-lublin",
    "9": "piast-gliwice",
    "10": "pogon-szczecin",
    "11": "radomiak-radom",
    "12": "rakow-czestochowa",
    "69": "widzew-lodz",
    "17": "wisla-plock"
}

output_dir = "../player_jsons"
os.makedirs(output_dir, exist_ok=True)

HEADERS = {
    "Accept": "application/json, text/plain, */*",
    "Authorization": "548e70be68e804aad3f7f779f43129ae",
    "Origin": "https://www.ekstraklasa.org",
    "Referer": "https://www.ekstraklasa.org/",
    "User-Agent": "Mozilla/5.0",
    "Accept-Language": "pl"
}

def get_latest_squad_id(club_id):
    """Fetch club data and return the highest squad ID."""
    url = (
        f"https://production-umpire-api.ekstraklasa.tisagroup.ch/api/v3/"
        f"clubs/{club_id}?include=background_photo,additional_asset,image,venue,teams"
    )

    r = requests.get(url, headers=HEADERS, timeout=15)
    r.raise_for_status()
    data = r.json()

    squad_ids = []

    for item in data.get("included", []):
        if item.get("type") == "team":
            squads = item.get("relationships", {}).get("squads", {}).get("data", [])
            for squad in squads:
                try:
                    squad_ids.append(int(squad["id"]))
                except (KeyError, ValueError):
                    pass

    if not squad_ids:
        raise ValueError(f"No squads found for club {club_id}")

    return max(squad_ids)


print(f"Downloading data for {len(clubs)} teams...\n")

for club_id, club_name in clubs.items():
    print(f"Processing {club_name} (club_id={club_id})")

    try:
        # STEP 1: get latest squad_id
        squad_id = get_latest_squad_id(club_id)
        print(f"  → Latest squad_id: {squad_id}")

        # STEP 2: fetch squad players
        api_url = (
            "https://production-umpire-api.ekstraklasa.tisagroup.ch/api/v3/"
            f"squad_players?filter%5Bsquad_id_eq%5D={squad_id}"
            "&filter%5Bstatus_eq%5D=active&include=image,player,squad"
        )

        r = requests.get(api_url, headers=HEADERS, timeout=15)
        r.raise_for_status()

        file_path = os.path.join(output_dir, f"{club_name}.json")
        with open(file_path, "w", encoding="utf-8") as f:
            json.dump(r.json(), f, ensure_ascii=False, indent=4)

        print("  ✔ Players downloaded\n")

    except Exception as e:
        print(f"  ✖ Error: {e}\n")

    time.sleep(1)

print("All files saved to 'player_jsons/'")
