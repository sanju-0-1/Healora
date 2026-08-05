from pydantic import BaseModel, Field, field_validator
from typing import List

class PredictionRequest(BaseModel):
    symptoms: List[str] = Field(
        ...,
        min_items=1,
        max_items=17,
        description="List of patient symptoms (1 to 17 symptoms, unique)",
        example=["fever", "vomiting", "headache"]
    )

    @field_validator('symptoms')
    def validate_symptoms(cls, v):
        if not v:
            raise ValueError("Symptoms list cannot be empty.")
        
        # Check for duplicates after normalizing whitespace & lowercase
        normalized = [s.strip().lower() for s in v]
        if len(normalized) != len(set(normalized)):
            raise ValueError("Duplicate symptoms are not allowed in the request.")
            
        return normalized

class BatchPredictionRequest(BaseModel):
    patients: List[PredictionRequest] = Field(..., min_items=1, max_items=50)
