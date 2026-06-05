# Requisitos: pip install fastapi uvicorn google-antigravity pydantic python-dotenv
import asyncio
import os
from dotenv import load_dotenv
load_dotenv(".env.local")

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from google.antigravity import Agent, LocalAgentConfig # Importación del SDK de Antigravity

app = FastAPI(title="API de Agente de Construcción - Antigravity")

# Configurar CORS para permitir que tu sitio web se conecte a esta API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # En producción, reemplaza "*" por la URL de tu sitio web
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Estructura del mensaje que recibirá tu backend desde el chat de la web
class ChatRequest(BaseModel):
    message: str
    conversation_id: str = "default"

# Configuración básica del agente local de Antigravity
config = LocalAgentConfig()

# Instrucciones del sistema para el agente
SYSTEM_INSTRUCTIONS = """
Eres el Ingeniero de Obras y Consultor Técnico de Contrapunto Constructora, una firma chilena de arquitectura, diseño y construcción de alta gama. Tu propósito es responder consultas de clientes y prospectos de manera rigurosamente técnica, precisa y objetiva.

INSTRUCCIONES DE TONO Y COMPORTAMIENTO:
1. Sé estrictamente técnico, profesional y pragmático.
2. Evita cualquier tipo de lenguaje condescendiente o rodeos vacíos.
3. Responde directamente a la consulta del usuario usando terminología de arquitectura, ingeniería civil y construcción chilena.
4. Si el usuario requiere cálculos estructurales o de carga complejos, recomiéndale realizar un estudio estructural profesional formal y agendar con el equipo técnico de Contrapunto.
"""

@app.post("/api/chat")
async def chat_with_agent(request: ChatRequest):
    try:
        # Inicializamos el agente de Antigravity usando su manejador de contexto asíncrono
        async with Agent(config) as agent:
            # Enviamos el contexto de comportamiento junto con el mensaje del usuario
            prompt = f"{SYSTEM_INSTRUCTIONS}\n\nUsuario: {request.message}"
            response = await agent.chat(prompt)
            response_text = await response.text()
            
            return {
                "response": response_text,
                "conversation_id": request.conversation_id
            }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al procesar la solicitud con Antigravity: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    # Corre el servidor en el puerto 8000 de tu máquina o servidor de hosting
    uvicorn.run(app, host="0.0.0.0", port=8000)
