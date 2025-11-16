// Enquiry-specific JavaScript for Sweet Crumbs Bakery
// Handles enquiry form validation and EmailJS submission

document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS with your public key (replace with your actual key)
    emailjs.init('YOUR_PUBLIC_KEY'); // Replace with your EmailJS public key

    const form = document.getElementById('enquiryForm');
    const errorMessages = document.getElementById('errorMessages');
    const response = document.getElementById('response');
    const responseText = document.getElementById('responseText');
    const submitButton = form.querySelector('button[type="submit"]');

    // Real-time validation
    function validateField(field, fieldName, rules) {
        const value = field.value.trim();
        const errorElement = field.parentNode.querySelector('.field-error');
        let errorMessage = '';

        if (rules.required && !value) {
            errorMessage = `${fieldName} is required.`;
        } else if (rules.minLength && value.length < rules.minLength) {
            errorMessage = `${fieldName} must be at least ${rules.minLength} characters.`;
        } else if (rules.maxLength && value.length > rules.maxLength) {
            errorMessage = `${fieldName} must be less than ${rules.maxLength} characters.`;
        } else if (rules.pattern && !rules.pattern.test(value)) {
            errorMessage = rules.errorMessage || `Please enter a valid ${fieldName.toLowerCase()}.`;
        }

        if (errorMessage) {
            if (!errorElement) {
                const errorDiv = document.createElement('div');
                errorDiv.className = 'field-error error-message';
                errorDiv.textContent = errorMessage;
                field.parentNode.appendChild(errorDiv);
            } else {
                errorElement.textContent = errorMessage;
                errorElement.style.display = 'block';
            }
            field.classList.add('invalid');
            return false;
        } else {
            if (errorElement) {
                errorElement.style.display = 'none';
            }
            field.classList.remove('invalid');
            return true;
        }
    }

    // Attach real-time validation
    document.getElementById('name').addEventListener('input', function() {
        validateField(this, 'Full Name', { required: true, minLength: 2, maxLength: 50 });
    });
    document.getElementById('name').addEventListener('blur', function() {
        validateField(this, 'Full Name', { required: true, minLength: 2, maxLength: 50 });
    });

    document.getElementById('email').addEventListener('input', function() {
        validateField(this, 'Email', { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, errorMessage: 'Please enter a valid email address.' });
    });
    document.getElementById('email').addEventListener('blur', function() {
        validateField(this, 'Email', { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, errorMessage: 'Please enter a valid email address.' });
    });

    document.getElementById('phone').addEventListener('input', function() {
        validateField(this, 'Phone Number', { required: true, pattern: /^\+?[0-9\s\-\(\)]{10,15}$/, errorMessage: 'Please enter a valid phone number (10-15 digits).' });
    });
    document.getElementById('phone').addEventListener('blur', function() {
        validateField(this, 'Phone Number', { required: true, pattern: /^\+?[0-9\s\-\(\)]{10,15}$/, errorMessage: 'Please enter a valid phone number (10-15 digits).' });
    });

    document.getElementById('enquiryType').addEventListener('change', function() {
        validateField(this, 'Enquiry Type', { required: true });
    });

    document.getElementById('details').addEventListener('input', function() {
        validateField(this, 'Details', { required: true, minLength: 10, maxLength: 500 });
    });
    document.getElementById('details').addEventListener('blur', function() {
        validateField(this, 'Details', { required: true, minLength: 10, maxLength: 500 });
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        errorMessages.innerHTML = '';
        errorMessages.classList.remove('error-message');
        errorMessages.style.display = 'none';

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const enquiryType = document.getElementById('enquiryType').value;
        const details = document.getElementById('details').value.trim();

        let errors = [];

        // Name validation
        if (!name) {
            errors.push('Full Name is required.');
        } else if (name.length < 2) {
            errors.push('Full Name must be at least 2 characters.');
        } else if (name.length > 50) {
            errors.push('Full Name must be less than 50 characters.');
        }

        // Email validation
        if (!email) {
            errors.push('Email is required.');
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.push('Please enter a valid email address.');
        }

        // Phone validation
        if (!phone) {
            errors.push('Phone Number is required.');
        } else if (!/^\+?[0-9\s\-\(\)]{10,15}$/.test(phone)) {
            errors.push('Please enter a valid phone number (10-15 digits).');
        }

        // Enquiry type validation
        if (!enquiryType) {
            errors.push('Please select an enquiry type.');
        }

        // Details validation
        if (!details) {
            errors.push('Details are required.');
        } else if (details.length < 10) {
            errors.push('Details must be at least 10 characters.');
        } else if (details.length > 500) {
            errors.push('Details must be less than 500 characters.');
        }

        if (errors.length > 0) {
            errorMessages.classList.add('error-message');
            errorMessages.innerHTML = '<ul>' + errors.map(e => '<li>' + e + '</li>').join('') + '</ul>';
            errorMessages.style.display = 'block';
            return;
        }

        // Show loading state
        submitButton.classList.add('loading');
        submitButton.innerHTML = '<span class="loading-spinner"></span>Submitting...';

        // Prepare EmailJS template parameters
        const templateParams = {
            from_name: name,
            from_email: email,
            phone: phone,
            enquiry_type: enquiryType,
            details: details,
            to_email: 'info@sweetcrumbs.co.za'
        };

        // Send email using EmailJS
        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams) // Replace with your service and template IDs
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);

                // Simulate response based on enquiry type
                let responseMessage = '';
                switch (enquiryType) {
                    case 'product':
                        responseMessage = 'Thank you for your enquiry about our products/services. Our prices start from R110 for cakes and R12 for muffins. We will contact you within 24 hours with more details.';
                        break;
                    case 'volunteer':
                        responseMessage = 'Thank you for your interest in volunteering. We have opportunities available. Please check back soon or contact us directly for current availability.';
                        break;
                    case 'sponsor':
                        responseMessage = 'Thank you for considering sponsorship. We offer various sponsorship packages. We will contact you soon to discuss options.';
                        break;
                    default:
                        responseMessage = 'Thank you for your enquiry. We will get back to you soon.';
                }

                responseText.textContent = responseMessage;
                form.style.display = 'none';
                response.style.display = 'block';
                submitButton.classList.remove('loading');
                submitButton.innerHTML = 'Submit Enquiry';
            })
            .catch(function(error) {
                console.log('FAILED...', error);
                errorMessages.classList.add('error-message');
                errorMessages.innerHTML = '<p>There was an error submitting your enquiry. Please try again later.</p>';
                errorMessages.style.display = 'block';
                submitButton.classList.remove('loading');
                submitButton.innerHTML = 'Submit Enquiry';
            });
    });
});
