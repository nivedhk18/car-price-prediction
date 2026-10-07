#A router is a way of grouping related API endpoints.
#this file will become responsible for:Prediction-related HTTP endpoints.
#HTTP endpoints related to prediction
from fastapi import APIRouter #APIRouter creates a smaller group of API routes.
from app.schemas.prediction import CarData, PredictionResponse
from app.services.prediction import predict_car_price


router = APIRouter()  #This creates a router object.


@router.post(
    "/predict",
    response_model=PredictionResponse
)
def predict(car: CarData):
   result = predict_car_price(car)
   return result