"""
Content management routes for the ML Portfolio application.

This module handles the API endpoints for managing portfolio content.
"""

from flask import Blueprint, request, redirect, url_for, flash, current_app, jsonify
from utils.auth import login_required
from utils.file_handlers import save_upload_file, delete_file
from extensions import mongo
from bson.objectid import ObjectId
from datetime import datetime

# Create blueprint
content_bp = Blueprint('content', __name__)

# Profile Management
@content_bp.route('/profile/update', methods=['POST'])
@login_required
def update_profile():
    """Update the profile information."""
    try:
        # Get current profile data
        current_profile = mongo.db.profile.find_one()
        
        # Prepare updated profile data
        updated_profile = {
            "name": request.form.get("name"),
            "title": request.form.get("title"),
            "bio": request.form.get("bio"),
            "email": request.form.get("email"),
            "phone": request.form.get("phone"),
            "github": request.form.get("github"),
            "linkedin": request.form.get("linkedin")
        }
        
        # Handle profile image upload
        if "profile_image" in request.files:
            file = request.files["profile_image"]
            if file and file.filename:
                filename = save_upload_file(file, "profile")
                if filename:
                    # Delete old profile image if it exists and is not default
                    if current_profile and current_profile.get("profile_image") != "default-profile.jpg":
                        delete_file(current_profile.get("profile_image"))
                    
                    updated_profile["profile_image"] = filename
        
        # Update the profile in the database
        mongo.db.profile.update_one({}, {"$set": updated_profile}, upsert=True)
        
        flash("Profile updated successfully", "success")
        return redirect(url_for("admin.profile"))
    
    except Exception as e:
        current_app.logger.error(f"Error updating profile: {str(e)}")
        flash("An error occurred while updating the profile", "error")
        return redirect(url_for("admin.profile"))

# Project Management
@content_bp.route('/projects/add', methods=['POST'])
@login_required
def add_project():
    """Add a new project."""
    try:
        # Get tags as a list
        tags = request.form.get("tags", "").split(",")
        tags = [tag.strip() for tag in tags if tag.strip()]
        
        # Prepare project data
        project = {
            "title": request.form.get("title"),
            "description": request.form.get("description"),
            "github_link": request.form.get("github_link"),
            "tags": tags,
            "details_link": request.form.get("details_link", ""),
            "created_at": datetime.now()
        }
        
        # Handle image upload
        if "image" in request.files:
            file = request.files["image"]
            if file and file.filename:
                filename = save_upload_file(file, "projects")
                if filename:
                    project["image"] = filename
                else:
                    project["image"] = "default-project.jpg"
            else:
                project["image"] = "default-project.jpg"
        else:
            project["image"] = "default-project.jpg"
        
        # Insert project into database
        result = mongo.db.projects.insert_one(project)
        
        flash("Project added successfully", "success")
        return redirect(url_for("admin.projects"))
    
    except Exception as e:
        current_app.logger.error(f"Error adding project: {str(e)}")
        flash("An error occurred while adding the project", "error")
        return redirect(url_for("admin.projects"))

@content_bp.route('/projects/update/<project_id>', methods=['POST'])
@login_required
def update_project(project_id):
    """Update an existing project."""
    try:
        # Get current project data
        current_project = mongo.db.projects.find_one({"_id": ObjectId(project_id)})
        
        if not current_project:
            flash("Project not found", "error")
            return redirect(url_for("admin.projects"))
        
        # Get tags as a list
        tags = request.form.get("tags", "").split(",")
        tags = [tag.strip() for tag in tags if tag.strip()]
        
        # Prepare updated project data
        updated_project = {
            "title": request.form.get("title"),
            "description": request.form.get("description"),
            "github_link": request.form.get("github_link"),
            "tags": tags,
            "details_link": request.form.get("details_link", ""),
            "updated_at": datetime.now()
        }
        
        # Handle image upload
        if "image" in request.files:
            file = request.files["image"]
            if file and file.filename:
                filename = save_upload_file(file, "projects")
                if filename:
                    # Delete old image if it exists and is not default
                    if current_project.get("image") != "default-project.jpg":
                        delete_file(current_project.get("image"))
                    
                    updated_project["image"] = filename
        
        # Update project in database
        mongo.db.projects.update_one(
            {"_id": ObjectId(project_id)},
            {"$set": updated_project}
        )
        
        flash("Project updated successfully", "success")
        return redirect(url_for("admin.projects"))
    
    except Exception as e:
        current_app.logger.error(f"Error updating project: {str(e)}")
        flash("An error occurred while updating the project", "error")
        return redirect(url_for("admin.projects"))

