from fastapi import APIRouter, HTTPException
from app.schemas.response import HealthResponse, SymptomListResponse
from app.services.predictor import predictor

router = APIRouter()

@router.get("/", response_model=dict)
async def root():
    return {"message": "MediSense AI API Running"}

@router.get("/health", response_model=HealthResponse)
async def health_check():
    if not predictor.is_loaded:
        raise HTTPException(status_code=503, detail="ML Model is not loaded")
    return HealthResponse(
        status="healthy",
        service="MediSense Disease Prediction AI Microservice"
    )

@router.get("/symptoms", response_model=SymptomListResponse)
async def get_symptoms():
    if not predictor.is_loaded or not predictor.symptom_list:
        raise HTTPException(status_code=503, detail="Symptom list not available")
    
    return SymptomListResponse(
        success=True,
        total=len(predictor.symptom_list),
        symptoms=predictor.symptom_list
    )
