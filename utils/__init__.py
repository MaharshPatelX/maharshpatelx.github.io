"""
Utilities package initialization.

This package contains utility functions for the application.
"""

# Import utilities to make them available when importing the package
from .auth import login_required, admin_required
from .file_handlers import save_upload_file, delete_file, allowed_file
from .db_init import init_database