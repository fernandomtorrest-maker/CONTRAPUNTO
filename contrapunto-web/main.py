# Requisitos: pip install fastapi uvicorn google-antigravity pydantic python-dotenv duckduckgo-search beautifulsoup4
import asyncio
import os
import urllib.parse
from bs4 import BeautifulSoup
from dotenv import load_dotenv
load_dotenv(".env.local")

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from google.antigravity import Agent, LocalAgentConfig # Importación del SDK de Antigravity
from duckduckgo_search import DDGS # Para búsqueda en segundo plano
import requests

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

STOP_WORDS = {
    "el", "la", "los", "las", "un", "una", "unos", "unas", "de", "del", "en", "para", 
    "con", "por", "que", "cual", "cuales", "como", "y", "o", "es", "son",
    "se", "lo", "los", "su", "sus", "al", "mi", "tu", "yo", "me", "te", "le", "nos", 
    "les", "este", "esta", "estos", "estas", "ese", "esa", "esos", "esas", 
    "aquel", "aquella", "aquellos", "aquellas", "quien", "quienes",
    "requisito", "requisitos", "exigencia", "exigencias", "norma", "normas", "normativa",
    "saber", "conocer", "buscar", "respuesta", "informacion", "sobre", "chile"
}

def clean_query(query: str) -> str:
    """Remueve stop-words de la consulta para optimizar los términos de búsqueda."""
    cleaned = "".join([c if c.isalnum() or c.isspace() else " " for c in query.lower()])
    words = cleaned.split()
    keywords = [w for w in words if w not in STOP_WORDS]
    return " ".join(keywords) if keywords else query

def search_ddg(query: str) -> list:
    """Intenta realizar la búsqueda web usando DuckDuckGo HTML scraper."""
    cleaned = clean_query(query)
    try:
        with DDGS() as ddgs:
            results = list(ddgs._text_html(cleaned, max_results=3))
            if results:
                return [{
                    "title": r.get("title"),
                    "body": r.get("body"),
                    "href": r.get("href")
                } for r in results]
    except Exception as e:
        print(f"Búsqueda DuckDuckGo fallida o con límite de tasa: {e}")
    return []

def search_wikipedia(query: str) -> list:
    """Búsqueda de respaldo en Wikipedia ante bloqueo de DuckDuckGo."""
    cleaned = clean_query(query)
    url = f"https://es.wikipedia.org/w/api.php?action=query&list=search&srsearch={urllib.parse.quote(cleaned)}&format=json"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    }
    try:
        r = requests.get(url, headers=headers, timeout=8)
        if r.status_code == 200:
            data = r.json()
            search_items = data.get("query", {}).get("search", [])
            results = []
            for item in search_items[:3]:
                title = item.get("title")
                snippet_html = item.get("snippet", "")
                snippet = BeautifulSoup(snippet_html, "html.parser").get_text()
                page_id = item.get("pageid")
                link = f"https://es.wikipedia.org/?curid={page_id}"
                
                results.append({
                    "title": f"{title} (Wikipedia)",
                    "body": snippet,
                    "href": link
                })
            return results
    except Exception as e:
        print(f"Búsqueda de Wikipedia fallida: {e}")
    return []

def search_ley_chile(query: str) -> list:
    """Consulta el servicio XML de Ley Chile para buscar leyes/normas chilenas."""
    cleaned = clean_query(query)
    if not cleaned or len(cleaned) < 3:
        return []
    url = f"https://www.leychile.cl/Consulta/obtxml?opt=61&cadena={urllib.parse.quote(cleaned)}"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    }
    try:
        r = requests.get(url, headers=headers, timeout=8)
        if r.status_code == 200:
            import xml.etree.ElementTree as ET
            root = ET.fromstring(r.content)
            results = []
            for norma in root.findall("Norma"):
                id_norma = norma.find("IdNorma")
                titulo = norma.find("TituloNorma")
                url_tag = norma.find("Url")
                fecha = norma.find("FechaPublicacion")
                
                title_text = titulo.text if titulo is not None else "Norma Oficial"
                url_text = url_tag.text if url_tag is not None else (f"https://www.leychile.cl/Navegar?idNorma={id_norma.text}" if id_norma is not None else "")
                fecha_text = fecha.text if fecha is not None else "N/A"
                
                if title_text and url_text:
                    # Clean title line breaks
                    title_text = " ".join(title_text.split())
                    results.append({
                        "title": f"{title_text} (Ley Chile)",
                        "body": f"Publicada el {fecha_text}. Norma oficial en la Biblioteca del Congreso Nacional.",
                        "href": url_text
                    })
            return results
    except Exception as e:
        print(f"Búsqueda Ley Chile fallida: {e}")
    return []

