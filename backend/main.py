from fastapi import FastAPI, File, UploadFile, HTTPException
from typing import Any, List
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from db import save_file_info, get_user_files
from process import process_query_and_files  # Import the processing logic

# Load environment variables from .env file (if any)
load_dotenv()

class Response(BaseModel):
    result: str | None

origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000"
]

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/predict", response_model=Response)
async def predict(query: str, files: List[UploadFile] = File(...)) -> Any:
    # Process user query and files
    file_texts = []
    for file in files:
        content = await file.read()
        file_texts.append(content.decode("utf-8"))

    # Process the query and files
    result = process_query_and_files(query, file_texts)
  
    return {"result": result}
