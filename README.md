# ML Engineer Portfolio Website

![Python](https://img.shields.io/badge/Python-3.11+-blue.svg)
![Flask](https://img.shields.io/badge/Flask-2.3.3-green.svg)
![MongoDB](https://img.shields.io/badge/MongoDB-4.5.0-green.svg)
![Poetry](https://img.shields.io/badge/Poetry-1.6.0+-blue.svg)

A modern, responsive portfolio website for Machine Learning Engineers, built with Flask and MongoDB. This application provides a clean, professional interface for showcasing your ML projects, skills, and experience, with a complete admin panel for content management.

<!-- <p align="center">
  <img src="static/preview.png" alt="ML Portfolio Preview" width="800">
</p> -->

## Features

- **Responsive Design**: Clean, dark-themed UI that works on all device sizes
- **Project Showcase**: Highlight your ML projects with descriptions, tags, and images
- **Skills & Technologies Display**: Showcase your technical skills and technologies
- **Professional Timeline**: Display your work experience and education history
- **Contact Form**: Allow visitors to send you messages directly
- **Admin Dashboard**: Comprehensive admin panel to manage all your content
- **Authentication**: Secure login for admin functionality
- **MongoDB Integration**: Flexible data storage for all portfolio content
- **Dark/Light Mode Toggle**: User-selectable theme preference

## Tech Stack

- **Backend**: Flask (Python web framework)
- **Database**: MongoDB (via Flask-PyMongo)
- **Dependency Management**: Poetry
- **Frontend**: HTML5, CSS3, JavaScript
- **UI Components**: Font Awesome icons
- **Authentication**: Session-based authentication with password hashing
- **File Uploads**: Werkzeug for secure file handling

## Installation

### Prerequisites

- Python 3.11 or higher
- Poetry (dependency management)
- MongoDB (local or Atlas cloud instance)

### Setup with Poetry

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/ml-portfolio.git
cd ml-portfolio
```

2. **Install dependencies with Poetry**

```bash
# Install Poetry if you haven't already
# curl -sSL https://install.python-poetry.org | python3 -

# Install project dependencies
poetry install
```

3. **Configure environment variables**

Create a `.env` file in the project root:

```
# Flask configuration
FLASK_ENV=development
FLASK_HOST=0.0.0.0
FLASK_PORT=5000

# Security
SECRET_KEY=your-secure-random-key

# MongoDB configuration
MONGO_URI=mongodb://localhost:27017/ml_portfolio
```

4. **Initialize the application**

```bash
# Activate the Poetry virtual environment
poetry shell

# Run the application
python app.py
```

5. **Access the application**

Open your browser and go to: `http://localhost:5000`

Initial admin credentials:
- Username: `admin`
- Password: `admin123`

**Change these credentials immediately after first login!**

## Project Structure

```
ml_portfolio/
├── app.py                  # Application entry point
├── config.py               # Configuration settings
├── wsgi.py                 # WSGI entry point for production
├── extensions.py           # Flask extensions
├── pyproject.toml          # Poetry configuration
├── README.md               # Project documentation
├── requirements.txt        # Dependencies (for non-Poetry deployments)
├── routes/                 # Route blueprints
│   ├── __init__.py
│   ├── public.py           # Public routes (index, about, etc)
│   ├── admin.py            # Admin dashboard routes
│   ├── auth.py             # Authentication routes
│   ├── content.py          # Content management routes
│   └── api.py              # API endpoints
├── utils/                  # Utility functions
│   ├── __init__.py
│   ├── auth.py             # Authentication utilities
│   ├── file_handlers.py    # File upload handlers
│   └── db_init.py          # Database initialization
├── static/                 # Static files (CSS, JS, etc)
│   ├── styles.css
│   ├── script.js
│   └── uploads/            # Uploaded images
├── templates/              # HTML templates
│   ├── base.html           # Base template
│   ├── index.html          # Homepage template
│   ├── about.html          # About page template
│   ├── projects.html       # Projects page template
│   ├── resume.html         # Resume page template
│   ├── project_detail.html # Project detail page
│   ├── login.html          # Login page
│   ├── errors/             # Error pages
│   └── admin/              # Admin templates
└── logs/                   # Application logs
```

## Using Poetry for Development

Poetry provides a clean, dependency-isolated environment for this project. Here are some useful commands:

```bash
# Add a new dependency
poetry add package-name

# Add a development dependency
poetry add --dev package-name

# Update dependencies
poetry update

# Export dependencies to requirements.txt (for non-Poetry deployments)
poetry export -f requirements.txt --output requirements.txt

# Run commands in the virtual environment
poetry run python app.py
```

## Admin Panel Usage

The admin panel allows you to manage all aspects of your portfolio:

1. **Profile**: Update your personal information, bio, and profile image
2. **Projects**: Add, edit, and delete ML projects with images and tags
3. **Experience**: Manage your work history with detailed responsibilities
4. **Education**: Track your educational background
5. **Skills**: Add different skills categorized by type
6. **Technologies**: Manage the technologies you use, with visual icons
7. **Messages**: View and respond to contact form submissions

To access the admin panel:
1. Go to `/auth/login`
2. Enter your admin credentials
3. Navigate using the sidebar menu

## Customization

### Visual Theme

Edit the CSS variables in `static/styles.css` to change the color scheme:

```css
:root {
    --bg-color: #111827;
    --card-bg: #1f2937;
    --text-color: #ffffff;
    --text-secondary: #9ca3af;
    --accent-color: #3b82f6;
    /* ... */
}
```

### Content Layout

Modify the templates in the `templates/` directory to change the layout and structure of your portfolio.

## Deploying ML Portfolio on AWS EC2 (Ubuntu)

This guide will walk you through deploying your ML Portfolio application on an AWS EC2 instance running Ubuntu, including setting up a domain, HTTPS, and proper server configuration.

### Step 1: Launch an EC2 Instance

1. **Sign in to AWS Console** and navigate to EC2 service.

2. **Launch a new instance**:
   - Click "Launch Instance"
   - Name: `ml-portfolio`
   - Select Ubuntu Server 22.04 LTS (or newest LTS)
   - Instance type: t2.micro (free tier) or t2.small for better performance
   - Create a new key pair (save this .pem file securely)
   - Configure security group to allow:
     - SSH (port 22) from your IP
     - HTTP (port 80) from anywhere
     - HTTPS (port 443) from anywhere
   - Configure storage: 8-16 GB (minimum)
   - Launch the instance

3. **Allocate an Elastic IP** (optional but recommended):
   - Navigate to Elastic IPs
   - Allocate new address
   - Associate with your EC2 instance

### Step 2: Connect to your EC2 instance

```bash
# For Linux/Mac:
chmod 400 your-key-pair.pem
ssh -i your-key-pair.pem ubuntu@your-instance-public-ip

# For Windows (using PuTTY):
# Convert .pem to .ppk using PuTTYgen first, then connect using PuTTY
```

### Step 3: Update System and Install Dependencies

```bash
# Update package lists and upgrade packages
sudo apt update && sudo apt upgrade -y

# Install Python and required system packages
sudo apt install -y python3 python3-pip python3-venv build-essential libssl-dev libffi-dev python3-dev git nginx

# Install MongoDB (if you're hosting it on the same server)
sudo apt install -y mongodb
sudo systemctl start mongodb
sudo systemctl enable mongodb

# Or set up MongoDB Atlas (cloud-hosted) and use your connection string
```

### Step 4: Install Poetry

```bash
# Install Poetry
curl -sSL https://install.python-poetry.org | python3 -

# Add Poetry to PATH
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

### Step 5: Clone and Set Up Your Application

```bash
# Create directory for application
sudo mkdir -p /var/www/ml-portfolio
sudo chown -R ubuntu:ubuntu /var/www/ml-portfolio

# Clone your repository (or upload your code)
cd /var/www/ml-portfolio
git clone https://github.com/yourusername/ml-portfolio.git .

# Install dependencies with Poetry
poetry install --no-dev

# Create logs directory
mkdir -p logs
```

### Step 6: Configure Environment Variables

```bash
# Create .env file
nano .env
```

Add the following content to the `.env` file:

```
# Flask configuration
FLASK_ENV=production
FLASK_HOST=0.0.0.0
FLASK_PORT=8000

# Security
SECRET_KEY=your-secure-random-key-here

# MongoDB configuration (local)
MONGO_URI=mongodb://localhost:27017/ml_portfolio

# Or MongoDB Atlas
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/ml_portfolio
```

Save and exit (Ctrl+X, then Y, then Enter).

### Step 7: Set Up Gunicorn Service

Create a systemd service file:

```bash
sudo nano /etc/systemd/system/ml-portfolio.service
```

Add the following content:

```ini
[Unit]
Description=ML Portfolio Gunicorn daemon
After=network.target

[Service]
User=ubuntu
Group=www-data
WorkingDirectory=/var/www/ml-portfolio
Environment="PATH=/var/www/ml-portfolio/.venv/bin"
EnvironmentFile=/var/www/ml-portfolio/.env
ExecStart=/var/www/ml-portfolio/.venv/bin/gunicorn --workers 3 --bind 0.0.0.0:8000 wsgi:application

[Install]
WantedBy=multi-user.target
```

Save and exit, then activate the service:

```bash
# Create Python virtual environment
cd /var/www/ml-portfolio
poetry config virtualenvs.in-project true
poetry install --no-dev

# Reload systemd, enable and start service
sudo systemctl daemon-reload
sudo systemctl start ml-portfolio
sudo systemctl enable ml-portfolio
sudo systemctl status ml-portfolio  # Verify it's running
```

### Step 8: Configure Nginx as Reverse Proxy

Create Nginx configuration:

```bash
sudo nano /etc/nginx/sites-available/ml-portfolio
```

Add the following content:

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;  # Replace with your domain

    location / {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /static/ {
        alias /var/www/ml-portfolio/static/;
        expires 30d;
    }

    location /uploads/ {
        alias /var/www/ml-portfolio/static/uploads/;
        expires 30d;
    }

    client_max_body_size 16M;  # Adjust based on your max upload size
}
```

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/ml-portfolio /etc/nginx/sites-enabled/
sudo nginx -t  # Test configuration
sudo systemctl restart nginx
```

### Step 9: Set Up SSL with Let's Encrypt (for HTTPS)

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obtain SSL certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# This will modify your Nginx config automatically to redirect HTTP to HTTPS

# Test automatic renewal
sudo certbot renew --dry-run
```

### Step 10: Finalize Setup

1. **Make sure uploads directory is writable**:
   ```bash
   sudo mkdir -p /var/www/ml-portfolio/static/uploads
   sudo chown -R ubuntu:www-data /var/www/ml-portfolio/static/uploads
   sudo chmod -R 775 /var/www/ml-portfolio/static/uploads
   ```

2. **Set up database backups** (optional but recommended):
   ```bash
   # Install MongoDB tools
   sudo apt install -y mongodb-clients
   
   # Create backup script
   mkdir -p /var/www/ml-portfolio/backups
   
   nano /var/www/ml-portfolio/backup.sh
   ```
   
   Add this content:
   ```bash
   #!/bin/bash
   DATE=$(date +"%Y%m%d")
   BACKUP_DIR="/var/www/ml-portfolio/backups"
   
   # Create backup
   mongodump --db ml_portfolio --out $BACKUP_DIR/$DATE
   
   # Compress backup
   tar -zcvf $BACKUP_DIR/$DATE.tar.gz $BACKUP_DIR/$DATE
   
   # Remove uncompressed backup
   rm -rf $BACKUP_DIR/$DATE
   
   # Keep only last 7 backups
   ls -t $BACKUP_DIR/*.tar.gz | tail -n +8 | xargs rm -f
   ```
   
   Make it executable and set up a cron job:
   ```bash
   chmod +x /var/www/ml-portfolio/backup.sh
   
   # Add to crontab
   (crontab -l ; echo "0 3 * * * /var/www/ml-portfolio/backup.sh") | crontab -
   ```

### Step 11: Create a Simple Deployment Script (Optional)

Create a script to simplify future updates:

```bash
nano /var/www/ml-portfolio/deploy.sh
```

Add this content:

```bash
#!/bin/bash
cd /var/www/ml-portfolio

# Pull latest changes
git pull

# Install dependencies
poetry install --no-dev

# Restart services
sudo systemctl restart ml-portfolio
```

Make it executable:

```bash
chmod +x /var/www/ml-portfolio/deploy.sh
```

### Step 12: Security Hardening (Recommended)

1. **Configure UFW (Uncomplicated Firewall)**:
   ```bash
   sudo ufw allow ssh
   sudo ufw allow http
   sudo ufw allow https
   sudo ufw enable
   ```

2. **Fail2Ban to protect SSH**:
   ```bash
   sudo apt install -y fail2ban
   sudo systemctl enable fail2ban
   sudo systemctl start fail2ban
   ```

3. **Automatic security updates**:
   ```bash
   sudo apt install -y unattended-upgrades
   sudo dpkg-reconfigure -plow unattended-upgrades
   ```

## Troubleshooting

### Application Not Working

1. **Check application logs**:
   ```bash
   sudo journalctl -u ml-portfolio.service
   # or
   cat /var/www/ml-portfolio/logs/app.log
   ```

2. **Check Nginx logs**:
   ```bash
   sudo cat /var/log/nginx/error.log
   ```

3. **Test Gunicorn directly**:
   ```bash
   cd /var/www/ml-portfolio
   poetry run gunicorn --bind 0.0.0.0:8000 wsgi:application
   ```

### SSL Issues

1. **Check SSL configuration**:
   ```bash
   sudo certbot certificates
   ```

2. **Renew SSL certificate**:
   ```bash
   sudo certbot renew
   ```

## Managing Your Application

### Restart After Changes

```bash
sudo systemctl restart ml-portfolio
```

### View Application Logs

```bash
sudo journalctl -u ml-portfolio.service
```

### Updating Your Application

When you have new code to deploy:

1. Pull changes from your repository
2. Install any new dependencies
3. Restart the service

```bash
cd /var/www/ml-portfolio
git pull
poetry install --no-dev
sudo systemctl restart ml-portfolio
```

Or use the deployment script:

```bash
/var/www/ml-portfolio/deploy.sh
```

### Backing Up Your Application

It's important to regularly back up your:
1. MongoDB database (using the backup script)
2. Uploaded files in `/var/www/ml-portfolio/static/uploads/`
3. Environment configuration (`.env` file)

## Next Steps

1. **Set up CI/CD pipeline** for automatic deployments
2. **Configure monitoring** with services like AWS CloudWatch or Prometheus
3. **Set up email notifications** for server errors
4. **Implement CDN** for faster static content delivery

## Security Considerations

- Change the default admin password immediately after first login
- Use a strong, random SECRET_KEY in production
- Set up MongoDB with authentication
- Run behind HTTPS in production
- Regularly backup your database

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Font Awesome for the icons
- Inter font family by Rasmus Andersson
- Flask and MongoDB communities for excellent documentation

---

Built with ❤️ using Flask, MongoDB, and Poetry