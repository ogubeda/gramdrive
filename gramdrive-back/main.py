from fastapi import FastAPI, HTTPException
from telethon import TelegramClient
from pydantic import BaseModel
import os

app = FastAPI()

API_ID = os.getenv("TG_API_ID")      # Consigue estos desde https://my.telegram.org
API_HASH = os.getenv("TG_API_HASH")
SESSION_FOLDER = "sessions"

os.makedirs(SESSION_FOLDER, exist_ok=True)

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

    try:
        await client.send_code_request(req.phone)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

    clients[req.phone] = client
    return {"message": "Código enviado"}

@app.post("/confirm-login")
async def confirm_login(req: CodeRequest):
    client = clients.get(req.phone)
    if not client:
        raise HTTPException(status_code=400, detail="No se ha iniciado login con este número")

    try:
        await client.sign_in(req.phone, req.code)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error al verificar código: {str(e)}")

    return {"message": "Login correcto"}

@app.get("/saved-files/{phone}")
async def list_saved_files(phone: str):
    session_path = os.path.join(SESSION_FOLDER, phone)
    client = TelegramClient(session_path, API_ID, API_HASH)
    await client.connect()

    files = []
    async for msg in client.iter_messages("me", limit=50):  # Puedes subir el limit
        if msg.file:
            files.append({
                "name": msg.file.name or "sin_nombre",
                "size": msg.file.size,
                "mime": msg.file.mime_type,
                "date": msg.date.isoformat()
            })

    await client.disconnect()
    return {"files": files}
