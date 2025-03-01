"""
Flask extensions initialization.

This module initializes all Flask extensions used in the application.
Extensions are defined here to avoid circular import issues.
"""

from flask_pymongo import PyMongo

# Initialize extensions
mongo = PyMongo()