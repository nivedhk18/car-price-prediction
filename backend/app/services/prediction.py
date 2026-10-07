#What should the application actually do?
#Prediction/business logic
import pandas as pd
from app.ml.model import model




def predict_car_price(car):
    input_data = pd.DataFrame([{
        "brand": car.brand,
        "model": car.model,
        "transmission": car.transmission,
        "make_year": car.mfgYear,
        "fuel_type": car.fuelType,
        "engine_capacity(CC)": car.engineCapacity,
        "km_driven": car.kmDriven,
        "ownership": car.ownership,
        "spare_key": car.spareKey
    }])
    predicted_price = model.predict(input_data)[0]
    return {
        "predictedPrice": int(predicted_price),
        "currency": "INR"
    }