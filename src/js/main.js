/**
 * Main JavaScript
 * Combined functionality for UI behaviors and core functionality
 */

// Wait for DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize UI components
    initUIComponents();
    
    // Add event listeners for interactive elements
    setupEventListeners();
    
    // Log initialization
    console.log('Web Template initialized successfully');
});

/**
 * Initialize UI Components
 * Sets up interactive UI elements
 */
function initUIComponents() {
    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('mobile-nav-open');
            mobileMenuToggle.classList.toggle('is-active');
        });
    }
    
    // Alert system (example usage)
    window.showAlert = function(message, type = 'success') {
        const alert = document.getElementById('alert');
        const alertMessage = document.getElementById('alert-message');
        
        if (alert && alertMessage) {
            // Reset classes
            alert.className = '';
            alert.classList.add(type);
            
            // Set message
            alertMessage.textContent = message;
            
            // Show alert
            alert.style.display = 'flex';
            
            // Auto-hide after 5 seconds
            setTimeout(() => {
                alert.style.display = 'none';
            }, 5000);
            
            // Add close button functionality
            const closeButton = alert.querySelector('button');
            if (closeButton) {
                closeButton.addEventListener('click', function() {
                    alert.style.display = 'none';
                });
            }
        }
    };
    
    // Update current date and time in footer
    const currentYear = document.getElementById('current-year');
    const currentDateTime = document.getElementById('current-datetime');
    
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }
    
    if (currentDateTime) {
        function updateDateTime() {
            const now = new Date();
            currentDateTime.textContent = now.toLocaleDateString() + ' ' + 
                now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        }
        
        updateDateTime();
        setInterval(updateDateTime, 60000); // Update every minute
    }
}

/**
 * Set up global event listeners
 */
function setupEventListeners() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            if (href !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        const dropdowns = document.querySelectorAll('.dropdown');
        
        dropdowns.forEach(dropdown => {
            if (!dropdown.contains(e.target)) {
                const dropdownMenu = dropdown.querySelector('.dropdown-menu');
                if (dropdownMenu) {
                    dropdownMenu.style.display = 'none';
                }
            }
        });
    });
    
    // Handle form submissions (prevent default behavior for demo)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            // Only prevent default for demo forms
            if (!form.hasAttribute('data-live')) {
                e.preventDefault();
                window.showAlert('Form submitted successfully!', 'success');
            }
        });
    });
}