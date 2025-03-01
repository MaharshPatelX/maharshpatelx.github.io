"""
Authentication routes for the ML Portfolio application.

This module handles user authentication including login, logout, and password management.
"""

from flask import Blueprint, render_template, request, redirect, url_for, flash, session, current_app
from werkzeug.security import check_password_hash, generate_password_hash
from bson.objectid import ObjectId
from extensions import mongo
from utils.auth import login_required

# Create blueprint
auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['GET', 'POST'])
def login():
    """Handle user login."""
    if request.method == 'POST':
        # Get form data
        username = request.form.get('username')
        password = request.form.get('password')
        
        # Validate required fields
        if not username or not password:
            flash('Username and password are required', 'error')
            return render_template('login.html')
        
        # Find the user
        user = mongo.db.users.find_one({'username': username})
        
        # Validate credentials
        if user and check_password_hash(user['password'], password):
            # Set session data
            session.clear()
            session['user_id'] = str(user['_id'])
            session['username'] = user['username']
            session['role'] = user.get('role', 'user')
            session.permanent = True
            
            # Log successful login
            current_app.logger.info(f"User {username} logged in successfully")
            
            # Redirect to admin dashboard
            return redirect(url_for('admin.dashboard'))
        
        # Invalid credentials
        current_app.logger.warning(f"Failed login attempt for username: {username}")
        flash('Invalid username or password', 'error')
    
    # GET request or login failed
    return render_template('login.html')

@auth_bp.route('/logout')
def logout():
    """Handle user logout."""
    # Log the logout if a user is logged in
    if 'username' in session:
        current_app.logger.info(f"User {session['username']} logged out")
    
    # Clear the session
    session.clear()
    flash('You have been logged out', 'info')
    return redirect(url_for('public.index'))

@auth_bp.route('/change-password', methods=['GET', 'POST'])
@login_required
def change_password():
    """Handle password change for logged-in users."""
    if request.method == 'POST':
        current_password = request.form.get('current_password')
        new_password = request.form.get('new_password')
        confirm_password = request.form.get('confirm_password')
        
        # Validate form data
        if not current_password or not new_password or not confirm_password:
            flash('All fields are required', 'error')
            return render_template('change_password.html')
        
        if new_password != confirm_password:
            flash('New passwords do not match', 'error')
            return render_template('change_password.html')
        
        # Get the user
        user = mongo.db.users.find_one({'_id': ObjectId(session['user_id'])})
        
        # Verify current password
        if not user or not check_password_hash(user['password'], current_password):
            flash('Current password is incorrect', 'error')
            return render_template('change_password.html')
        
        # Update the password
        mongo.db.users.update_one(
            {'_id': ObjectId(session['user_id'])},
            {'$set': {'password': generate_password_hash(new_password)}}
        )
        
        # Log the password change
        current_app.logger.info(f"Password changed for user {session['username']}")
        
        flash('Your password has been updated successfully', 'success')
        return redirect(url_for('admin.dashboard'))
    
    # GET request
    return render_template('change_password.html')