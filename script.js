// Set launch date (30 days from now)
const launchDate = new Date();
launchDate.setDate(launchDate.getDate() + 30);
launchDate.setHours(0, 0, 0, 0);

// Countdown timer
function updateCountdown() {
    const now = new Date().getTime();
    const distance = launchDate.getTime() - now;

    if (distance < 0) {
        // Countdown finished
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown();

// Email form handling
const emailForm = document.getElementById('emailForm');
const emailInput = document.getElementById('emailInput');
const formMessage = document.getElementById('formMessage');

emailForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    
    if (!email) {
        showMessage('Please enter a valid email address', 'error');
        return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showMessage('Please enter a valid email address', 'error');
        return;
    }

    // Simulate API call (replace with actual API endpoint)
    try {
        // Here you would make an actual API call
        // await fetch('/api/subscribe', { method: 'POST', body: JSON.stringify({ email }) });
        
        // Simulate success for demo
        showMessage('Thank you! We\'ll notify you when we launch.', 'success');
        emailInput.value = '';
        
        // In production, you would handle the actual API response
        // You can integrate with services like Mailchimp, ConvertKit, etc.
    } catch (error) {
        showMessage('Something went wrong. Please try again later.', 'error');
    }
});

function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    
    // Clear message after 5 seconds
    setTimeout(() => {
        formMessage.textContent = '';
        formMessage.className = 'form-message';
    }, 5000);
}

// Add smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add parallax effect to background orbs on scroll
let lastScrollY = window.scrollY;
window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    const scrollDelta = currentScrollY - lastScrollY;
    
    const orbs = document.querySelectorAll('.gradient-orb');
    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 0.5;
        const yPos = scrollDelta * speed;
        orb.style.transform += ` translateY(${yPos}px)`;
    });
    
    lastScrollY = currentScrollY;
});

// Add intersection observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.countdown-item, .email-form, .social-link').forEach(el => {
    observer.observe(el);
});

