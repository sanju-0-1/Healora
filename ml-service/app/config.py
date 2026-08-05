import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    APP_NAME: str = "MediSense AI Microservice"
    PORT: int = 8000
    HOST: str = "0.0.0.0"
    ENVIRONMENT: str = "development"
    LOG_LEVEL: str = "INFO"
    CORS_ORIGINS: str = "http://localhost:5173,http://localhost:3000,http://localhost:5000"

    class Config:
        env_file = ".env"
        extra = "ignore"

settings = Settings()
