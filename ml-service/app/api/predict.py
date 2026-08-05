import time
from fastapi import APIRouter, HTTPException
from app.schemas.request import PredictionRequest, BatchPredictionRequest
from app.schemas.response import PredictionResponse, BatchPredictionResponse
from app.services.predictor import predictor
from app.utils.logger import logger

router = APIRouter()

@router.post("/predict", response_model=PredictionResponse)
async def predict_disease(request: PredictionRequest):
    start_time = time.time()
    try:
        if not predictor.is_loaded:
            raise HTTPException(status_code=503, detail="Prediction model is not initialized")

        result = predictor.predict(request.symptoms)
        elapsed_ms = round((time.time() - start_time) * 1000, 2)
        logger.info(f"[Inference Success]: Predicted '{result['primaryDisease']}' ({result['confidence']}%) in {elapsed_ms}ms")

        return PredictionResponse(
            success=True,
            prediction=result
        )
    except HTTPException as he:
        raise he
    except Exception as e:
        logger.error(f"[Inference Error]: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Internal prediction processing error: {str(e)}")

@router.post("/predict/batch", response_model=BatchPredictionResponse)
async def predict_batch_diseases(batch_request: BatchPredictionRequest):
    start_time = time.time()
    try:
        if not predictor.is_loaded:
            raise HTTPException(status_code=503, detail="Prediction model is not initialized")

        results = []
        for req in batch_request.patients:
            res = predictor.predict(req.symptoms)
            results.append(res)

        elapsed_ms = round((time.time() - start_time) * 1000, 2)
        logger.info(f"[Batch Inference Success]: Processed {len(results)} patients in {elapsed_ms}ms")

        return BatchPredictionResponse(
            success=True,
            predictions=results
        )
    except HTTPException as he:
        raise he
    except Exception as e:
        logger.error(f"[Batch Inference Error]: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Internal batch prediction error: {str(e)}")
