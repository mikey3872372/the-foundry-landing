// Form handling and validation for The Foundry Landing Page

class FormHandler {
    constructor() {
        this.forms = new Map();
        this.init();
    }

    init() {
        this.initFoundersForm();
        this.initContactForm();
        this.setupFormValidation();
    }

    // ===== FOUNDER'S CLUB FORM =====
    initFoundersForm() {
        const foundersForm = document.getElementById('foundersForm');
        if (!foundersForm) return;

        this.forms.set('founders', {
            element: foundersForm,
            endpoint: '/api/founders-signup', // Update with your actual endpoint
            successMessage: 'Welcome to The Founder\'s Club! Check your email for confirmation.',
            fields: {
                firstName: { required: true, minLength: 2 },
                lastName: { required: true, minLength: 2 },
                email: { required: true, pattern: 'email' },
                phone: { required: true, pattern: 'phone' },
                membership: { required: true }
            }
        });

        foundersForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmission('founders', foundersForm);
        });

        // Real-time validation
        this.setupRealTimeValidation(foundersForm);
    }

    // ===== CONTACT FORM =====
    initContactForm() {
        const contactForm = document.getElementById('contactForm');
        if (!contactForm) return;

        this.forms.set('contact', {
            element: contactForm,
            endpoint: '/api/contact', // Update with your actual endpoint
            successMessage: 'Thank you for your message! We\'ll get back to you soon.',
            fields: {
                name: { required: true, minLength: 2 },
                email: { required: true, pattern: 'email' },
                message: { required: true, minLength: 10 }
            }
        });

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmission('contact', contactForm);
        });

        // Real-time validation
        this.setupRealTimeValidation(contactForm);
    }

    // ===== FORM VALIDATION =====
    setupFormValidation() {
        // Custom validation patterns
        this.validationPatterns = {
            email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            phone: /^[\+]?[\(\)\s\-\d]{10,}$/,
            name: /^[a-zA-Z\s\-'\.]{2,}$/
        };

        // Custom validation messages
        this.validationMessages = {
            required: 'This field is required',
            email: 'Please enter a valid email address',
            phone: 'Please enter a valid phone number',
            minLength: 'This field must be at least {min} characters long',
            name: 'Please enter a valid name'
        };
    }

    setupRealTimeValidation(form) {
        const inputs = form.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            // Validate on blur
            input.addEventListener('blur', () => {
                this.validateField(input);
            });

            // Clear validation on focus
            input.addEventListener('focus', () => {
                this.clearFieldValidation(input);
            });

            // Validate on input for immediate feedback
            input.addEventListener('input', () => {
                if (input.classList.contains('error')) {
                    this.validateField(input);
                }
            });
        });
    }

    validateField(field) {
        const formKey = field.closest('form').id === 'foundersForm' ? 'founders' : 'contact';
        const formConfig = this.forms.get(formKey);
        const fieldName = field.name;
        const fieldConfig = formConfig.fields[fieldName];
        
        if (!fieldConfig) return true;

        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Required validation
        if (fieldConfig.required && !value) {
            isValid = false;
            errorMessage = this.validationMessages.required;
        }

        // Pattern validation
        if (isValid && value && fieldConfig.pattern) {
            const pattern = this.validationPatterns[fieldConfig.pattern];
            if (pattern && !pattern.test(value)) {
                isValid = false;
                errorMessage = this.validationMessages[fieldConfig.pattern];
            }
        }

        // Min length validation
        if (isValid && value && fieldConfig.minLength && value.length < fieldConfig.minLength) {
            isValid = false;
            errorMessage = this.validationMessages.minLength.replace('{min}', fieldConfig.minLength);
        }

        // Update field appearance
        if (isValid) {
            this.markFieldValid(field);
        } else {
            this.markFieldInvalid(field, errorMessage);
        }

        return isValid;
    }

    markFieldValid(field) {
        const formGroup = field.closest('.form-group');
        formGroup.classList.remove('error');
        field.classList.remove('error');
        
        const existingError = formGroup.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    }

    markFieldInvalid(field, message) {
        const formGroup = field.closest('.form-group');
        formGroup.classList.add('error');
        field.classList.add('error');
        
        // Remove existing error message
        const existingError = formGroup.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }

        // Add new error message
        const errorElement = document.createElement('span');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        formGroup.appendChild(errorElement);
    }

    clearFieldValidation(field) {
        const formGroup = field.closest('.form-group');
        formGroup.classList.remove('error');
        field.classList.remove('error');
        
        const existingError = formGroup.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    }

    // ===== FORM SUBMISSION =====
    async handleFormSubmission(formKey, formElement) {
        const formConfig = this.forms.get(formKey);
        
        // Validate all fields
        const isFormValid = this.validateForm(formElement, formConfig);
        if (!isFormValid) {
            this.showFormMessage(formElement, 'Please correct the errors below.', 'error');
            return;
        }

        // Show loading state
        const submitButton = formElement.querySelector('button[type="submit"]');
        this.setButtonLoading(submitButton, true);

        try {
            // Collect form data
            const formData = this.collectFormData(formElement);
            
            // For demo purposes, we'll simulate a successful submission
            // Replace this with actual API call
            await this.simulateFormSubmission(formData, formConfig.endpoint);
            
            // Show success message
            this.showFormMessage(formElement, formConfig.successMessage, 'success');
            
            // Reset form
            formElement.reset();
            
            // Track conversion (if analytics is set up)
            this.trackFormConversion(formKey, formData);
            
        } catch (error) {
            console.error('Form submission error:', error);
            this.showFormMessage(formElement, 'Sorry, there was an error submitting your form. Please try again.', 'error');
        } finally {
            this.setButtonLoading(submitButton, false);
        }
    }

    validateForm(formElement, formConfig) {
        const inputs = formElement.querySelectorAll('input, select, textarea');
        let isValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        return isValid;
    }

    collectFormData(formElement) {
        const formData = new FormData(formElement);
        const data = {};
        
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
        
        // Add timestamp and source
        data.timestamp = new Date().toISOString();
        data.source = 'landing-page';
        data.userAgent = navigator.userAgent;
        data.referrer = document.referrer;
        
        return data;
    }

    async simulateFormSubmission(data, endpoint) {
        // Simulate API call with delay
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate 95% success rate
                if (Math.random() > 0.05) {
                    resolve({ success: true, message: 'Form submitted successfully' });
                } else {
                    reject(new Error('Simulated server error'));
                }
            }, 1500);
        });
    }

    // Real API submission (replace the simulate function with this)
    async submitFormData(data, endpoint) {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    }

    // ===== UI HELPERS =====
    showFormMessage(formElement, message, type) {
        // Remove existing messages
        const existingMessage = formElement.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create new message
        const messageElement = document.createElement('div');
        messageElement.className = `form-message form-${type}`;
        messageElement.textContent = message;

        // Insert at the top of the form
        formElement.insertBefore(messageElement, formElement.firstChild);

        // Auto-remove success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                if (messageElement.parentNode) {
                    messageElement.remove();
                }
            }, 5000);
        }

        // Scroll to message
        messageElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    setButtonLoading(button, isLoading) {
        if (isLoading) {
            button.classList.add('loading');
            button.disabled = true;
            button.dataset.originalText = button.textContent;
            button.textContent = 'Submitting...';
        } else {
            button.classList.remove('loading');
            button.disabled = false;
            button.textContent = button.dataset.originalText || 'Submit';
        }
    }

    // ===== ANALYTICS & TRACKING =====
    trackFormConversion(formType, formData) {
        // Google Analytics 4 tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', 'form_submit', {
                form_type: formType,
                membership_interest: formData.membership || 'contact',
                event_category: 'engagement',
                event_label: formType
            });
        }

        // Facebook Pixel tracking
        if (typeof fbq !== 'undefined') {
            fbq('track', 'Lead', {
                content_name: `${formType}_form`,
                content_category: 'fitness_membership'
            });
        }

        // Custom analytics endpoint
        this.sendAnalyticsEvent({
            event: 'form_submission',
            form_type: formType,
            timestamp: new Date().toISOString(),
            user_data: {
                referrer: document.referrer,
                user_agent: navigator.userAgent
            }
        });
    }

    async sendAnalyticsEvent(eventData) {
        try {
            await fetch('/api/analytics', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(eventData)
            });
        } catch (error) {
            console.log('Analytics tracking failed:', error);
        }
    }

    // ===== FORM ENHANCEMENTS =====
    initFormEnhancements() {
        // Auto-format phone numbers
        document.querySelectorAll('input[type="tel"]').forEach(input => {
            input.addEventListener('input', (e) => {
                this.formatPhoneNumber(e.target);
            });
        });

        // Auto-capitalize names
        document.querySelectorAll('input[name="firstName"], input[name="lastName"], input[name="name"]').forEach(input => {
            input.addEventListener('input', (e) => {
                this.capitalizeName(e.target);
            });
        });

        // Prevent form double-submission
        document.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', () => {
                setTimeout(() => {
                    const submitBtn = form.querySelector('button[type="submit"]');
                    if (submitBtn) {
                        submitBtn.disabled = true;
                    }
                }, 100);
            });
        });
    }

    formatPhoneNumber(input) {
        const value = input.value.replace(/\D/g, '');
        let formattedValue = '';

        if (value.length > 0) {
            if (value.length <= 3) {
                formattedValue = value;
            } else if (value.length <= 6) {
                formattedValue = `(${value.slice(0, 3)}) ${value.slice(3)}`;
            } else {
                formattedValue = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
            }
        }

        input.value = formattedValue;
    }

    capitalizeName(input) {
        const words = input.value.split(' ');
        const capitalizedWords = words.map(word => {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        });
        input.value = capitalizedWords.join(' ');
    }

    // ===== ACCESSIBILITY =====
    initAccessibilityFeatures() {
        // Add ARIA labels for better screen reader support
        document.querySelectorAll('input, select, textarea').forEach(field => {
            if (!field.getAttribute('aria-label') && !field.getAttribute('aria-labelledby')) {
                const label = field.closest('.form-group')?.querySelector('label');
                if (label) {
                    const labelId = `label-${Math.random().toString(36).substr(2, 9)}`;
                    label.id = labelId;
                    field.setAttribute('aria-labelledby', labelId);
                }
            }

            // Add aria-invalid for validation states
            field.addEventListener('invalid', () => {
                field.setAttribute('aria-invalid', 'true');
            });

            field.addEventListener('input', () => {
                if (field.validity.valid) {
                    field.removeAttribute('aria-invalid');
                }
            });
        });
    }
}

