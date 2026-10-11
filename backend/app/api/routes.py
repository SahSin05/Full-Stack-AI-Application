from fastapi import APIRouter
from app.schemas.prediction import (PredictionRequest,PredictionResponse)
from app.services.prediction_service import make_prediction
router=APIRouter()

@router.get("/health")
def health_check():
    return {
        "status":"healthy"
    }

@router.post("/predict", response_model=PredictionResponse)
def predict(request: PredictionRequest):
    result=make_prediction(request.input_text)
    return result



