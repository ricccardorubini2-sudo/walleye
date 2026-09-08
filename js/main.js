// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');

if (menuToggle && nav) {
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        nav.classList.toggle('active');
    });
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (nav && menuToggle && !nav.contains(e.target) && !menuToggle.contains(e.target)) {
        nav.classList.remove('active');
    }
});

// Active Navigation Link and Mobile Menu Close
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const navLinks = document.querySelectorAll('nav a');

// Close menu when clicking on a nav link (mobile)
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (nav && window.innerWidth <= 768) {
            nav.classList.remove('active');
        }
    });
});

navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    // Handle both with and without .html extension, and index cases
    if (linkPage === currentPage || 
        (currentPage === '' && (linkPage === 'index.html' || linkPage === '/')) ||
        (currentPage === 'index.html' && linkPage === 'index.html') ||
        (linkPage.replace('.html', '') === currentPage.replace('.html', ''))) {
        link.classList.add('active');
    }
});

// Particle Animation for Hero Section
function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    if (!particlesContainer) return;

    const particleCount = 100;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random animation delay
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        
        particlesContainer.appendChild(particle);
    }
}

// Scroll Reveal Animation
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
    
    // Timeline item animations
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        const windowHeight = window.innerHeight;
        const itemTop = item.getBoundingClientRect().top;
        const itemVisible = 200;
        
        if (itemTop < windowHeight - itemVisible) {
            item.classList.add('active');
        }
    });
}

// Smooth Scroll for Anchor Links
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

// Scroll Indicator
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    });
}

// Header Scroll Effect
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.padding = '1rem 0';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.padding = '1.5rem 0';
        header.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Counter Animation for Stats
function animateCounter(element) {
    const target = parseFloat(element.getAttribute('data-target'));
    const prefix = element.getAttribute('data-prefix') || '';
    const suffix = element.getAttribute('data-suffix') || '';
    const duration = 2000; // 2 seconds
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(target * easeOutQuart);
        
        // Format the number
        if (target >= 1000) {
            element.textContent = prefix + current.toLocaleString() + suffix;
        } else {
            element.textContent = prefix + current + suffix;
        }
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            // Ensure final value is exact
            if (target >= 1000) {
                element.textContent = prefix + target.toLocaleString() + suffix;
            } else {
                element.textContent = prefix + target + suffix;
            }
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Initialize counters when stats section is visible
function initCounters() {
    const statsSection = document.querySelector('.stats-section');
    if (!statsSection) return;
    
    const statNumbers = statsSection.querySelectorAll('.stat-number[data-target]');
    
    // Check if section is visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                statNumbers.forEach((stat, index) => {
                    // Add delay for staggered animation
                    setTimeout(() => {
                        animateCounter(stat);
                    }, index * 200);
                });
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    observer.observe(statsSection);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    revealOnScroll();
    initCounters();
    
    // Add reveal class to sections
    const sections = document.querySelectorAll('.section, .strategy-card, .feature-card, .job-card');
    sections.forEach(section => {
        section.classList.add('reveal');
    });
    
    // Initial reveal check
    revealOnScroll();
});

// Scroll event listener for reveal animation
window.addEventListener('scroll', revealOnScroll);

// Values Chart Interactive Effects
document.addEventListener('DOMContentLoaded', () => {
    const chartSegments = document.querySelectorAll('.chart-segment');
    const valueItems = document.querySelectorAll('.value-item');
    
    // Add hover effects to connect segments with value items
    chartSegments.forEach(segment => {
        segment.addEventListener('mouseenter', () => {
            const segmentClass = segment.classList[1]; // e.g., 'segment-innovation'
            const valueType = segmentClass.replace('segment-', '');
            const correspondingItem = document.querySelector(`.value-${valueType}`);
            
            if (correspondingItem) {
                correspondingItem.style.zIndex = '10';
                correspondingItem.style.transform = correspondingItem.style.transform || getComputedStyle(correspondingItem).transform;
            }
        });
        
        segment.addEventListener('mouseleave', () => {
            const segmentClass = segment.classList[1];
            const valueType = segmentClass.replace('segment-', '');
            const correspondingItem = document.querySelector(`.value-${valueType}`);
            
            if (correspondingItem) {
                correspondingItem.style.zIndex = '';
            }
        });
    });
    
    // Add click effect to value items
    valueItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const valueType = item.classList[1].replace('value-', '');
            const correspondingSegment = document.querySelector(`.segment-${valueType}`);
            
            if (correspondingSegment) {
                correspondingSegment.style.filter = 'url(#glow) brightness(1.3)';
            }
        });
        
        item.addEventListener('mouseleave', () => {
            const valueType = item.classList[1].replace('value-', '');
            const correspondingSegment = document.querySelector(`.segment-${valueType}`);
            
            if (correspondingSegment) {
                correspondingSegment.style.filter = '';
            }
        });
    });
});

// Value Item Modal Functionality
document.addEventListener('DOMContentLoaded', () => {
    const valueItems = document.querySelectorAll('.value-item[data-modal]');
    const valueModals = document.querySelectorAll('.value-modal');
    const valueModalCloses = document.querySelectorAll('.value-modal-close');

    // Open modal when clicking on value item
    valueItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = item.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close modal when clicking close button
    valueModalCloses.forEach(close => {
        close.addEventListener('click', (e) => {
            e.stopPropagation();
            const modal = close.closest('.value-modal');
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Close modal when clicking outside
    valueModals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            valueModals.forEach(modal => {
                if (modal.classList.contains('active')) {
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }
    });
});

// Form Validation
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = contactForm.querySelector('input[name="name"]').value;
        const email = contactForm.querySelector('input[name="email"]').value;
        const message = contactForm.querySelector('textarea[name="message"]').value;
        
        // Basic validation
        if (!name || !email || !message) {
            alert('Please fill in all fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Success message (since this is a static site, we'll just show an alert)
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// Modal Functionality
const modalTriggers = document.querySelectorAll('.modal-trigger');
const modals = document.querySelectorAll('.modal');
const modalCloses = document.querySelectorAll('.modal-close');

modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const modalId = trigger.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

modalCloses.forEach(close => {
    close.addEventListener('click', () => {
        const modal = close.closest('.modal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// Close modal when clicking outside
modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        modals.forEach(modal => {
            if (modal.classList.contains('active')) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
});

