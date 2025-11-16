// Common JavaScript for Sweet Crumbs Bakery
// Includes animations, smooth scroll, and utility functions

$(document).ready(function() {
    // Smooth scrolling for navigation links
    $('a[href^="#"]').on('click', function(event) {
        var target = $(this.getAttribute('href'));
        if (target.length) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 100
            }, 1000);
        }
    });

    // Fade-in animation for sections on scroll
    function fadeInOnScroll() {
        $('.fade-in').each(function() {
            var elementTop = $(this).offset().top;
            var elementBottom = elementTop + $(this).outerHeight();
            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();

            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).addClass('visible');
            }
        });
    }

    // Add fade-in class to sections
    $('section').addClass('fade-in');

    // Initial check and scroll event
    fadeInOnScroll();
    $(window).on('scroll', fadeInOnScroll);

    // Enhanced hover effects for product cards
    $('.product-card, .testimonial').hover(
        function() {
            $(this).addClass('enhanced-hover');
        },
        function() {
            $(this).removeClass('enhanced-hover');
        }
    );

    // CTA button pulse animation
    function pulseCTA() {
        $('.cta-button').animate({
            transform: 'scale(1.05)'
        }, 500).animate({
            transform: 'scale(1)'
        }, 500, pulseCTA);
    }
    pulseCTA();

    // Mobile menu toggle with animation
    $('#menu-toggle').change(function() {
        if ($(this).is(':checked')) {
            $('nav ul').slideDown(300);
        } else {
            $('nav ul').slideUp(300);
        }
    });
});
