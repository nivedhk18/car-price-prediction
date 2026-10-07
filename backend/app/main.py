#The API acts as a boundary between the frontend and backend.

from fastapi import FastAPI
from app.routes.prediction import router as prediction_router


app = FastAPI()




@app.get("/") # Route
def root():
    return {
        "message": "AutoValue AI Backend is running"
    }


@app.get("/api/v1/health")
def health_check():
    return {
        "status": "ok"
    }

app.include_router(
    prediction_router,
    prefix="/api/v1"
)
#Take all routes inside prediction_router and
#add them to my main application under /api/v1.