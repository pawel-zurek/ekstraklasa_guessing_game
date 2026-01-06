export type Comparison = {
  team: boolean;
  position: boolean;
  country: boolean;
  number: "higher" | "lower" | "equal";
  birthYear: "higher" | "lower" | "equal";
};

export type GuessResult = {
  status: "playing" | "won" | "lost";
  remaining_guesses: number;
  comparison: Comparison;
  guessed_player: Player;
  player?: Player;
};

export type Player = {
  id: number;
  first_name: string;
  last_name: string;
  team: string;
  number: number;
  position: string;
  country: string;
  birth_year: number;
  photo: string;
};
