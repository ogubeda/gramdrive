from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from telethon import TelegramClient
from pydantic import BaseModel
from dotenv import load_dotenv

import os

app = FastAPI()

load_dotenv()

API_ID = os.getenv("TG_API_ID")      # Consigue estos desde https://my.telegram.org
API_HASH = os.getenv("TG_API_HASH")
SESSION_FOLDER = "sessions"

os.makedirs(SESSION_FOLDER, exist_ok=True)

origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:5173",
    "http://localhost:5174"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class LoginRequest(BaseModel):
    phone: str

class CodeRequest(BaseModel):
    phone: str
    code: str

clients = {}

@app.post("/start-login")
async def start_login(req: LoginRequest):
    session_path = os.path.join(SESSION_FOLDER, req.phone)
    client = TelegramClient(session_path, API_ID, API_HASH)
    await client.connect()

    phone = f'+34{req.phone}'
    try:
        await client.send_code_request(phone)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

    clients[req.phone] = client
    return { "message": "Código enviado", "success": True }

@app.post("/check-login")
async def check_login(req: LoginRequest):
    phone = f'+34{req.phone}'
    session_path = os.path.join(SESSION_FOLDER, req.phone)
    client = TelegramClient(session_path, API_ID, API_HASH)
    await client.connect()

    return { "message": "Login iniciado", "success": True }

@app.post("/confirm-login")
async def confirm_login(req: CodeRequest):
    phone = f'+34{req.phone}'
    client = clients.get(phone)
    if not client:
        raise HTTPException(status_code=400, detail="No se ha iniciado login con este número")

    try:
        await client.sign_in(req.phone, req.code)
        print("Login correcto")
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error al verificar código: {str(e)}")

    return { "message": "Login correcto", "success": True }

@app.get("/messages/{phone}")
async def list_saved_files(phone: str):
    phone = f'+34{phone}'
    session_path = os.path.join(SESSION_FOLDER, phone)
    client = clients.get(phone)
    await client.connect()
    print('Se ha realizado la conexion')

    files = []
    async for msg in client.iter_messages("me"):  # Puedes subir el limit
        if msg.file:
            files.append({
                "name": msg.file.name or "sin_nombre",
                "size": msg.file.size,
                "mime": msg.file.mime_type,
                "date": msg.date.isoformat()
            })

    await client.disconnect()
    return {"files": files}
