"""
API routes for retrieving and updating data.

This module contains API endpoints for retrieving data for admin forms.
"""

from flask import Blueprint, jsonify, current_app
from bson.objectid import ObjectId
from extensions import mongo
from utils.auth import login_required

# Create blueprint
api_bp = Blueprint('api', __name__)

# Get Project by ID
@api_bp.route('/projects/<project_id>', methods=['GET'])
@login_required
def get_project(project_id):
    """Get project data by ID."""
    try:
        project = mongo.db.projects.find_one({"_id": ObjectId(project_id)})
        
        if not project:
            return jsonify({"success": False, "error": "Project not found"}), 404
        
        # Add image URL
        project["image_url"] = current_app.config["UPLOAD_FOLDER"] + "/" + project.get("image", "default-project.jpg")
        
        # Convert ObjectId to string for JSON serialization
        project["_id"] = str(project["_id"])
        
        return jsonify({"success": True, "project": project})
    
    except Exception as e:
        current_app.logger.error(f"Error fetching project: {str(e)}")
        return jsonify({"success": False, "error": str(e)}), 500

# Get Experience by ID
@api_bp.route('/experiences/<experience_id>', methods=['GET'])
@login_required
def get_experience(experience_id):
    """Get experience data by ID."""
    try:
        experience = mongo.db.experiences.find_one({"_id": ObjectId(experience_id)})
        
        if not experience:
            return jsonify({"success": False, "error": "Experience not found"}), 404
        
        # Convert ObjectId to string for JSON serialization
        experience["_id"] = str(experience["_id"])
        
        return jsonify({"success": True, "experience": experience})
    
    except Exception as e:
        current_app.logger.error(f"Error fetching experience: {str(e)}")
        return jsonify({"success": False, "error": str(e)}), 500

# Get Education by ID
@api_bp.route('/education/<education_id>', methods=['GET'])
@login_required
def get_education(education_id):
    """Get education data by ID."""
    try:
        education = mongo.db.education.find_one({"_id": ObjectId(education_id)})
        
        if not education:
            return jsonify({"success": False, "error": "Education not found"}), 404
        
        # Convert ObjectId to string for JSON serialization
        education["_id"] = str(education["_id"])
        
        return jsonify({"success": True, "education": education})
    
    except Exception as e:
        current_app.logger.error(f"Error fetching education: {str(e)}")
        return jsonify({"success": False, "error": str(e)}), 500

# Get Message by ID
@api_bp.route('/messages/<message_id>', methods=['GET'])
@login_required
def get_message(message_id):
    """Get message data by ID."""
    try:
        message = mongo.db.messages.find_one({"_id": ObjectId(message_id)})
        
        if not message:
            return jsonify({"success": False, "error": "Message not found"}), 404
        
        # Format date for display
        if message.get("date"):
            message["date"] = message["date"].strftime("%Y-%m-%d %H:%M:%S")
        
        # Convert ObjectId to string for JSON serialization
        message["_id"] = str(message["_id"])
        
        return jsonify({"success": True, "message": message})
    
    except Exception as e:
        current_app.logger.error(f"Error fetching message: {str(e)}")
        return jsonify({"success": False, "error": str(e)}), 500