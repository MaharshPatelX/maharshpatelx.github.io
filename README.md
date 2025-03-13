# Portfolio Website

![Python](https://img.shields.io/badge/Python-3.11+-blue.svg)
![Flask](https://img.shields.io/badge/Flask-2.3.3-green.svg)
![MongoDB](https://img.shields.io/badge/MongoDB-4.5.0-green.svg)
[![uv](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/astral-sh/uv/main/assets/badge/v0.json)](https://github.com/astral-sh/uv)

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
- **Dependency Management**: UV
- **Frontend**: HTML5, CSS3, JavaScript
- **UI Components**: Font Awesome icons
- **Authentication**: Session-based authentication with password hashing
- **File Uploads**: Werkzeug for secure file handling

## Installation

### Prerequisites

- Python 3.11 or higher
- UV (dependency management)
- MongoDB (local or Atlas cloud instance)

### Setup with UV

1. **Clone the repository**

```bash
git clone https://github.com/MaharshPatelX/maharshpatelx.github.io.git
cd maharshpatelx.github.io
```

2. **Install dependencies with UV**

```bash
# On macOS and Linux.
curl -LsSf https://astral.sh/uv/install.sh | sh

# On Windows.
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"

uv venv

# On macOS and Linux.
source .venv/bin/activate

# On Windows.
.venv\Scripts\activate

uv pip install requirements.txt
```

3. **Configure environment variables**

Create a `.env` file in the project root:

```
# Admin credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123

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
# On macOS and Linux.
source .venv/bin/activate

# On Windows.
.venv\Scripts\activate

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
├── README.md               # Project documentation
├── requirements.txt        # Dependencies (for deployments)
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




## **🚀 Deploying Portfolio on AWS EC2 (Ubuntu)**

This guide provides a step-by-step approach to deploying your **Portfolio Application** on an **AWS EC2** instance running Ubuntu. It includes server setup, domain configuration, HTTPS, and optimizing your production environment with **Gunicorn, Nginx, MongoDB, and SSL**.

---

### **🛠 1. Launch an EC2 Instance**

1. **Sign in to AWS Console** and navigate to EC2 service.
2. **Launch a new instance**:
   - Click "Launch Instance"
   - Name: `my-portfolio`
   - Select Ubuntu Server 22.04 LTS (or newest LTS)
   - Instance type: `t2.micro` (free tier) or `t2.small` for better performance
   - Create a new key pair (save this `.pem` file securely)
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

---

### **🛠 2. Connect to your EC2 Instance**

```bash
# For Linux/Mac:
chmod 400 your-key-pair.pem
ssh -i your-key-pair.pem ubuntu@your-instance-public-ip

# For Windows (using PuTTY):
# Convert .pem to .ppk using PuTTYgen first, then connect using PuTTY
```

---

### **🛠 3. Update System & Install Required Packages**

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y python3 python3-pip python3-venv build-essential libssl-dev libffi-dev python3-dev git nginx
```

---

### **🛠 4. Install MongoDB**

```bash
curl -fsSL https://pgp.mongodb.com/server-7.0.asc | sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt update
sudo apt install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod
sudo systemctl status mongod
```

---

### **🛠 5. Install `uv` (Fast Python Package Management)**

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
ls /home/ubuntu/.local/bin/uv
export PATH=$PATH:/home/ubuntu/.local/bin
echo 'export PATH=$PATH:/home/ubuntu/.local/bin' >> ~/.profile
source ~/.profile
uv --version
```

---

### **🛠 6. Clone the Project & Install Dependencies**

```bash
mkdir portfolio
cd portfolio/
git clone https://github.com/MaharshPatelX/maharshpatelx.github.io
cd maharshpatelx.github.io/
uv venv
source .venv/bin/activate
uv pip install -r requirements.txt
```

---

### **🛠 7. Configure Gunicorn as a Background Service**

```bash
sudo nano /etc/systemd/system/portfolio.service
```

Paste this configuration:

```ini
[Unit]
Description=Gunicorn instance to serve portfolio
After=network.target

[Service]
User=ubuntu
Group=www-data
WorkingDirectory=/home/ubuntu/portfolio/maharshpatelx.github.io
Environment="PATH=/home/ubuntu/portfolio/maharshpatelx.github.io/.venv/bin"
ExecStart=/home/ubuntu/portfolio/maharshpatelx.github.io/.venv/bin/gunicorn --workers 3 --limit-request-field_size 16384 --bind unix:/home/ubuntu/portfolio/portfolio.sock wsgi:application

[Install]
WantedBy=multi-user.target
```

Save and exit (`CTRL+X`, then `Y`, then `Enter`).

Enable and start Gunicorn:

```bash
sudo systemctl daemon-reload
sudo systemctl start portfolio
sudo systemctl enable portfolio
sudo systemctl status portfolio
```

---

### **🛠 8. Configure Nginx as a Reverse Proxy**

```bash
sudo nano /etc/nginx/sites-available/portfolio
```

Paste this configuration:

```nginx
server {
    listen 80;
    server_name your_ip_address;

    client_max_body_size 16M;

    location / {
        include proxy_params;
        proxy_pass http://unix:/home/ubuntu/portfolio/portfolio.sock;
    }
}
```

Save and exit.

Enable and restart Nginx:

```bash
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx
```

---

### **🛠 9. Fix Unix Socket & Directory Permissions**

```bash
sudo chown ubuntu:www-data /home/ubuntu/portfolio/portfolio.sock
sudo chmod 660 /home/ubuntu/portfolio/portfolio.sock
```

Give Nginx **access to parent directories**:

```bash
sudo chmod +x /home/ubuntu
sudo chmod +x /home/ubuntu/portfolio
```

Restart services:

```bash
sudo systemctl restart portfolio
sudo systemctl restart nginx
```

---

### **🛠 10. Set Up SSL with Let's Encrypt (Optional)**

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d yourdomain.com --redirect
```

Verify SSL renewal:

```bash
sudo certbot renew --dry-run
```

---

### **🛠 11. Set Up Firewall for Security**

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
sudo ufw status
```

---

### **🛠 12. Final Checks**

After reboot, check:

```bash
sudo systemctl status portfolio
sudo systemctl status nginx
```


## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Font Awesome for the icons
- Inter font family by Rasmus Andersson
- Flask and MongoDB communities for excellent documentation

---

Built with ❤️ using Flask, MongoDB, and UV
