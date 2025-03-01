"""
Public routes for the ML Portfolio application.

This module contains all the routes for the public-facing pages.
"""

from flask import Blueprint, render_template, request, jsonify, current_app
from datetime import datetime
from bson.objectid import ObjectId
from extensions import mongo

# Create blueprint
public_bp = Blueprint('public', __name__)

@public_bp.route('/')
def index():
    """Render the homepage."""
    profile = mongo.db.profile.find_one()
    technologies = list(mongo.db.technologies.find())
    return render_template("index.html", profile=profile, technologies=technologies)

@public_bp.route('/about')
def about():
    """Render the about page."""
    profile = mongo.db.profile.find_one()
    experiences = list(mongo.db.experiences.find().sort("start_date", -1))
    education = list(mongo.db.education.find().sort("start_date", -1))
    interests = list(mongo.db.interests.find())
    return render_template(
        "about.html", 
        profile=profile, 
        experiences=experiences, 
        education=education, 
        interests=interests
    )

@public_bp.route('/projects')
def projects():
    """Render the projects page."""
    profile = mongo.db.profile.find_one()
    projects_list = list(mongo.db.projects.find())
    return render_template("projects.html", profile=profile, projects=projects_list)

@public_bp.route('/project/<project_id>')
def project_detail(project_id):
    """Render a specific project detail page."""
    try:
        profile = mongo.db.profile.find_one()
        project = mongo.db.projects.find_one({"_id": ObjectId(project_id)})
        
        if not project:
            return render_template("errors/404.html", profile=profile), 404
            
        return render_template("project_detail.html", profile=profile, project=project)
    except Exception as e:
        current_app.logger.error(f"Error in project_detail route: {str(e)}")
        profile = mongo.db.profile.find_one()  # Make sure to get profile even for error page
        return render_template("errors/404.html", profile=profile), 404

@public_bp.route('/resume')
def resume():
    """Render the resume page."""
    profile = mongo.db.profile.find_one()
    experiences = list(mongo.db.experiences.find().sort("start_date", -1))
    education = list(mongo.db.education.find().sort("start_date", -1))
    skills = {
        "languages": list(mongo.db.skills.find({"category": "Languages & Frameworks"})),
        "ml": list(mongo.db.skills.find({"category": "Machine Learning"})),
        "tools": list(mongo.db.skills.find({"category": "Tools & Platforms"}))
    }
    publications = list(mongo.db.publications.find().sort("year", -1))
    
    return render_template(
        "resume.html", 
        profile=profile, 
        experiences=experiences, 
        education=education, 
        skills=skills, 
        publications=publications
    )

@public_bp.route('/contact', methods=["POST"])
def contact():
    """Handle contact form submissions."""
    try:
        if request.method == "POST":
            # Get form data
            contact_data = {
                "name": request.form.get("name"),
                "email": request.form.get("email"),
                "message": request.form.get("message"),
                "date": datetime.now(),
                "ip_address": request.remote_addr,
                "user_agent": request.user_agent.string,
                "read": False
            }
            
            # Insert into database
            mongo.db.messages.insert_one(contact_data)
            
            # Log the contact submission (exclude message content for privacy)
            current_app.logger.info(
                f"Contact form submitted by {contact_data['name']} ({contact_data['email']})"
            )
            
            return jsonify({"success": True})
    except Exception as e:
        current_app.logger.error(f"Error in contact form submission: {str(e)}")
        return jsonify({"success": False, "error": "An error occurred. Please try again later."}), 500