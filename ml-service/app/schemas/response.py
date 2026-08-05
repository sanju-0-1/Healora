from pydantic import BaseModel
from typing import List, Optional

class TopPrediction(BaseModel):
    disease: str
    confidence: float

class PredictionDetail(BaseModel):
    primaryDisease: str
    confidence: float
    topPredictions: List[TopPrediction]
    matchedSymptoms: List[str]
    missingSymptoms: List[str]
    doctor: str
    severity: str
    precautions: List[str]

class PredictionResponse(BaseModel):
    success: bool = True
    prediction: PredictionDetail

class BatchPredictionResponse(BaseModel):
    success: bool = True
    predictions: List[PredictionDetail]

class HealthResponse(BaseModel):
    status: str
    service: str
    version: str = "1.0.0"

class SymptomListResponse(BaseModel):
    success: bool = True
    total: int
    symptoms: List[str]
