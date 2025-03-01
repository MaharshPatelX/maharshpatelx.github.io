"""
Main application module for ML Portfolio.
"""

import os
import logging
from logging.handlers import RotatingFileHandler
from flask import Flask
from werkzeug.middleware.proxy_fix import ProxyFix

# Import configuration
import config

# Import extensions
from extensions import mongo

def create_app():
    """Create and configure the Flask application."""
    app = Flask(__name__)
    
    # Load configuration
    app.config.from_object(config)
    
    # Configure logging
    if not app.debug:
        formatter = logging.Formatter(config.LOG_FORMAT)
        
        file_handler = RotatingFileHandler(
            config.LOG_FILE,
            maxBytes=10485760,  # 10 MB
            backupCount=10
        )
        file_handler.setFormatter(formatter)
        file_handler.setLevel(logging.INFO)
        
        app.logger.addHandler(file_handler)
        app.logger.setLevel(logging.INFO)
        app.logger.info('ML Portfolio startup')
    
    # Fix for proper IP behind proxy
    app.wsgi_app = ProxyFix(app.wsgi_app, x_for=1, x_proto=1, x_host=1)
    
    # Initialize extensions
    mongo.init_app(app)
    
    with app.app_context():
        # Register blueprints - import them inside the app context
        from routes.public import public_bp
        from routes.auth import auth_bp
        from routes.admin import admin_bp
        from routes.content import content_bp
        from routes.api import api_bp
        
        app.register_blueprint(public_bp)
        app.register_blueprint(auth_bp, url_prefix='/auth')
        app.register_blueprint(admin_bp, url_prefix='/admin')
        app.register_blueprint(content_bp, url_prefix='/api')
        app.register_blueprint(api_bp, url_prefix='/api')
        
        # Initialize database
        from utils.db_init import init_database
        init_database(mongo)
    
    # Error handlers
    register_error_handlers(app)
    
    return app

def register_error_handlers(app):
    """Register error handlers for the application."""
    
    @app.errorhandler(404)
    def page_not_found(error):
        from flask import render_template
        return render_template('errors/404.html'), 404
    
    @app.errorhandler(500)
    def internal_server_error(error):
        from flask import render_template
        app.logger.error(f'Server Error: {error}')
        return render_template('errors/500.html'), 500
    
    @app.errorhandler(403)
    def forbidden(error):
        from flask import render_template
        return render_template('errors/403.html'), 403

# Application instance for WSGI servers
application = create_app()

if __name__ == '__main__':
    application.run(
        host=os.getenv('FLASK_HOST', '0.0.0.0'),
        port=int(os.getenv('FLASK_PORT', 5000))
    )