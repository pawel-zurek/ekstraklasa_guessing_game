def compare_players(guess, target):
    comparison = {
        "team": guess.team == target.team,
        "position": guess.position == target.position,
        "country": guess.country == target.country,
        "number": None,
        "age": None,
    }

    if guess.number == target.number:
        comparison["number"] = "equal"
    elif guess.number > target.number:
        comparison["number"] = "lower"
    else:
        comparison["number"] = "higher"

    if guess.birth_date == target.birth_date:
        comparison["age"] = "equal"
    elif guess.birth_date < target.birth_date:
        comparison["age"] = "older"
    else:
        comparison["age"] = "younger"

    return comparison
