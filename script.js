function toggleDropdown(event) {
    event.preventDefault();
    const dropdown = event.target.closest('.dropdown').querySelector('.dropdown-content');
    
    // Toggle visibility
    if (dropdown.style.display === "flex") {
        // Add closing animation class
        dropdown.classList.add('closing');
        // Wait for animation to complete before hiding
        setTimeout(() => {
            dropdown.style.display = "none";
            dropdown.classList.remove('closing');
            document.documentElement.style.overflow = 'auto';
        }, 300);
    } else {
        dropdown.style.display = "flex";
        document.documentElement.style.overflow = 'hidden';
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
        const dropdown = this.closest('.dropdown-content');
        
        // Close the dropdown with animation
        dropdown.classList.add('closing');
        setTimeout(() => {
            dropdown.style.display = 'none';
            dropdown.classList.remove('closing');
            // Restore scrolling
            document.documentElement.style.overflow = 'auto';
        }, 300);

        // Scroll to target after a short delay
        setTimeout(() => {
            smoothScroll(target);
        }, 350);
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

let lastScrollTop = 0;
const menuBar = document.getElementById('MenuBar');
const scrollThreshold = 50; // Minimum scroll amount before hiding/showing menu

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    // Determine scroll direction
    if (currentScroll > lastScrollTop && currentScroll > scrollThreshold) {
        // Scrolling down
        menuBar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        menuBar.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
}, { passive: true });

// Scroll Animation
document.addEventListener('DOMContentLoaded', function() {
    // Define elements to animate
    const elements = {
        mainDesign: {
            selector: '#main-design'
        },
        quienesSomosH4: {
            selector: '#QuienesSomos h4'
        },
        misionVision: {
            selector: '#mision-vision'
        },
        quienesSomosUl: {
            selector: '#QuienesSomos ul'
        },
        textWrapper2: {
            selector: '#text-wrapper-2'
        },
        textWrapperPS: {
            selector: '.text-wrapper-PS'
        },
        title: {
            selector: '#title'
        },
        servicesGrid: {
            selector: '.services-grid'
        },
        imageWrapper: {
            selector: '.image-wrapper'
        },
        reserveTitle: {
            selector: '#Reserve-title'
        },
        bottonSacarCita: {
            selector: '#bottonSacarCita'
        },
        footer: {
            selector: 'footer'
        }
    };

    // Add fade-in-up class to each element
    Object.values(elements).forEach(element => {
        const elements = document.querySelectorAll(element.selector);
        elements.forEach(el => {
            el.classList.add('fade-in-up');
        });
    });

    // Create Intersection Observer for each element
    Object.values(elements).forEach(element => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // Unobserve after animation is triggered
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2, // Trigger when 20% of the element is visible
            rootMargin: '0px 0px -100px 0px' // Start animation slightly before element comes into view
        });

        // Observe elements
        document.querySelectorAll(element.selector).forEach(el => {
            observer.observe(el);
        });
    });
});
