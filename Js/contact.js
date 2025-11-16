// Contact-specific JavaScript for Sweet Crumbs Bakery
// Handles contact form validation and submission with EmailJS

$(document).ready(function() {
    // Initialize EmailJS with your public key (replace with your actual key)
    emailjs.init('YOUR_PUBLIC_KEY'); // Replace with your EmailJS public key

    const form = $('#contactForm');
    const errorMessages = $('#errorMessages');
    const confirmation = $('#emailConfirmation');
    const submitButton = form.find('button[type="submit"]');

    // Real-time validation
    function validateField(field, fieldName, rules) {
        const value = field.val().trim();
        const errorElement = field.siblings('.field-error');
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
            if (errorElement.length === 0) {
                field.after(`<div class="field-error error-message">${errorMessage}</div>`);
            } else {
                errorElement.text(errorMessage).show();
            }
            field.addClass('invalid');
            return false;
        } else {
            errorElement.hide();
            field.removeClass('invalid');
            return true;
        }
    }

    // Attach real-time validation
    $('#name').on('input blur', function() {
        validateField($(this), 'Name', { required: true, minLength: 2, maxLength: 50 });
    });

    $('#email').on('input blur', function() {
        validateField($(this), 'Email', { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, errorMessage: 'Please enter a valid email address.' });
    });

    $('#subject').on('input blur', function() {
        validateField($(this), 'Subject', { required: true, minLength: 5, maxLength: 100 });
    });

    $('#message').on('input blur', function() {
        validateField($(this), 'Message', { required: true, minLength: 10, maxLength: 1000 });
    });

    $('#messageType').on('change', function() {
        validateField($(this), 'Message Type', { required: true });
    });

    // Handle contact form submission
    form.on('submit', function(e) {
        e.preventDefault();

        errorMessages.empty().removeClass('error-message').hide();

        // Get form data
        var formData = {
            name: $('#name').val().trim(),
            email: $('#email').val().trim(),
            messageType: $('#messageType').val(),
            subject: $('#subject').val().trim(),
            message: $('#message').val().trim()
        };

        // Enhanced validation
        var errors = [];

        if (!formData.name) {
            errors.push('Name is required.');
        } else if (formData.name.length < 2) {
            errors.push('Name must be at least 2 characters.');
        } else if (formData.name.length > 50) {
            errors.push('Name must be less than 50 characters.');
        }

        if (!formData.email) {
            errors.push('Email is required.');
        } else {
            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                errors.push('Please enter a valid email address.');
            }
        }

        if (!formData.messageType) {
            errors.push('Please select a message type.');
        }

        if (!formData.subject) {
            errors.push('Subject is required.');
        } else if (formData.subject.length < 5) {
            errors.push('Subject must be at least 5 characters.');
        } else if (formData.subject.length > 100) {
            errors.push('Subject must be less than 100 characters.');
        }

        if (!formData.message) {
            errors.push('Message is required.');
        } else if (formData.message.length < 10) {
            errors.push('Message must be at least 10 characters.');
        } else if (formData.message.length > 1000) {
            errors.push('Message must be less than 1000 characters.');
        }

        if (errors.length > 0) {
            errorMessages.addClass('error-message').html('<ul>' + errors.map(function(error) { return '<li>' + error + '</li>'; }).join('') + '</ul>').show();
            return;
        }

        // Show loading state
        submitButton.addClass('loading').html('<span class="loading-spinner"></span>Sending...');

        // Prepare EmailJS template parameters
        var templateParams = {
            from_name: formData.name,
            from_email: formData.email,
            message_type: formData.messageType,
            subject: formData.subject,
            message: formData.message,
            to_email: 'info@sweetcrumbs.co.za'
        };

        // Send email using EmailJS
        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams) // Replace with your service and template IDs
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                form.hide();
                confirmation.show();
                submitButton.removeClass('loading').html('Send Message');
            }, function(error) {
                console.log('FAILED...', error);
                errorMessages.addClass('error-message').html('<p>There was an error sending your message. Please try again later.</p>').show();
                submitButton.removeClass('loading').html('Send Message');
            });
    });
});
