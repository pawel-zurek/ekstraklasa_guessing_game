from pydantic import BaseModel
from typing import Optional, Dict, Any

class GuessResponse(BaseModel):
    status: str
    remaining_guesses: int
    comparison: Dict[str, Any]
    player: Optional[Dict[str, Any]] = None
