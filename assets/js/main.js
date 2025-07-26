// Main JavaScript functionality for The Foundry Landing Page

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initLightbox();
    initSmoothScrolling();
    initScrollEffects();
    initForgeEffects();
    initButtonSounds();
    initCountdownTimer();
    
    console.log('🔥 The Foundry: Industrial Revolution Initialized 🔥');
});

// ===== NAVIGATION FUNCTIONALITY =====
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

    // Mobile menu toggle
    navToggle?.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ===== LIGHTBOX FUNCTIONALITY =====
function initLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxClose = document.querySelector('.lightbox-close');

    // Open lightbox
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imageSrc = this.getAttribute('data-image');
            const imageAlt = this.querySelector('img').getAttribute('alt');
            
            lightboxImage.src = imageSrc || this.querySelector('img').src;
            lightboxImage.alt = imageAlt;
            lightbox.style.display = 'block';
            document.body.style.overflow = 'hidden';
            
            // Add fade-in effect
            setTimeout(() => {
                lightbox.style.opacity = '1';
            }, 10);
        });
    });

    // Close lightbox
    function closeLightbox() {
        lightbox.style.display = 'none';
        document.body.style.overflow = '';
        lightbox.style.opacity = '0';
    }

    lightboxClose?.addEventListener('click', closeLightbox);
    
    lightbox?.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Close lightbox with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.style.display === 'block') {
            closeLightbox();
        }
    });
}

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== SCROLL EFFECTS =====
function initScrollEffects() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.feature-card, .gallery-item, .membership-card, .testimonial-card'
    );
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Parallax effect for hero section (optional, can be disabled for performance)
    const hero = document.querySelector('.hero');
    const heroImage = document.querySelector('.hero-image');
    
    if (hero && heroImage) {
        let ticking = false;
        
        function updateParallax() {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            
            if (scrolled < hero.offsetHeight) {
                heroImage.style.transform = `translateY(${parallax}px)`;
            }
            
            ticking = false;
        }
        
        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }
        
        // Only enable parallax on larger screens
        if (window.innerWidth > 768) {
            window.addEventListener('scroll', requestTick);
        }
    }
}

// ===== UTILITY FUNCTIONS =====

// Debounce function for performance optimization
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
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

// Throttle function for scroll events
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
    }
}

// Handle window resize events
window.addEventListener('resize', debounce(function() {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 991) {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        navToggle?.classList.remove('active');
        navMenu?.classList.remove('active');
        document.body.style.overflow = '';
    }
}, 250));

// ===== PERFORMANCE OPTIMIZATIONS =====

// Lazy load images (for future implementation with actual images)
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Preload critical resources
function preloadResources() {
    const criticalImages = [
        'assets/images/ai-renderings/hero-rendering.webp',
        'assets/images/logos/foundry-logo.svg'
    ];

    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// Initialize lazy loading and preloading
document.addEventListener('DOMContentLoaded', function() {
    initLazyLoading();
    preloadResources();
});

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // In production, you might want to send this to an error tracking service
});

// ===== ACCESSIBILITY ENHANCEMENTS =====

// Focus management for keyboard navigation
document.addEventListener('keydown', function(e) {
    // Skip to main content
    if (e.key === 'Tab' && e.target.tagName === 'BODY') {
        const mainContent = document.querySelector('main') || document.querySelector('.hero');
        if (mainContent) {
            mainContent.focus();
        }
    }
});

// Announce dynamic content changes to screen readers
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.style.position = 'absolute';
    announcement.style.left = '-10000px';
    announcement.style.width = '1px';
    announcement.style.height = '1px';
    announcement.style.overflow = 'hidden';
    
    document.body.appendChild(announcement);
    announcement.textContent = message;
    
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// ===== FORGE SOUND EFFECTS =====
function initButtonSounds() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            // Create hover sound effect
            playForgeSound('hover');
        });
        
        button.addEventListener('click', function() {
            // Create click sound effect
            playForgeSound('click');
            
            // Add hammer strike effect
            this.classList.add('hammer-strike');
            setTimeout(() => {
                this.classList.remove('hammer-strike');
            }, 200);
        });
    });
}

function playForgeSound(type) {
    // Using Web Audio API to create forge-like sound effects
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        if (type === 'hover') {
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        } else if (type === 'click') {
            oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.1);
            gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
        }
        
        oscillator.type = 'sawtooth';
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.2);
    } catch (e) {
        // Fallback for browsers that don't support Web Audio API
        console.log('Forge sound effect: ' + type);
    }
}

