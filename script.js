// ========================================
// INITIALIZATION
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    initAOS();
    initHeader();
    initMobileMenu();
    initSmoothScroll();
    initCounterAnimation();
    initTestimonialSlider();
    initContactForm();
});

// ========================================
// AOS ANIMATION
// ========================================

function initAOS() {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        easing: 'ease-out-cubic'
    });
}

// ========================================
// HEADER SCROLL BEHAVIOR
// ========================================

function initHeader() {
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ========================================
// MOBILE MENU
// ========================================

function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMenu = document.getElementById('closeMenu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    const overlay = document.querySelector('.mobile-menu-overlay');
    
    // Open mobile menu
    hamburger.addEventListener('click', function() {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    // Close mobile menu
    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    closeMenu.addEventListener('click', closeMobileMenu);
    overlay.addEventListener('click', closeMobileMenu);
    
    // Close menu when clicking on a link
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMobileMenu();
        });
    });
}

// ========================================
// SMOOTH SCROLL
// ========================================

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip empty anchors
            if (href === '#' || href === '#!') {
                e.preventDefault();
                return;
            }
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// COUNTER ANIMATION
// ========================================

function initCounterAnimation() {
    const counters = document.querySelectorAll('.numero');
    let hasAnimated = false;
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                counters.forEach(counter => {
                    animateCounter(counter);
                });
            }
        });
    }, observerOptions);
    
    const numerosSection = document.querySelector('.numeros');
    if (numerosSection) {
        observer.observe(numerosSection);
    }
}

function animateCounter(counter) {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60 FPS
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        
        if (current < target) {
            counter.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            counter.textContent = target;
        }
    };
    
    updateCounter();
}

// ========================================
// TESTIMONIAL SLIDER (SWIPER)
// ========================================

function initTestimonialSlider() {
    const swiper = new Swiper('.depoimentos-slider', {
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        speed: 800,
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        }
    });
}

// ========================================
// CONTACT FORM VALIDATION
// ========================================

function initContactForm() {
    const form = document.getElementById('contactForm');
    const modal = document.getElementById('successModal');
    const closeModalBtn = document.getElementById('closeModal');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clear previous errors
        clearErrors();
        
        // Get form values
        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const telefone = document.getElementById('telefone').value.trim();
        
        let isValid = true;
        
        // Validate nome
        if (nome === '') {
            showError('nomeError', 'Por favor, preencha seu nome.');
            isValid = false;
        }
        
        // Validate email
        if (email === '') {
            showError('emailError', 'Por favor, preencha seu e-mail.');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError('emailError', 'Por favor, insira um e-mail válido.');
            isValid = false;
        }
        
        // Validate telefone
        if (telefone === '') {
            showError('telefoneError', 'Por favor, preencha seu telefone.');
            isValid = false;
        }
        
        // If form is valid, show success message
        if (isValid) {
            showSuccessModal();
            form.reset();
        }
    });
    
    // Close modal
    closeModalBtn.addEventListener('click', function() {
        modal.classList.remove('active');
    });
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
}

function clearErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.textContent = '';
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showSuccessModal() {
    const modal = document.getElementById('successModal');
    modal.classList.add('active');
}

// ========================================
// CARD HOVER EFFECTS (Additional Enhancement)
// ========================================

const cards = document.querySelectorAll('.empreendimento-card');

cards.forEach(card => {
    const cardImage = card.querySelector('.card-image');
    
    card.addEventListener('mouseenter', function() {
        cardImage.style.transform = 'scale(1.05)';
    });
    
    card.addEventListener('mouseleave', function() {
        cardImage.style.transform = 'scale(1)';
    });
});

// ========================================
// PARALLAX EFFECT ON HERO (Optional Enhancement)
// ========================================

window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero');
    const scrollPosition = window.pageYOffset;
    
    if (hero && scrollPosition < window.innerHeight) {
        hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
    }
});

// ========================================
// SCROLL REVEAL ENHANCEMENTS
// ========================================

// Add staggered animation to grid items
const gridItems = document.querySelectorAll('.empreendimentos-grid .empreendimento-card');
gridItems.forEach((item, index) => {
    item.setAttribute('data-aos-delay', (index + 1) * 100);
});

// ========================================
// ACTIVE NAVIGATION LINK
// ========================================

window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ========================================
// LOADING ANIMATION (Optional)
// ========================================

window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Add fade-in effect to hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        setTimeout(() => {
            heroContent.style.transition = 'opacity 1s ease';
            heroContent.style.opacity = '1';
        }, 100);
    }
});

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Debounce function for scroll events
function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Throttle function for performance optimization
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Apply throttle to scroll events
const throttledScroll = throttle(function() {
    // Add any additional scroll-based animations here
}, 100);

window.addEventListener('scroll', throttledScroll);

// ========================================
// PREVENT SCROLL WHEN MOBILE MENU IS OPEN
// ========================================

const mobileMenu = document.getElementById('mobileMenu');
const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.attributeName === 'class') {
            if (mobileMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        }
    });
});

observer.observe(mobileMenu, {
    attributes: true
});

// ========================================
// ACCESSIBILITY IMPROVEMENTS
// ========================================

// Add keyboard navigation for modal
document.addEventListener('keydown', function(e) {
    const modal = document.getElementById('successModal');
    
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        modal.classList.remove('active');
    }
});

// Focus management for mobile menu
const hamburger = document.getElementById('hamburger');
const closeMenu = document.getElementById('closeMenu');

hamburger.addEventListener('click', function() {
    setTimeout(() => {
        closeMenu.focus();
    }, 300);
});

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================

// Lazy load images (if needed)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ========================================
// ANALYTICS TRACKING (Placeholder)
// ========================================

// Track CTA button clicks
const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
ctaButtons.forEach(button => {
    button.addEventListener('click', function() {
        const buttonText = this.textContent.trim();
        console.log(`CTA Clicked: ${buttonText}`);
        // Add your analytics tracking code here
        // Example: gtag('event', 'click', { 'event_category': 'CTA', 'event_label': buttonText });
    });
});

// Track project card clicks
const projectCards = document.querySelectorAll('.card-link');
projectCards.forEach(card => {
    card.addEventListener('click', function(e) {
        const projectName = this.closest('.empreendimento-card').querySelector('.card-title').textContent;
        console.log(`Project Clicked: ${projectName}`);
        // Add your analytics tracking code here
    });
});

// ========================================
// CONSOLE WELCOME MESSAGE
// ========================================

console.log('%c[NOME DA CONSTRUTORA]', 'color: #2C4A3E; font-size: 24px; font-weight: bold;');
console.log('%cSite desenvolvido com sustentabilidade e design premium em mente.', 'color: #B87333; font-size: 14px;');
console.log('%cInteressado em trabalhar conosco? Entre em contato!', 'color: #2B2B2B; font-size: 12px;');
