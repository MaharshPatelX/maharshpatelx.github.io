// DOM Elements
const contactBtn = document.getElementById('contactBtn');
const contactModal = document.getElementById('contactModal');
const closeBtn = document.querySelector('.close');
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const successMessage = document.getElementById('successMessage');
const themeToggle = document.querySelector('.theme-toggle');

// Toggle dark/light mode
let isDarkMode = true;
themeToggle.addEventListener('click', () => {
    if (isDarkMode) {
        document.documentElement.style.setProperty('--bg-color', '#f3f4f6');
        document.documentElement.style.setProperty('--card-bg', '#ffffff');
        document.documentElement.style.setProperty('--text-color', '#111827');
        document.documentElement.style.setProperty('--text-secondary', '#4b5563');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        document.documentElement.style.setProperty('--bg-color', '#111827');
        document.documentElement.style.setProperty('--card-bg', '#1f2937');
        document.documentElement.style.setProperty('--text-color', '#ffffff');
        document.documentElement.style.setProperty('--text-secondary', '#9ca3af');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    isDarkMode = !isDarkMode;
});

// Open contact modal
contactBtn.addEventListener('click', () => {
    contactModal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
});

// Close contact modal
closeBtn.addEventListener('click', () => {
    contactModal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Enable scrolling when modal is closed
});

// Close modal if clicked outside
window.addEventListener('click', (e) => {
    if (e.target === contactModal) {
        contactModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Handle form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Disable submit button during submission
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    
    // Get form data
    const formData = new FormData(contactForm);
    
    // Send data to backend
    fetch('/api/contact', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Hide form and show success message
            contactForm.style.display = 'none';
            successMessage.style.display = 'block';
            
            // Reset and close after a delay
            setTimeout(() => {
                contactModal.style.display = 'none';
                document.body.style.overflow = 'auto';
                
                // Reset form for next time
                contactForm.reset();
                contactForm.style.display = 'block';
                successMessage.style.display = 'none';
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
            }, 3000);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
    });
});

// Add animations on scroll
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card, .project-card');
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    cards.forEach(card => {
        observer.observe(card);
    });
});

// Add CSS for the animation
const style = document.createElement('style');
style.textContent = `
    .card, .project-card {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .fade-in {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Read message functionality
function markMessageAsRead(messageId) {
    fetch(`/api/messages/mark-read/${messageId}`, {
        method: 'POST'
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            const messageRow = document.getElementById(`message-${messageId}`);
            if (messageRow) {
                messageRow.classList.remove('unread');
                const statusIndicator = messageRow.querySelector('.status-indicator');
                if (statusIndicator) {
                    statusIndicator.classList.remove('unread');
                    statusIndicator.classList.add('read');
                }
            }
        }
    })
    .catch(error => {
        console.error('Error marking message as read:', error);
    });
}