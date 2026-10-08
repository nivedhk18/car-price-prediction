#A schema describes the structure of data.
#prediction.py defines the data structure used by our prediction API
#What data should look like
#Request & response validation
from pydantic import BaseModel, Field


class CarData(BaseModel):
    brand: str = Field(..., min_length=1)
    model: str = Field(..., min_length=1)

    mfgYear: int = Field(
        ...,       #means the value is required.
        ge=2010,
        le=2024
    )

    fuelType: str = Field(..., min_length=1)

    transmission: str = Field(..., min_length=1)

    engineCapacity: float = Field(
        ...,
        ge=624,
        le=2694
    )

    kmDriven: int = Field(
        ...,
        ge=450,
        le=143991
    )

    ownership: str = Field(..., min_length=1)

    spareKey: str = Field(..., min_length=1)


class PredictionResponse(BaseModel):
    predictedPrice: float
    currency: str
    