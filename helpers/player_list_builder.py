import os
import json
import pandas as pd
import requests

input_dir = "../player_jsons"
images_dir = "../photos"

if not os.path.exists(images_dir):
    os.makedirs(images_dir)

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0.1 Safari/605.1.15',
    'Referer': 'https://www.ekstraklasa.org/'
}

all_players = []

print("Downloading...")

for filename in os.listdir(input_dir):
    if filename.endswith(".json"):
        club_slug = filename.replace(".json", "")
        club_display_name = club_slug.replace("-", " ").title()

        club_folder = os.path.join(images_dir, club_slug)
        if not os.path.exists(club_folder):
            os.makedirs(club_folder)

        file_path = os.path.join(input_dir, filename)

        with open(file_path, 'r', encoding='utf-8') as f:
            content = json.load(f)

        image_map = {}
        details_map = {}

        for item in content.get('included', []):
            item_id = item.get('id')
            item_type = item.get('type')

            if item_type == 'image':

                variants = item.get('attributes', {}).get('variants', {})
                url = variants.get('full', {}).get('url')
                if url:
                    image_map[item_id] = url

            elif item_type == 'player':

                attr = item.get('attributes', {})
                details_map[item_id] = {
                    'born_on': attr.get('date_of_birth', 'Brak not_available'),
                    'country': attr.get('country_code', 'not_available')
                }

        for entry in content.get('data', []):
            attr = entry.get('attributes', {})
            rel = entry.get('relationships', {})


            player_rel = rel.get('player')
            player_id = player_rel.get('data', {}).get('id') if player_rel and player_rel.get('data') else None

            image_rel = rel.get('image')
            image_id = image_rel.get('data', {}).get('id') if image_rel and image_rel.get('data') else None

            p_details = details_map.get(player_id, {})
            img_url = image_map.get(image_id)

            first_name = attr.get('first_name', '')
            last_name = attr.get('last_name', '')
            player_name_slug = f"{first_name}_{last_name}".lower().replace(" ", "_").replace("/", "_")

            filename_img = f"{player_name_slug}.png"
            local_img_path = os.path.join(club_folder, filename_img)

            if img_url and not os.path.exists(local_img_path):
                try:
                    r = requests.get(img_url, headers=HEADERS, timeout=10)
                    if r.status_code == 200:
                        with open(local_img_path, 'wb') as f_img:
                            f_img.write(r.content)
                except:
                    pass


            all_players.append({
                'team': club_display_name,
                'first_name': first_name,
                'last_name': last_name,
                'number': attr.get('number'),
                'position': attr.get('position'),
                'country': p_details.get('country'),
                'born_on': p_details.get('born_on'),
                'photo': local_img_path if img_url else 'Brak'
            })

df = pd.DataFrame(all_players)
df.to_csv('ekstraklasa_final.csv', index=False, encoding='utf-8-sig')

print(f"\nDone! Downloaded {len(df)} players.")