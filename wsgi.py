"""
WSGI entry point for production deployment.

This file is used by WSGI servers (like Gunicorn or uWSGI) to serve the application.
"""

from app import application

if __name__ == "__main__":
    application.run()