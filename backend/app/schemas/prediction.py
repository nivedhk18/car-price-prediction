#A schema describes the structure of data.
#prediction.py defines the data structure used by our prediction API
#What data should look like
#Request & response validation
from pydantic import BaseModel


class CarData(BaseModel):
    brand: str
    model: str
    mfgYear: int
    fuelType: str
    transmission: str
    engineCapacity: float
    kmDriven: int
    ownership: str
    spareKey: str


class PredictionResponse(BaseModel):
    predictedPrice: int
    currency: str