@content_bp.route('/projects/delete/<project_id>', methods=['POST'])
@login_required
def delete_project(project_id):
    """Delete a project."""
    try:
        # Get project data to retrieve the image
        project = mongo.db.projects.find_one({"_id": ObjectId(project_id)})
        
        if not project:
            flash("Project not found", "error")
            return redirect(url_for("admin.projects"))
        
        # Delete project image if it exists and is not default
        if project.get("image") and project.get("image") != "default-project.jpg":
            delete_file(project.get("image"))
        
        # Delete project from database
        mongo.db.projects.delete_one({"_id": ObjectId(project_id)})
        
        flash("Project deleted successfully", "success")
        return redirect(url_for("admin.projects"))
    
    except Exception as e:
        current_app.logger.error(f"Error deleting project: {str(e)}")
        flash("An error occurred while deleting the project", "error")
        return redirect(url_for("admin.projects"))

# Experience Management
@content_bp.route('/experiences/add', methods=['POST'])
@login_required
def add_experience():
    """Add a new experience."""
    try:
        # Convert responsibilities to list
        responsibilities = request.form.get("responsibilities", "").split("\n")
        responsibilities = [r.strip() for r in responsibilities if r.strip()]
        
        # Prepare experience data
        experience = {
            "title": request.form.get("title"),
            "company": request.form.get("company"),
            "start_date": request.form.get("start_date"),
            "end_date": request.form.get("end_date", "Present"),
            "responsibilities": responsibilities,
            "created_at": datetime.now()
        }
        
        # Insert experience into database
        mongo.db.experiences.insert_one(experience)
        
        flash("Experience added successfully", "success")
        return redirect(url_for("admin.experiences"))
    
    except Exception as e:
        current_app.logger.error(f"Error adding experience: {str(e)}")
        flash("An error occurred while adding the experience", "error")
        return redirect(url_for("admin.experiences"))

@content_bp.route('/experiences/update/<experience_id>', methods=['POST'])
@login_required
def update_experience(experience_id):
    """Update an existing experience."""
    try:
        # Convert responsibilities to list
        responsibilities = request.form.get("responsibilities", "").split("\n")
        responsibilities = [r.strip() for r in responsibilities if r.strip()]
        
        # Prepare updated experience data
        updated_experience = {
            "title": request.form.get("title"),
            "company": request.form.get("company"),
            "start_date": request.form.get("start_date"),
            "end_date": request.form.get("end_date", "Present"),
            "responsibilities": responsibilities,
            "updated_at": datetime.now()
        }
        
        # Update experience in database
        mongo.db.experiences.update_one(
            {"_id": ObjectId(experience_id)},
            {"$set": updated_experience}
        )
        
        flash("Experience updated successfully", "success")
        return redirect(url_for("admin.experiences"))
    
    except Exception as e:
        current_app.logger.error(f"Error updating experience: {str(e)}")
        flash("An error occurred while updating the experience", "error")
        return redirect(url_for("admin.experiences"))

@content_bp.route('/experiences/delete/<experience_id>', methods=['POST'])
@login_required
def delete_experience(experience_id):
    """Delete an experience."""
    try:
        # Delete experience from database
        mongo.db.experiences.delete_one({"_id": ObjectId(experience_id)})
        
        flash("Experience deleted successfully", "success")
        return redirect(url_for("admin.experiences"))
    
    except Exception as e:
        current_app.logger.error(f"Error deleting experience: {str(e)}")
        flash("An error occurred while deleting the experience", "error")
        return redirect(url_for("admin.experiences"))

# Education Management
@content_bp.route('/education/add', methods=['POST'])
@login_required
def add_education():
    """Add a new education entry."""
    try:
        # Prepare education data
        education = {
            "degree": request.form.get("degree"),
            "institution": request.form.get("institution"),
            "start_date": request.form.get("start_date"),
            "end_date": request.form.get("end_date"),
            "description": request.form.get("description", ""),
            "created_at": datetime.now()
        }
        
        # Insert education into database
        mongo.db.education.insert_one(education)
        
        flash("Education added successfully", "success")
        return redirect(url_for("admin.education"))
    
    except Exception as e:
        current_app.logger.error(f"Error adding education: {str(e)}")
        flash("An error occurred while adding the education", "error")
        return redirect(url_for("admin.education"))

