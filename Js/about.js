// About-specific JavaScript for Sweet Crumbs Bakery
// Handles accordion functionality for team members and other sections

document.addEventListener('DOMContentLoaded', function() {
    // Accordion functionality
    const accordions = document.querySelectorAll('.accordion');

    accordions.forEach(accordion => {
        accordion.addEventListener('click', function() {
            // Toggle active class on the button
            this.classList.toggle('active');

            // Get the panel
            const panel = this.nextElementSibling;

            // Toggle the panel's max-height
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + 'px';
            }
        });
    });
});