// ===== INITIALIZE FORMS =====
document.addEventListener('DOMContentLoaded', () => {
    const formHandler = new FormHandler();
    formHandler.initFormEnhancements();
    formHandler.initAccessibilityFeatures();
});

// ===== FORM STYLES (to be added to CSS) =====
const formStyles = `
/* Form Messages */
.form-message {
    padding: 1rem;
    border-radius: var(--radius-md);
    margin-bottom: 1rem;
    font-weight: 500;
}

.form-success {
    background-color: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
}

.form-error {
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
}

/* Field Errors */
.field-error {
    display: block;
    color: var(--error-color);
    font-size: var(--font-size-sm);
    margin-top: var(--spacing-xs);
}

.form-group.error input,
.form-group.error select,
.form-group.error textarea {
    border-color: var(--error-color);
    box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
}

/* Loading Button States */
.btn.loading {
    position: relative;
    color: transparent;
    pointer-events: none;
}

.btn.loading::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    margin: -10px 0 0 -10px;
    border: 2px solid transparent;
    border-top: 2px solid currentColor;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

/* Form Animations */
.form-group {
    transition: all var(--transition-base);
}

.form-group.error {
    animation: shake 0.5s ease-in-out;
}

@keyframes shake {
    0%, 20%, 40%, 60%, 80% {
        transform: translateX(0);
    }
    10%, 30%, 50%, 70%, 90% {
        transform: translateX(-5px);
    }
}

/* Focus Styles */
input:focus,
select:focus,
textarea:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
}

/* Placeholder Styles */
::placeholder {
    color: #999;
    opacity: 1;
}

/* Required Field Indicators */
.required::after {
    content: ' *';
    color: var(--error-color);
}
`;

// Inject form styles
const formStyleSheet = document.createElement('style');
formStyleSheet.textContent = formStyles;
document.head.appendChild(formStyleSheet);

// Export for external use
window.FoundryForms = FormHandler;