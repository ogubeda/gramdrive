import asyncio
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
]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class LoginRequest(BaseModel):
    phone: str

class CreateMessageRequest(BaseModel):
    message: str

class VerificationData(BaseModel):
    phone: str
    code: str
    codeHash: str

session_name = "sessions/user"

client = TelegramClient(session_name, API_ID, API_HASH)

@app.on_event("startup")
async def startup_event():
    await client.connect()

@app.on_event("shutdown")
async def shutdown_event():
    await client.disconnect()

@app.post("/send-code")
async def send_code(req: LoginRequest):
    phone = req.phone

    # #Await de 2 segundos para testear loading
    # await asyncio.sleep(2)

    # return { "success": True, "phone_code_hash": "2323sdsd" }
    try:
        # Envía la solicitud de código. El resultado contiene 'phone_code_hash'
        result = await client.send_code_request(phone)
        return { "message": "Código enviado", "phone_code_hash": result.phone_code_hash, "success": True }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@app.post("/verify-code")
async def verify_code(data: VerificationData):
    try:
        # Se utiliza client.sign_in para completar la autenticación
        user = await client.sign_in(phone=data.phone, code=data.code, phone_code_hash=data.codeHash)
        return { "message": "Autenticación completada", "user": str(user), "success": True }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/check")
async def check():
    try:
        if await client.is_user_authorized():
            user = await client.get_me()
            return { "message": "Autenticación completada", "user": str(user), "success": True }
        else:
            return { "message": "No autenticado", "success": False }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# Get messages
@app.get("/messages")
async def get_messages():
    try:
        # "me" hace referencia al chat de Mensajes Guardados
        messages = await client.get_messages("me", limit=20)
        # print(messages)

        # Transformamos los mensajes para devolver datos relevantes (por ejemplo, id, texto y fecha)
        messages_data = [
            {"id": msg.id, "text": msg.message, "date": msg.date.isoformat() if msg.date else None}
            for msg in messages
        ]
        return {"messages": messages_data}
    except Exception as e:
        print(e)

        raise HTTPException(status_code=400, detail=str(e))

# Create message
@app.post("/messages")
async def send_message(req: CreateMessageRequest):
    try:
        await client.send_message("me", req.message)
        return {"message": "Mensaje enviado", "success": True}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# Update message
@app.put("/messages/{message_id}")
async def update_message(message_id: int, req: CreateMessageRequest):
  try:
      await client.edit_message("me", message_id, req.message)
      return {"message": "Mensaje actualizado", "success": True}
  except Exception as e:
      raise HTTPException(status_code=400, detail=str(e))

# Delete message    
@app.delete("/messages/{message_id}")
async def delete_message(message_id: int):
    try:
        await client.delete_messages("me", [message_id])
        return {"message": "Mensaje eliminado", "success": True}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
