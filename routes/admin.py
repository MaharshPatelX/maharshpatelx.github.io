"""
Admin dashboard routes for the ML Portfolio application.

This module contains routes for the admin dashboard and related functionality.
"""

from flask import Blueprint, render_template, redirect, url_for, current_app
from utils.auth import login_required, admin_required
from extensions import mongo

# Create blueprint
admin_bp = Blueprint('admin', __name__)

@admin_bp.route('/')
@login_required
def dashboard():
    """Render the admin dashboard."""
    # Get profile data for all admin pages
    profile = mongo.db.profile.find_one()
    
    # Get counts for dashboard statistics
    try:
        project_count = mongo.db.projects.count_documents({})
        message_count = mongo.db.messages.count_documents({"read": False})
        skill_count = mongo.db.skills.count_documents({})
        
        stats = {
            "projects": project_count,
            "unread_messages": message_count,
            "skills": skill_count
        }
        
        return render_template("admin/dashboard.html", profile=profile, stats=stats)
    except Exception as e:
        current_app.logger.error(f"Error in admin dashboard: {str(e)}")
        return render_template("admin/dashboard.html", profile=profile, stats={
            "projects": 0,
            "unread_messages": 0,
            "skills": 0
        })

@admin_bp.route('/profile')
@login_required
def profile():
    """Render the profile management page."""
    profile_data = mongo.db.profile.find_one()
    return render_template("admin/profile.html", profile=profile_data)

@admin_bp.route('/projects')
@login_required
def projects():
    """Render the projects management page."""
    profile = mongo.db.profile.find_one()
    projects_list = list(mongo.db.projects.find())
    return render_template("admin/projects.html", profile=profile, projects=projects_list)

@admin_bp.route('/experiences')
@login_required
def experiences():
    """Render the experience management page."""
    profile = mongo.db.profile.find_one()
    experiences_list = list(mongo.db.experiences.find().sort("start_date", -1))
    return render_template("admin/experiences.html", profile=profile, experiences=experiences_list)

@admin_bp.route('/education')
@login_required
def education():
    """Render the education management page."""
    profile = mongo.db.profile.find_one()
    education_list = list(mongo.db.education.find().sort("start_date", -1))
    return render_template("admin/education.html", profile=profile, education=education_list)

@admin_bp.route('/skills')
@login_required
def skills():
    """Render the skills management page."""
    profile = mongo.db.profile.find_one()
    skills_list = list(mongo.db.skills.find())
    return render_template("admin/skills.html", profile=profile, skills=skills_list)

@admin_bp.route('/technologies')
@login_required
def technologies():
    """Render the technologies management page."""
    profile = mongo.db.profile.find_one()
    technologies_list = list(mongo.db.technologies.find())
    return render_template("admin/technologies.html", profile=profile, technologies=technologies_list)

@admin_bp.route('/messages')
@login_required
def messages():
    """Render the messages management page."""
    profile = mongo.db.profile.find_one()
    messages_list = list(mongo.db.messages.find().sort("date", -1))
    return render_template("admin/messages.html", profile=profile, messages=messages_list)

@admin_bp.route('/publications')
@login_required
def publications():
    """Render the publications management page."""
    profile = mongo.db.profile.find_one()
    publications_list = list(mongo.db.publications.find().sort("year", -1))
    return render_template("admin/publications.html", profile=profile, publications=publications_list)