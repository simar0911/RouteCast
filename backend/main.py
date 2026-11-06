
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

app = FastAPI(
    title="RouteCast API",
    description="Intelligent Delivery ETA and Delay Prediction System",
    version="1.0.0"
)

# Allow our React frontend to communicate with FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class DeliveryRequest(BaseModel):
    distance_km: float = Field(gt=0, le=10000)
    order_value: float = Field(ge=0)
    number_of_items: int = Field(gt=0)
    purchase_hour: int = Field(ge=0, le=23)
    purchase_day: int = Field(ge=0, le=6)


@app.get("/")
def home():
    return {
        "message": "Welcome to RouteCast!",
        "status": "Running"
    }


@app.get("/health")
def health_check():
    return {"status": "healthy"}


@app.post("/predict")
def predict_delivery(request: DeliveryRequest):
    return {
        "message": "Delivery details received successfully!",
        "input_details": request.model_dump(),
        "prediction_status": "Model integration pending"
    }
