from fastapi import FastAPI,HTTPException
from pymongo import MongoClient
from pydantic import BaseModel,EmailStr
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime, timedelta, timezone
import secrets

app = FastAPI()

# class Restaurant(BaseModel):
#     restaurantName: str
#     address: str
#     phoneNumber: str
#     email: EmailStr
#     password: str
    
class SignupForm(BaseModel):
    restaurantName: str
    address: str
    phoneNumber: str
    email: EmailStr
    password: str

class LoginForm(BaseModel):
    email: EmailStr
    password: str    

app = FastAPI()

mongodb_uri = 'mongodb+srv://raghugaikwad8641:Raghugaikwad8@userinfo.d4n8sns.mongodb.net/?retryWrites=true&w=majority'
port = 8000
client = MongoClient(mongodb_uri, port)
db = client['Khatejao']
user_collection = db['Restaurant_management']

@app.post("/restaurantsignup")
async def signup(form: SignupForm):
    try:
        user_exists = user_collection.find_one({"email": form.email})
        if user_exists:
            raise HTTPException(status_code=400, detail="User already exists. Please sign in.")

        if not any(char.isdigit() for char in form.password):
            raise HTTPException(status_code=400, detail="Password must contain at least one digit")

        if not any(char.isupper() for char in form.password):
            raise HTTPException(status_code=400, detail="Password must contain at least one uppercase letter")

        user_data = {
            "restaurantName": form.restaurantName,
            "email": form.email,
            "password": form.password,
            "phoneNumber": form.phoneNumber,
            "address": form.address,
        }

        user_collection.insert_one(user_data)

        return {"message": "Signup successful"}

    except Exception as e:
        return {"error": str(e)}
    

@app.post("/restologin")
def login(form: LoginForm):
    existing_user = user_collection.find_one({"email": form.email})

    if not existing_user:
        raise HTTPException(status_code=404, detail="User not found")

    if existing_user["password"] != form.password:
        raise HTTPException(status_code=401, detail="Invalid password")

    session_token = secrets.token_hex(16) 
    token_expiration = datetime.now(timezone.utc) + timedelta(minutes=10)
    user_collection.update_one(
        {"email": form.email},
        {"$set": {"session_token": session_token, "token_expiration": token_expiration}}
    )
    return {"session_token": session_token, "message": "Login successful"}    
    


# @app.post('/restaurant')
# async def create_restaurant(restaurant: Restaurant):
#     restaurant_data = restaurant.dict()
#     user_collection.insert_one(restaurant_data)
#     return {'message': 'Restaurant created successfully'}


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)  