@content_bp.route('/education/update/<education_id>', methods=['POST'])
@login_required
def update_education(education_id):
    """Update an existing education entry."""
    try:
        # Prepare updated education data
        updated_education = {
            "degree": request.form.get("degree"),
            "institution": request.form.get("institution"),
            "start_date": request.form.get("start_date"),
            "end_date": request.form.get("end_date"),
            "description": request.form.get("description", ""),
            "updated_at": datetime.now()
        }
        
        # Update education in database
        mongo.db.education.update_one(
            {"_id": ObjectId(education_id)},
            {"$set": updated_education}
        )
        
        flash("Education updated successfully", "success")
        return redirect(url_for("admin.education"))
    
    except Exception as e:
        current_app.logger.error(f"Error updating education: {str(e)}")
        flash("An error occurred while updating the education", "error")
        return redirect(url_for("admin.education"))

@content_bp.route('/education/delete/<education_id>', methods=['POST'])
@login_required
def delete_education(education_id):
    """Delete an education entry."""
    try:
        # Delete education from database
        mongo.db.education.delete_one({"_id": ObjectId(education_id)})
        
        flash("Education deleted successfully", "success")
        return redirect(url_for("admin.education"))
    
    except Exception as e:
        current_app.logger.error(f"Error deleting education: {str(e)}")
        flash("An error occurred while deleting the education", "error")
        return redirect(url_for("admin.education"))

# Skill Management
@content_bp.route('/skills/add', methods=['POST'])
@login_required
def add_skill():
    """Add a new skill."""
    try:
        # Prepare skill data
        skill = {
            "name": request.form.get("name"),
            "category": request.form.get("category"),
            "created_at": datetime.now()
        }
        
        # Insert skill into database
        mongo.db.skills.insert_one(skill)
        
        flash("Skill added successfully", "success")
        return redirect(url_for("admin.skills"))
    
    except Exception as e:
        current_app.logger.error(f"Error adding skill: {str(e)}")
        flash("An error occurred while adding the skill", "error")
        return redirect(url_for("admin.skills"))

@content_bp.route('/skills/delete/<skill_id>', methods=['POST'])
@login_required
def delete_skill(skill_id):
    """Delete a skill."""
    try:
        # Delete skill from database
        mongo.db.skills.delete_one({"_id": ObjectId(skill_id)})
        
        flash("Skill deleted successfully", "success")
        return redirect(url_for("admin.skills"))
    
    except Exception as e:
        current_app.logger.error(f"Error deleting skill: {str(e)}")
        flash("An error occurred while deleting the skill", "error")
        return redirect(url_for("admin.skills"))

# Technology Management
@content_bp.route('/technologies/add', methods=['POST'])
@login_required
def add_technology():
    """Add a new technology."""
    try:
        # Prepare technology data
        technology = {
            "name": request.form.get("name"),
            "icon": request.form.get("icon"),
            "created_at": datetime.now()
        }
        
        # Insert technology into database
        mongo.db.technologies.insert_one(technology)
        
        flash("Technology added successfully", "success")
        return redirect(url_for("admin.technologies"))
    
    except Exception as e:
        current_app.logger.error(f"Error adding technology: {str(e)}")
        flash("An error occurred while adding the technology", "error")
        return redirect(url_for("admin.technologies"))

@content_bp.route('/technologies/delete/<technology_id>', methods=['POST'])
@login_required
def delete_technology(technology_id):
    """Delete a technology."""
    try:
        # Delete technology from database
        mongo.db.technologies.delete_one({"_id": ObjectId(technology_id)})
        
        flash("Technology deleted successfully", "success")
        return redirect(url_for("admin.technologies"))
    
    except Exception as e:
        current_app.logger.error(f"Error deleting technology: {str(e)}")
        flash("An error occurred while deleting the technology", "error")
        return redirect(url_for("admin.technologies"))

# Message Management
@content_bp.route('/messages/mark-read/<message_id>', methods=['POST'])
@login_required
def mark_message_read(message_id):
    """Mark a message as read."""
    try:
        # Update message in database
        mongo.db.messages.update_one(
            {"_id": ObjectId(message_id)},
            {"$set": {"read": True}}
        )
        
        return jsonify({"success": True})
    
    except Exception as e:
        current_app.logger.error(f"Error marking message as read: {str(e)}")
        return jsonify({"success": False, "error": str(e)}), 500

@content_bp.route('/messages/delete/<message_id>', methods=['POST'])
@login_required
def delete_message(message_id):
    """Delete a message."""
    try:
        # Delete message from database
        mongo.db.messages.delete_one({"_id": ObjectId(message_id)})
        
        flash("Message deleted successfully", "success")
        return redirect(url_for("admin.messages"))
    
    except Exception as e:
        current_app.logger.error(f"Error deleting message: {str(e)}")
        flash("An error occurred while deleting the message", "error")
        return redirect(url_for("admin.messages"))