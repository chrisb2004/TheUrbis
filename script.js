function toggleDropdown(event) {
    event.preventDefault();
    const dropdown = event.target.closest('.dropdown').querySelector('.dropdown-content');
    
    // Toggle visibility
    if (dropdown.style.display === "flex") {
        dropdown.style.display = "none";
    } else {
        dropdown.style.display = "flex";
    }
}
// Smooth scroll function
function smoothScroll(target) {
    const element = document.querySelector(target);
    console.log('Scrolling to:', target, 'Found element:', element); // ← Debug log
    if (element) {
        const headerOffset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}
// Add click event listeners to dropdown links
document.querySelectorAll('.dropdown-content a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const target = this.getAttribute('href');
        smoothScroll(target);
        // Close the dropdown after clicking
        this.closest('.dropdown-content').style.display = 'none';
    });
});
// Close dropdown when clicking outside
document.addEventListener('click', function (e) {
    const dropdowns = document.querySelectorAll('.dropdown-content');
    const toggles = document.querySelectorAll('.dropdown-toggle');
    
    let isClickInside = false;
    
    // Check if click is inside any dropdown or toggle
    toggles.forEach(toggle => {
        if (toggle.contains(e.target)) {
            isClickInside = true;
        }
    });
    
    dropdowns.forEach(dropdown => {
        if (dropdown.contains(e.target)) {
            isClickInside = true;
        }
    });
    
    // If click is outside, close all dropdowns
    if (!isClickInside) {
        dropdowns.forEach(dropdown => {
            dropdown.style.display = "none";
        });
    }
});
