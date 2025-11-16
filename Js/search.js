// Search feature for Sweet Crumbs Bakery
// Implements client-side search across products, testimonials, and menu items

$(document).ready(function() {
    // Add search bar to header
    $('header nav ul').after('<div class="search-container"><input type="text" id="search-input" placeholder="Search products, testimonials..."><button id="search-button">Search</button></div>');

    // Search functionality
    function performSearch(query) {
        query = query.toLowerCase().trim();
        if (!query) {
            // Reset visibility
            $('.product-card, .testimonial, .menu-item').show();
            return;
        }

        // Hide all items first
        $('.product-card, .testimonial, .menu-item').hide();

        // Show matching items
        $('.product-card, .testimonial, .menu-item').each(function() {
            var text = $(this).text().toLowerCase();
            if (text.includes(query)) {
                $(this).show();
            }
        });

        // Scroll to results
        if ($('.product-card:visible, .testimonial:visible, .menu-item:visible').length > 0) {
            $('html, body').animate({
                scrollTop: $('.product-card:visible, .testimonial:visible, .menu-item:visible').first().offset().top - 100
            }, 500);
        }
    }

    // Event listeners (delegated for dynamic content)
    $(document).on('click', '#search-button', function() {
        var query = $('#search-input').val();
        performSearch(query);
    });

    $(document).on('input', '#search-input', function() {
        var query = $(this).val();
        performSearch(query);
    });

    $(document).on('keypress', '#search-input', function(e) {
        if (e.which === 13) { // Enter key
            var query = $(this).val();
            performSearch(query);
        }
    });

    // Clear search on page change (simulate)
    $(document).on('click', 'nav a', function() {
        $('#search-input').val('');
        $('.product-card, .testimonial, .menu-item').show();
    });
});
