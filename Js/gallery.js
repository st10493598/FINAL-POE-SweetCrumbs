// Gallery-specific JavaScript for Sweet Crumbs Bakery
// Enhances gallery with additional interactive features

$(document).ready(function() {
    // Lightbox is already handled by the library, but we can add custom features

    // Add keyboard navigation for gallery
    $(document).keydown(function(e) {
        if (lightbox.visible()) {
            switch(e.which) {
                case 37: // left arrow
                    lightbox.prev();
                    break;
                case 39: // right arrow
                    lightbox.next();
                    break;
                case 27: // escape
                    lightbox.end();
                    break;
            }
            e.preventDefault();
        }
    });

    // Add loading animation for images
    $('.gallery img').each(function() {
        $(this).on('load', function() {
            $(this).addClass('loaded');
        }).each(function() {
            if (this.complete) {
                $(this).trigger('load');
            }
        });
    });

    // Add hover effects for gallery items
    $('.gallery a').hover(
        function() {
            $(this).find('img').css('transform', 'scale(1.1)');
        },
        function() {
            $(this).find('img').css('transform', 'scale(1)');
        }
    );

    // Add click tracking for analytics (placeholder)
    $('.gallery a').on('click', function() {
        var imageTitle = $(this).data('title');
        console.log('Gallery image clicked: ' + imageTitle);
        // Here you could send analytics data
    });
});