def get_search_results(query: str) -> list:
    """Estrategia híbrida de búsqueda en segundo plano."""
    combined = []
    
    # 1. Intentar con Ley Chile primero (fuente primaria para normativa chilena)
    try:
        leyes = search_ley_chile(query)
        if leyes:
            combined.extend(leyes[:3])
    except Exception as e:
        print(f"Error en búsqueda de Ley Chile: {e}")
        
    # 2. Intentar con DuckDuckGo para contexto general
    ddg = search_ddg(query)
    if ddg:
        combined.extend(ddg[:3])
    else:
        # Fallback a Wikipedia si DDG falla
        print("DuckDuckGo no disponible. Usando fallback de Wikipedia.")
        wiki = search_wikipedia(query)
        if wiki:
            combined.extend(wiki[:3])
            
    return combined[:5]

async def search_web(query: str) -> list:
    """Wrapper asíncrono para ejecutar la búsqueda híbrida en un hilo separado."""
    return await asyncio.to_thread(get_search_results, query)

@app.post("/api/chat")
async def chat_with_agent(request: ChatRequest):
    # 1. Ejecutar búsqueda híbrida en segundo plano
    search_results = await search_web(request.message)
    
    search_context = ""
    if search_results:
        search_context = "\n".join([
            f"- Título: {res.get('title')}\n  Resumen: {res.get('body')}\n  Fuente: {res.get('href')}"
            for res in search_results
        ])

    # 2. Intentar responder usando el Agente Técnico de Antigravity (IA de Google)
    try:
        async with Agent(config) as agent:
            # Si hay resultados de búsqueda, los inyectamos en las instrucciones como contexto
            prompt = SYSTEM_INSTRUCTIONS
            if search_context:
                prompt += f"\n\nINFORMACIÓN DE BÚSQUEDA WEB EN TIEMPO REAL (Utiliza esto para responder técnicamente):\n{search_context}"
            prompt += f"\n\nUsuario: {request.message}"
            
            response = await agent.chat(prompt)
            response_text = await response.text()
            
            return {
                "response": response_text,
                "conversation_id": request.conversation_id
            }
            
    except Exception as e:
        # Fallback Keyless si el agente falla por falta de API Key o credenciales inválidas (401)
        print(f"Agente Antigravity no disponible ({str(e)}). Retornando fallback de búsqueda estructurada.")
        
        fallback_response = "[BÚSQUEDA WEB EN SEGUNDO PLANO - MODO SIN API KEY]\n\n"
        if search_results:
            fallback_response += "Actualmente el motor principal de IA está en mantenimiento o sin credenciales, pero hemos recuperado la siguiente información en tiempo real para tu consulta:\n\n"
            for idx, res in enumerate(search_results, 1):
                fallback_response += f"{idx}. **{res.get('title')}**\n   {res.get('body')}\n   *Fuente: {res.get('href')}*\n\n"
            fallback_response += "Para cotizaciones precisas o detalles sobre tu obra, puedes contactarnos en contacto@contrapuntoconstructora.com."
        else:
            fallback_response += "El motor principal de IA está desconectado y no fue posible recuperar resultados de búsqueda en este momento. Por favor, reintenta más tarde o contáctanos a contacto@contrapuntoconstructora.com."
            
        return {
            "response": fallback_response,
            "conversation_id": request.conversation_id,
            "fallback": True
        }

if __name__ == "__main__":
    import uvicorn
    # Corre el servidor en el puerto 8000 de tu máquina o servidor de hosting
    uvicorn.run(app, host="0.0.0.0", port=8000)


