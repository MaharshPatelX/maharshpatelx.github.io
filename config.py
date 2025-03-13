"""
Configuration settings for the ML Portfolio application.
"""

import os
from datetime import timedelta

# Base directory of the application
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Admin credentials (for initial setup)
ADMIN_USERNAME = os.getenv("ADMIN_USERNAME")
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD")

# Environment settings
ENV = os.getenv("FLASK_ENV", "development")
DEBUG = ENV == "development"

# Secret key (use environment variable in production)
SECRET_KEY = os.getenv("SECRET_KEY", "dev-secret-key-change-this-in-production")

# Session configuration
SESSION_TYPE = "filesystem"
PERMANENT_SESSION_LIFETIME = timedelta(days=1)

# MongoDB configuration
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/ml_portfolio")

# File upload settings
UPLOAD_FOLDER = os.path.join(BASE_DIR, "static", "uploads")
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif"}
MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16 MB max upload size

# Ensure required directories exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(os.path.join(BASE_DIR, "logs"), exist_ok=True)

# Logging configuration
LOG_FORMAT = "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
LOG_FILE = os.path.join(BASE_DIR, "logs", "app.log")
LOG_LEVEL = "INFO"

# Security settings
SESSION_COOKIE_SECURE = ENV != "development"
SESSION_COOKIE_HTTPONLY = True
SESSION_COOKIE_SAMESITE = "Lax"