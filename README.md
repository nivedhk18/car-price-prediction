# 🚗 AutoValue AI — Used Car Price Prediction

AutoValue AI is a machine learning-powered web application that predicts the estimated price of a used car based on its specifications.

The project combines a **React frontend**, **FastAPI backend**, and a trained **Scikit-learn Linear Regression pipeline** to provide real-time car price predictions.

## ✨ Features

- Used car price prediction using Machine Learning
- Interactive React-based frontend
- FastAPI REST API backend
- Real-time prediction through the ML model
- Automatic input validation using Pydantic
- Dynamic Brand → Model selection
- Numeric input constraints based on the training dataset
- Loading state during prediction
- User-friendly error handling
- Automatic API documentation with Swagger UI
- Responsive prediction result display
- Environment-based API configuration

## 🧠 Machine Learning

The project uses **Linear Regression** as the final prediction model.

### Input Features

The model uses the following features:

- Brand
- Model
- Manufacturing Year
- Fuel Type
- Transmission
- Engine Capacity
- Kilometers Driven
- Ownership
- Spare Key

### Data Preprocessing

The preprocessing pipeline contains:

- `StandardScaler` for numerical features
- `OneHotEncoder` for categorical features
- `ColumnTransformer` to combine the preprocessing steps
- `LinearRegression` as the final estimator

The complete preprocessing and model pipeline is saved using `joblib`.

### Dataset

After data cleaning, the final dataset contained:

- **2,804 rows**
- **9 input features**
- **1 target variable**

The target variable is:

```text
price
```

### Model Performance

The baseline Linear Regression model achieved:

| Metric | Score |
|---|---:|
| MAE | ₹72,527 |
| RMSE | ₹121,663 |
| R² | 0.861 |

### Metric Meaning

**MAE (Mean Absolute Error)**  
Represents the average absolute difference between the predicted and actual prices.

**RMSE (Root Mean Squared Error)**  
Penalizes larger prediction errors more strongly than MAE.

**R² (R-squared)**  
Measures how much of the variation in car prices is explained by the model.

## 🏗️ System Architecture

```text
                         User
                           │
                           ▼
                  React Frontend
                           │
                    HTTP POST Request
                           │
                           ▼
                    FastAPI Backend
                           │
                           ▼
                  Pydantic Validation
                           │
                           ▼
                  Prediction Service
                           │
                           ▼
              Saved Scikit-learn Pipeline
                           │
              ┌────────────┴────────────┐
              │                         │
        Preprocessing              Linear Regression
              │                         │
              └────────────┬────────────┘
                           │
                           ▼
                    Predicted Price
                           │
                           ▼
                    React Result Card
```

## 📁 Project Structure

```text
car_price_prediction/
│
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py
│   │   │
│   │   ├── routes/
│   │   │   ├── __init__.py
│   │   │   └── prediction.py
│   │   │
│   │   ├── schemas/
│   │   │   ├── __init__.py
│   │   │   └── prediction.py
│   │   │
│   │   ├── services/
│   │   │   ├── __init__.py
│   │   │   └── prediction.py
│   │   │
│   │   └── ml/
│   │       ├── __init__.py
│   │       └── model.py
│   │
│   ├── models/
│   │   └── used_car_linear_regression.pkl
│   │
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── ...
│   │
│   ├── public/
│   ├── .env
│   ├── package.json
│   └── ...
│
├── .gitignore
└── README.md
```

## ⚙️ Backend Setup

### 1. Navigate to the backend

```bash
cd backend
```

### 2. Create a virtual environment

```bash
python -m venv venv
```

### 3. Activate the virtual environment

Windows:

```bash
venv\Scripts\activate
```

### 4. Install dependencies

```bash
pip install -r requirements.txt
```

### 5. Start FastAPI

```bash
uvicorn app.main:app --reload
```

The backend will run at:

```text
http://127.0.0.1:8000
```

## 💻 Frontend Setup

### 1. Navigate to the frontend

```bash
cd frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure the API URL

Create a `.env` file inside the frontend directory:

```env
VITE_API_URL=http://127.0.0.1:8000
```

### 4. Start the development server

```bash
npm run dev
```

The frontend will normally run at:

```text
http://localhost:5173
```

## 🔌 API

### Health Check

```http
GET /api/v1/health
```

Response:

```json
{
  "status": "ok"
}
```

### Predict Car Price

```http
POST /api/v1/predict
```

Example request:

```json
{
  "brand": "Toyota",
  "model": "Fortuner",
  "mfgYear": 2019,
  "fuelType": "Diesel",
  "transmission": "Automatic",
  "engineCapacity": 1995,
  "kmDriven": 45000,
  "ownership": "1st Owner",
  "spareKey": "Yes"
}
```

Example response:

```json
{
  "predictedPrice": 1026594,
  "currency": "INR"
}
```

## 📚 API Documentation

FastAPI automatically provides interactive API documentation.

Swagger UI:

```text
http://127.0.0.1:8000/docs
```

ReDoc:

```text
http://127.0.0.1:8000/redoc
```

## 🛡️ Validation

The backend validates incoming data before it reaches the ML model.

Examples:

```text
Manufacturing Year: 2010–2024
Engine Capacity: 624–2694 CC
Kilometers Driven: 450–143991 km
```

Invalid requests are rejected with an HTTP `422 Unprocessable Entity` response.

This prevents invalid data from being passed to the prediction pipeline.

## 🔄 Prediction Flow

```text
1. User enters car information
          ↓
2. React validates the form
          ↓
3. React sends POST request
          ↓
4. FastAPI receives the request
          ↓
5. Pydantic validates the input
          ↓
6. Prediction service creates a DataFrame
          ↓
7. Saved ML pipeline preprocesses the data
          ↓
8. Linear Regression predicts the price
          ↓
9. FastAPI returns the prediction
          ↓
10. React displays the estimated price
```

## 🧰 Technology Stack

### Frontend

- React
- Vite
- JavaScript
- CSS
- Lucide React

### Backend

- Python
- FastAPI
- Uvicorn
- Pydantic
- Pandas

### Machine Learning

- Scikit-learn
- Linear Regression
- StandardScaler
- OneHotEncoder
- ColumnTransformer
- Joblib

## 🚀 Future Improvements

Possible future improvements include:

- Deploying the frontend and backend
- Adding a database for prediction records
- Adding authentication
- Adding more car attributes
- Improving the model using additional features
- Experimenting with advanced regression algorithms
- Adding model monitoring
- Adding automated tests
- Adding CI/CD
- Improving production logging

## 👨‍💻 Author

**Nivedh K**

B.Tech Computer Science Engineering

---

## ⭐ Project Goal

The main goal of AutoValue AI is to demonstrate an end-to-end machine learning application, from **data preprocessing and model training to API development and frontend integration**.