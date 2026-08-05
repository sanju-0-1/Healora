from contextlib import asynccontextmanager
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.config import settings
from app.api.health import router as health_router
from app.api.predict import router as predict_router
from app.services.predictor import predictor
from app.utils.logger import logger

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Load ML model into memory once
    logger.info("[Server Startup]: Initializing MediSense AI Microservice...")
    try:
        predictor.load_artifacts()
    except Exception as e:
        logger.error(f"[Startup Warning]: Model artifacts loading deferred/failed: {e}")
    yield
    # Shutdown
    logger.info("[Server Shutdown]: Cleaning up resources...")

app = FastAPI(
    title=settings.APP_NAME,
    description="Production-Ready Disease Prediction REST API powered by scikit-learn & FastAPI",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan
)

# Configure CORS
origins = [origin.strip() for origin in settings.CORS_ORIGINS.split(",") if origin.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global Exception Handler
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Global exception caught on {request.url}: {exc}")
    return JSONResponse(
        status_code=500,
        content={"success": False, "message": "An internal server error occurred", "detail": str(exc)}
    )

# Register API Routers
app.include_router(health_router, tags=["Health & Info"])
app.include_router(predict_router, tags=["Disease Prediction"])
