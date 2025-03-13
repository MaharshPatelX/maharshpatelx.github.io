"""
Database initialization module.

Functions to set up and initialize the MongoDB database with default data.
"""

import logging
import os
from flask import current_app
from werkzeug.security import generate_password_hash

def init_database(mongo):
    """Initialize the database with default data if collections are empty."""
    logger = logging.getLogger(__name__)
    
    # Check if admin credentials are provided in environment variables
    admin_username = os.getenv("ADMIN_USERNAME")
    admin_password = os.getenv("ADMIN_PASSWORD")
    
    if not admin_username or not admin_password:
        logger.error("ADMIN_USERNAME and ADMIN_PASSWORD must be set in .env file")
        raise EnvironmentError("ADMIN_USERNAME and ADMIN_PASSWORD must be set in .env file")
    
    try:
        # Create admin user if it doesn't exist
        if mongo.db.users.count_documents({}) == 0:
            logger.info(f"Creating admin user: {admin_username}")
            
            mongo.db.users.insert_one({
                "username": admin_username,
                "password": generate_password_hash(admin_password),
                "role": "admin"
            })
            
            logger.info("Admin user created successfully")
        
        # Initialize profile if it doesn't exist
        if mongo.db.profile.count_documents({}) == 0:
            logger.info("Creating default profile")
            
            mongo.db.profile.insert_one({
                "name": "Your Name",
                "title": "Machine Learning Engineer",
                "bio": "Building intelligent systems with data. Specialized in computer vision and natural language processing.",
                "email": "your.email@example.com",
                "phone": "(123) 456-7890",
                "github": "https://github.com/yourusername",
                "linkedin": "https://linkedin.com/in/yourprofile",
                "profile_image": "default-profile.jpg"
            })
            
            logger.info("Default profile created")
        
        # Create indexes
        logger.info("Creating database indexes")
        
        # Create index for messages collection (for faster date-based sorting)
        mongo.db.messages.create_index("date", background=True)
        
        # Create index for projects collection (for faster searching)
        mongo.db.projects.create_index("title", background=True)
        
        # Create text index for searching
        mongo.db.projects.create_index([
            ("title", "text"), 
            ("description", "text")
        ], background=True)
        
        logger.info("Database initialization complete")
    
    except Exception as e:
        logger.error(f"Error initializing database: {str(e)}")
        raise
# """
# Database initialization module.

# Functions to set up and initialize the MongoDB database with default data.
# """

# import logging
# from werkzeug.security import generate_password_hash

# def init_database(mongo):
#     """Initialize the database with default data if collections are empty."""
#     logger = logging.getLogger(__name__)
    
#     try:
#         # Create admin user if it doesn't exist
#         if mongo.db.users.count_documents({}) == 0:
#             logger.info("Creating default admin user")
            
#             # In production, use a more secure password or environment variable
#             default_password = "^01gG,+8{2£6}xrwv-c8"
            
#             mongo.db.users.insert_one({
#                 "username": "admin_maharsh",
#                 "password": generate_password_hash(default_password),
#                 "role": "admin"
#             })
            
#             logger.info("Default admin user created")
        
#         # Initialize profile if it doesn't exist
#         if mongo.db.profile.count_documents({}) == 0:
#             logger.info("Creating default profile")
            
#             mongo.db.profile.insert_one({
#                 "name": "Your Name",
#                 "title": "Machine Learning Engineer",
#                 "bio": "Building intelligent systems with data. Specialized in computer vision and natural language processing.",
#                 "email": "your.email@example.com",
#                 "phone": "(123) 456-7890",
#                 "github": "https://github.com/yourusername",
#                 "linkedin": "https://linkedin.com/in/yourprofile",
#                 "profile_image": "default-profile.jpg"
#             })
            
#             logger.info("Default profile created")
        
#         # Create indexes
#         logger.info("Creating database indexes")
        
#         # Create index for messages collection (for faster date-based sorting)
#         mongo.db.messages.create_index("date", background=True)
        
#         # Create index for projects collection (for faster searching)
#         mongo.db.projects.create_index("title", background=True)
        
#         # Create text index for searching
#         mongo.db.projects.create_index([
#             ("title", "text"), 
#             ("description", "text")
#         ], background=True)
        
#         logger.info("Database initialization complete")
    
#     except Exception as e:
#         logger.error(f"Error initializing database: {str(e)}")
#         raise