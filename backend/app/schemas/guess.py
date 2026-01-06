from pydantic import BaseModel, Field

class GuessRequest(BaseModel):
    player_id: int
    guess_number: int = Field(ge=1, le=7)
