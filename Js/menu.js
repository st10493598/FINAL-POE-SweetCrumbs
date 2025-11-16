// Menu-specific JavaScript for Sweet Crumbs Bakery
// Handles search functionality and accordion interactions

$(document).ready(function() {
    // Accordion functionality
    $('.accordion').click(function() {
        // Close all other panels
        $('.accordion').not(this).removeClass('active');
        $('.panel').not($(this).next()).slideUp().removeClass('active');

        // Toggle current panel
        $(this).toggleClass('active');
        $(this).next('.panel').slideToggle().toggleClass('active');

        // Special handling for Cakes accordion
        if ($(this).text() === 'Cakes' && $(this).hasClass('active')) {
            // Show cake details after a short delay
            setTimeout(function() {
                $('.cake-details').slideDown(500);
            }, 300);
        } else {
            // Hide cake details when closing
            $('.cake-details').slideUp(300);
        }

        // Smooth scroll to the opened accordion
        if ($(this).hasClass('active')) {
            $('html, body').animate({
                scrollTop: $(this).offset().top - 100
            }, 300);
        }
    });

    // Search functionality
    $('#menu-search').on('input', function() {
        var searchTerm = $(this).val().toLowerCase();

        if (searchTerm === '') {
            // Show all items and reset accordions
            $('.menu-category li').show();
            $('.accordion').removeClass('active');
            $('.panel').slideUp();
        } else {
            // Filter items
            $('.menu-category li').each(function() {
                var itemText = $(this).text().toLowerCase();
                if (itemText.includes(searchTerm)) {
                    $(this).show();
                    // Open the parent accordion
                    $(this).closest('.menu-category').find('.accordion').addClass('active');
                    $(this).closest('.panel').slideDown();
                } else {
                    $(this).hide();
                }
            });

            // Hide empty categories
            $('.menu-category').each(function() {
                var visibleItems = $(this).find('li:visible').length;
                if (visibleItems === 0) {
                    $(this).hide();
                } else {
                    $(this).show();
                }
            });
        }
    });

    // Add hover effects for menu items
    $('.menu-category li').hover(
        function() {
            $(this).css('background-color', '#f8d7da');
        },
        function() {
            $(this).css('background-color', 'transparent');
        }
    );

    // Add click tracking for menu items
    $('.menu-category li').on('click', function() {
        var itemName = $(this).text().split(' - ')[0];
        console.log('Menu item clicked: ' + itemName);
        // Here you could add to cart functionality or analytics
    });

    // Initialize first accordion as open for better UX
    $('.accordion:first').addClass('active');
    $('.panel:first').slideDown();
});
