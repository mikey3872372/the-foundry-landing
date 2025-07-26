// Animation utilities and effects for The Foundry Landing Page

// ===== SCROLL ANIMATIONS =====
class ScrollAnimations {
    constructor() {
        this.observers = new Map();
        this.init();
    }

    init() {
        this.initIntersectionObservers();
        this.initCountUpAnimations();
        this.initStaggeredAnimations();
        this.initProgressIndicators();
    }

    // Intersection Observer for element visibility
    initIntersectionObservers() {
        const fadeInOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const slideInOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        };

        // Fade in from bottom animation
        this.observers.set('fadeIn', new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    this.observers.get('fadeIn').unobserve(entry.target);
                }
            });
        }, fadeInOptions));

        // Slide in from sides animation
        this.observers.set('slideIn', new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const direction = entry.target.dataset.slideDirection || 'left';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                    this.observers.get('slideIn').unobserve(entry.target);
                }
            });
        }, slideInOptions));

        // Scale in animation
        this.observers.set('scaleIn', new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'scale(1)';
                    this.observers.get('scaleIn').unobserve(entry.target);
                }
            });
        }, fadeInOptions));

        this.observeElements();
    }

    observeElements() {
        // Fade in animations
        document.querySelectorAll('.animate-fade-in').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            this.observers.get('fadeIn').observe(el);
        });

        // Slide in animations
        document.querySelectorAll('.animate-slide-in').forEach(el => {
            const direction = el.dataset.slideDirection || 'left';
            el.style.opacity = '0';
            el.style.transform = direction === 'right' ? 'translateX(50px)' : 'translateX(-50px)';
            el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            this.observers.get('slideIn').observe(el);
        });

        // Scale in animations
        document.querySelectorAll('.animate-scale-in').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'scale(0.8)';
            el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            this.observers.get('scaleIn').observe(el);
        });

        // Auto-apply animations to common elements
        this.autoApplyAnimations();
    }

    autoApplyAnimations() {
        // Automatically add fade-in to feature cards
        document.querySelectorAll('.feature-card').forEach((el, index) => {
            el.classList.add('animate-fade-in');
            el.style.transitionDelay = `${index * 0.1}s`;
        });

        // Automatically add scale-in to membership cards
        document.querySelectorAll('.membership-card').forEach((el, index) => {
            el.classList.add('animate-scale-in');
            el.style.transitionDelay = `${index * 0.2}s`;
        });

        // Automatically add slide-in to testimonials
        document.querySelectorAll('.testimonial-card').forEach((el, index) => {
            el.classList.add('animate-slide-in');
            el.dataset.slideDirection = index % 2 === 0 ? 'left' : 'right';
            el.style.transitionDelay = `${index * 0.15}s`;
        });

        // Re-observe after adding classes
        setTimeout(() => this.observeElements(), 100);
    }

    // Staggered animations for grids
    initStaggeredAnimations() {
        const staggeredElements = document.querySelectorAll('.stagger-animation');
        
        staggeredElements.forEach(container => {
            const children = container.children;
            const staggerDelay = parseInt(container.dataset.staggerDelay) || 100;
            
            Array.from(children).forEach((child, index) => {
                child.style.animationDelay = `${index * staggerDelay}ms`;
            });
        });
    }

    // Count-up animations for numbers
    initCountUpAnimations() {
        const countElements = document.querySelectorAll('.count-up');
        
        const countObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCountUp(entry.target);
                    countObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        countElements.forEach(el => countObserver.observe(el));
    }

    animateCountUp(element) {
        const target = parseInt(element.dataset.target) || 0;
        const duration = parseInt(element.dataset.duration) || 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target.toLocaleString();
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current).toLocaleString();
            }
        }, 16);
    }

    // Progress indicators for sections
    initProgressIndicators() {
        const progressBars = document.querySelectorAll('.progress-bar');
        
        const progressObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressFill = entry.target.querySelector('.progress-fill');
                    const targetWidth = entry.target.dataset.progress || '100';
                    
                    if (progressFill) {
                        progressFill.style.width = `${targetWidth}%`;
                    }
                    progressObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        progressBars.forEach(bar => progressObserver.observe(bar));
    }
}

// ===== PARALLAX EFFECTS =====
class ParallaxController {
    constructor() {
        this.elements = [];
        this.isScrolling = false;
        this.init();
    }

    init() {
        this.bindEvents();
        this.collectElements();
    }

    collectElements() {
        document.querySelectorAll('[data-parallax]').forEach(el => {
            const speed = parseFloat(el.dataset.parallaxSpeed) || 0.5;
            const direction = el.dataset.parallaxDirection || 'vertical';
            
            this.elements.push({
                element: el,
                speed: speed,
                direction: direction,
                offset: el.getBoundingClientRect().top + window.pageYOffset
            });
        });
    }

    bindEvents() {
        let ticking = false;

        const updateParallax = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.updateElements();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', updateParallax);
        window.addEventListener('resize', () => {
            this.elements = [];
            this.collectElements();
        });
    }

    updateElements() {
        const scrollY = window.pageYOffset;
        const windowHeight = window.innerHeight;

        this.elements.forEach(({ element, speed, direction, offset }) => {
            const elementTop = offset;
            const elementHeight = element.offsetHeight;
            
            // Check if element is in viewport
            if (scrollY + windowHeight > elementTop && scrollY < elementTop + elementHeight) {
                const yPos = -(scrollY - elementTop) * speed;
                
                if (direction === 'vertical') {
                    element.style.transform = `translateY(${yPos}px)`;
                } else if (direction === 'horizontal') {
                    element.style.transform = `translateX(${yPos}px)`;
                }
            }
        });
    }
}

