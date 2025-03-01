"""
Authentication utility functions.
"""

import functools
from flask import session, redirect, url_for, flash, current_app
from bson.objectid import ObjectId
from extensions import mongo

def login_required(view):
    """
    Decorator to require login for a view function.
    
    Args:
        view: The view function to decorate.
        
    Returns:
        The decorated view function.
    """
    @functools.wraps(view)
    def wrapped_view(**kwargs):
        if "user_id" not in session:
            flash("Please log in to access this page.", "error")
            return redirect(url_for("auth.login"))
        return view(**kwargs)
    return wrapped_view

def admin_required(view):
    """
    Decorator to require admin role for a view function.
    
    Args:
        view: The view function to decorate.
        
    Returns:
        The decorated view function.
    """
    @functools.wraps(view)
    def wrapped_view(**kwargs):
        if "user_id" not in session:
            flash("Please log in to access this page.", "error")
            return redirect(url_for("auth.login"))
        
        # Check if the user has admin role
        user = mongo.db.users.find_one({"_id": ObjectId(session["user_id"])})
        
        if not user or user.get("role") != "admin":
            current_app.logger.warning(
                f"Unauthorized access attempt to admin area by user_id: {session.get('user_id')}"
            )
            flash("You don't have permission to access this page.", "error")
            return redirect(url_for("public.index"))
            
        return view(**kwargs)
    return wrapped_view