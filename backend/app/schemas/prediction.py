from pydantic import BaseModel

class PredictionRequest(BaseModel):
    input_text: str

class PredictionResponse(BaseModel):
    prediction: str
    confidence: float

    
