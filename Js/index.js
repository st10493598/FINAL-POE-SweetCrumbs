// Index-specific JavaScript for Sweet Crumbs Bakery
// Handles dynamic content loading for testimonials and products

$(document).ready(function() {
    // Dynamic testimonials loading
    var testimonials = [
        {
            text: "The best cupcakes in Thohoyandou! Always fresh and delicious.",
            author: "Sarah M."
        },
        {
            text: "Their custom cakes are absolutely stunning and taste even better!",
            author: "John D."
        },
        {
            text: "Friendly service and amazing baked goods. Highly recommend!",
            author: "Thandi N."
        },
        {
            text: "The muffins are heavenly! Can't get enough of them.",
            author: "Mike K."
        },
        {
            text: "Perfect for celebrations. Their cakes made my birthday unforgettable.",
            author: "Lisa P."
        }
    ];

    // Function to load testimonials dynamically
    function loadTestimonials() {
        $('.testimonials').empty();

        testimonials.forEach(function(testimonial, index) {
            var testimonialHTML = '<div class="testimonial fade-in">' +
                '<p>"' + testimonial.text + '"</p>' +
                '<span>- ' + testimonial.author + '</span>' +
                '</div>';

            $('.testimonials').append(testimonialHTML);

            // Stagger the fade-in animation
            setTimeout(function() {
                $('.testimonials .testimonial').eq(index).addClass('visible');
            }, index * 200);
        });
    }

    // Dynamic products loading
    var products = [
        {
            name: "Signature Cupcakes",
            description: "Our famous homemade cupcakes in various flavors",
            price: "From R15 each"
        },
        {
            name: "Custom Cakes",
            description: "Beautiful custom cakes for all occasions",
            price: "Custom pricing"
        },
        {
            name: "Fresh Muffins",
            description: "Daily baked muffins with premium ingredients",
            price: "From R12 each"
        },
        {
            name: "Artisan Breads",
            description: "Freshly baked breads using traditional methods",
            price: "From R25 each"
        }
    ];

    // Function to load products dynamically
    function loadProducts() {
        $('.featured-products').empty();

        products.forEach(function(product, index) {
            var productHTML = '<div class="product-card fade-in">' +
                '<h3>' + product.name + '</h3>' +
                '<p>' + product.description + '</p>' +
                '<span class="price">' + product.price + '</span>' +
                '</div>';

            $('.featured-products').append(productHTML);

            // Stagger the fade-in animation
            setTimeout(function() {
                $('.featured-products .product-card').eq(index).addClass('visible');
            }, index * 200);
        });
    }

    // Load content on page load
    loadTestimonials();
    loadProducts();

    // Add refresh buttons for demo purposes (can be removed in production)
    $('.testimonials').before('<button id="refresh-testimonials" style="margin-bottom: 20px;">Refresh Testimonials</button>');
    $('.featured-products').before('<button id="refresh-products" style="margin-bottom: 20px;">Refresh Products</button>');

    $('#refresh-testimonials').on('click', loadTestimonials);
    $('#refresh-products').on('click', loadProducts);

    // Add interactive features to product cards (modals)
    $(document).on('click', '.product-card', function() {
        var modalType = $(this).data('modal');
        var productName = $(this).find('h3').text();
        var productDesc = $(this).find('p').text();
        var productPrice = $(this).find('.price').text();

        var modalContent = '<h3>' + productName + '</h3>' +
            '<p>' + productDesc + '</p>' +
            '<p><strong>Price: ' + productPrice + '</strong></p>' +
            '<p>Click "Order Now" to place your order!</p>' +
            '<a href="Pages/order.html" class="cta-button">Order Now</a>';

        $('#modal-body').html(modalContent);
        $('#product-modal').show();
    });

    // Close modal
    $('.close').on('click', function() {
        $('#product-modal').hide();
    });

    $(window).on('click', function(event) {
        if (event.target == document.getElementById('product-modal')) {
            $('#product-modal').hide();
        }
    });

    // Add hover effects for testimonials
    $(document).on('mouseenter', '.testimonial', function() {
        $(this).addClass('enhanced-hover');
    }).on('mouseleave', '.testimonial', function() {
        $(this).removeClass('enhanced-hover');
    });
});
