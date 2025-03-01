"""
Routes package initialization.

This package contains all the route blueprints for the application.
"""

# Import blueprints to make them available when importing the package
from .public import public_bp
from .admin import admin_bp
from .auth import auth_bp
from .content import content_bp