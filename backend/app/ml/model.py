import joblib
#imports the library that can load your saved ML model

MODEL_PATH = "models/used_car_linear_regression.pkl"

model = joblib.load(MODEL_PATH)