// ===== INDUSTRIAL FORGE EFFECTS =====
function initForgeEffects() {
    // Add spark particles on scroll
    let sparkTimeout;
    
    window.addEventListener('scroll', function() {
        clearTimeout(sparkTimeout);
        sparkTimeout = setTimeout(() => {
            createSpark();
        }, 100);
    });
    
    // Create floating spark particles
    function createSpark() {
        const spark = document.createElement('div');
        spark.className = 'forge-spark';
        spark.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: radial-gradient(circle, #FFD700, #FF4500);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${Math.random() * window.innerWidth}px;
            top: ${Math.random() * window.innerHeight}px;
            animation: sparkle 2s ease-out forwards;
        `;
        
        document.body.appendChild(spark);
        
        setTimeout(() => {
            if (spark.parentNode) {
                spark.parentNode.removeChild(spark);
            }
        }, 2000);
    }
    
    // Add forge spark animation to CSS
    const sparkStyle = document.createElement('style');
    sparkStyle.textContent = `
        @keyframes sparkle {
            0% {
                opacity: 1;
                transform: scale(1) translateY(0);
                box-shadow: 0 0 10px #FFD700;
            }
            100% {
                opacity: 0;
                transform: scale(0.1) translateY(-100px);
                box-shadow: 0 0 5px #FF4500;
            }
        }
        
        .hammer-strike {
            animation: hammerStrike 0.2s ease-out;
        }
        
        @keyframes hammerStrike {
            0% { transform: scale(1); }
            50% { transform: scale(0.95); }
            100% { transform: scale(1); }
        }
        
        .forge-glow {
            animation: forgeGlow 3s ease-in-out infinite alternate;
        }
    `;
    document.head.appendChild(sparkStyle);
    
    // Add dramatic entrance animations
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        setTimeout(() => {
            heroTitle.style.animation = 'forgeGlow 3s ease-in-out infinite alternate, heroFadeIn 1.2s ease-out';
        }, 500);
    }
}

// ===== COUNTDOWN TIMER =====
function initCountdownTimer() {
    // Set target date to January 1, 2026
    const targetDate = new Date('2026-01-01T00:00:00').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            
            // Update DOM elements with forge-like effects
            const daysEl = document.getElementById('countdown-days');
            const hoursEl = document.getElementById('countdown-hours');
            const minutesEl = document.getElementById('countdown-minutes');
            
            if (daysEl) daysEl.textContent = days.toString().padStart(3, '0');
            if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
            if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
            
            // Add spark effect every minute
            if (minutes !== updateCountdown.lastMinute) {
                updateCountdown.lastMinute = minutes;
                createCountdownSpark();
            }
        } else {
            // The Foundry has opened!
            const countdownContainer = document.querySelector('.countdown-container');
            if (countdownContainer) {
                countdownContainer.innerHTML = `
                    <h3 style="color: var(--molten-gold); font-size: var(--font-size-2xl);">
                        🔥 THE FOUNDRY IS NOW OPEN! 🔥
                    </h3>
                `;
            }
        }
    }
    
    function createCountdownSpark() {
        const timer = document.querySelector('.countdown-timer');
        if (!timer) return;
        
        const spark = document.createElement('div');
        spark.style.cssText = `
            position: absolute;
            width: 6px;
            height: 6px;
            background: radial-gradient(circle, #FFD700, #FF4500);
            border-radius: 50%;
            pointer-events: none;
            z-index: 10;
            animation: countdownSpark 1s ease-out forwards;
        `;
        
        const rect = timer.getBoundingClientRect();
        spark.style.left = (rect.left + rect.width / 2) + 'px';
        spark.style.top = (rect.top + rect.height / 2) + 'px';
        
        document.body.appendChild(spark);
        
        setTimeout(() => {
            if (spark.parentNode) {
                spark.parentNode.removeChild(spark);
            }
        }, 1000);
    }
    
    // Add countdown spark animation
    const countdownStyle = document.createElement('style');
    countdownStyle.textContent = `
        @keyframes countdownSpark {
            0% {
                opacity: 1;
                transform: scale(1);
                box-shadow: 0 0 10px #FFD700;
            }
            100% {
                opacity: 0;
                transform: scale(3) translateY(-50px);
                box-shadow: 0 0 20px #FF4500;
            }
        }
    `;
    document.head.appendChild(countdownStyle);
    
    // Update countdown immediately, then every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Export functions for use in other modules
window.FoundryApp = {
    initNavigation,
    initLightbox,
    initSmoothScrolling,
    initScrollEffects,
    initForgeEffects,
    initButtonSounds,
    initCountdownTimer,
    debounce,
    throttle,
    announceToScreenReader,
    playForgeSound
};