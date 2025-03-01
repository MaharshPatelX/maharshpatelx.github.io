"""
File upload and processing utilities.
"""

import os
import uuid
from datetime import datetime
from werkzeug.utils import secure_filename
from flask import current_app

def allowed_file(filename):
    """
    Check if the file extension is allowed.
    
    Args:
        filename: The name of the file to check.
        
    Returns:
        bool: True if the file extension is allowed, False otherwise.
    """
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in current_app.config['ALLOWED_EXTENSIONS']

def save_upload_file(file, directory=None):
    """
    Save an uploaded file with a secure name.
    
    Args:
        file: The file object to save.
        directory: Optional subdirectory within the upload folder.
        
    Returns:
        str: The filename of the saved file.
    """
    if not file or not allowed_file(file.filename):
        return None
        
    # Generate a unique filename to prevent overwriting and filename collisions
    original_filename = secure_filename(file.filename)
    extension = original_filename.rsplit('.', 1)[1].lower()
    
    # Create a unique filename with timestamp and UUID
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    unique_id = uuid.uuid4().hex[:8]
    filename = f"{timestamp}_{unique_id}.{extension}"
    
    # Determine the save path
    if directory:
        save_dir = os.path.join(current_app.config['UPLOAD_FOLDER'], directory)
        os.makedirs(save_dir, exist_ok=True)
        save_path = os.path.join(save_dir, filename)
    else:
        save_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
    
    # Save the file
    file.save(save_path)
    
    # Return the relative path for database storage
    if directory:
        return os.path.join(directory, filename)
    return filename

def delete_file(filename):
    """
    Delete a file from the upload folder.
    
    Args:
        filename: The name of the file to delete.
        
    Returns:
        bool: True if the file was deleted, False otherwise.
    """
    try:
        file_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
        if os.path.exists(file_path):
            os.remove(file_path)
            return True
    except Exception as e:
        current_app.logger.error(f"Error deleting file {filename}: {str(e)}")
    
    return False