// ===== HOVER EFFECTS =====
class HoverEffects {
    constructor() {
        this.init();
    }

    init() {
        this.initCardHovers();
        this.initButtonHovers();
        this.initImageHovers();
        this.initMagneticHovers();
    }

    initCardHovers() {
        document.querySelectorAll('.hover-lift').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px)';
                card.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = '';
            });
        });
    }

    initButtonHovers() {
        document.querySelectorAll('.btn-animated').forEach(btn => {
            btn.addEventListener('mouseenter', (e) => {
                const ripple = document.createElement('span');
                ripple.className = 'ripple';
                btn.appendChild(ripple);

                const rect = btn.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
                ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';

                setTimeout(() => {
                    if (ripple.parentNode) {
                        ripple.parentNode.removeChild(ripple);
                    }
                }, 600);
            });
        });
    }

    initImageHovers() {
        document.querySelectorAll('.image-zoom').forEach(container => {
            const img = container.querySelector('img');
            
            container.addEventListener('mouseenter', () => {
                if (img) {
                    img.style.transform = 'scale(1.1)';
                }
            });

            container.addEventListener('mouseleave', () => {
                if (img) {
                    img.style.transform = 'scale(1)';
                }
            });
        });
    }

    initMagneticHovers() {
        document.querySelectorAll('.magnetic').forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                el.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
            });

            el.addEventListener('mouseleave', () => {
                el.style.transform = 'translate(0, 0)';
            });
        });
    }
}

// ===== LOADING ANIMATIONS =====
class LoadingAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.showPageLoader();
        this.hidePageLoader();
    }

    showPageLoader() {
        const loader = document.createElement('div');
        loader.id = 'page-loader';
        loader.innerHTML = `
            <div class="loader-content">
                <div class="loader-logo">
                    <img src="assets/images/logos/foundry-logo.svg" alt="The Foundry">
                </div>
                <div class="loader-spinner"></div>
            </div>
        `;
        document.body.appendChild(loader);
    }

    hidePageLoader() {
        window.addEventListener('load', () => {
            const loader = document.getElementById('page-loader');
            if (loader) {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.remove();
                }, 500);
            }
        });
    }
}

// ===== TEXT ANIMATIONS =====
class TextAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.initTypewriter();
        this.initSplitText();
    }

    initTypewriter() {
        document.querySelectorAll('.typewriter').forEach(el => {
            const text = el.textContent;
            const speed = parseInt(el.dataset.typeSpeed) || 100;
            
            el.textContent = '';
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.typeText(el, text, speed);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(el);
        });
    }

    typeText(element, text, speed) {
        let i = 0;
        const timer = setInterval(() => {
            element.textContent += text.charAt(i);
            i++;
            if (i >= text.length) {
                clearInterval(timer);
            }
        }, speed);
    }

    initSplitText() {
        document.querySelectorAll('.split-text').forEach(el => {
            const text = el.textContent;
            const words = text.split(' ');
            
            el.innerHTML = words.map((word, index) => 
                `<span class="word" style="animation-delay: ${index * 0.1}s">${word}</span>`
            ).join(' ');
        });
    }
}

// ===== INITIALIZE ALL ANIMATIONS =====
document.addEventListener('DOMContentLoaded', () => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
        new ScrollAnimations();
        new ParallaxController();
        new HoverEffects();
        new LoadingAnimations();
        new TextAnimations();
    }
});

// ===== CSS FOR ANIMATIONS (to be added to styles.css) =====
const animationStyles = `
/* Loading Animations */
#page-loader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--secondary-color);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    transition: opacity 0.5s ease;
}

.loader-content {
    text-align: center;
}

.loader-logo img {
    height: 60px;
    margin-bottom: 2rem;
}

.loader-spinner {
    width: 40px;
    height: 40px;
    border: 3px solid rgba(255, 107, 53, 0.3);
    border-top: 3px solid var(--primary-color);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto;
}

/* Ripple Effect */
.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
}

@keyframes ripple-animation {
    to {
        transform: scale(4);
        opacity: 0;
    }
}

/* Progress Bars */
.progress-bar {
    width: 100%;
    height: 6px;
    background: rgba(255, 107, 53, 0.2);
    border-radius: 3px;
    overflow: hidden;
}

.progress-fill {
    height: 100%;
    background: var(--primary-color);
    width: 0%;
    transition: width 1.5s ease;
}

/* Text Animations */
.word {
    display: inline-block;
    opacity: 0;
    animation: fadeInWord 0.6s forwards;
}

@keyframes fadeInWord {
    to {
        opacity: 1;
        transform: translateY(0);
    }
    from {
        opacity: 0;
        transform: translateY(20px);
    }
}

/* Typewriter Cursor */
.typewriter::after {
    content: '|';
    animation: blink 1s infinite;
}

@keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
}
`;

// Inject animation styles
const styleSheet = document.createElement('style');
styleSheet.textContent = animationStyles;
document.head.appendChild(styleSheet);

// Export for external use
window.FoundryAnimations = {
    ScrollAnimations,
    ParallaxController,
    HoverEffects,
    LoadingAnimations,
    TextAnimations
};