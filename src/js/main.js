/**
 * Main JavaScript
 * Combined functionality for theme switching, UI behaviors, and core functionality
 */

// Wait for DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme system
    initTheme();
    
    // Initialize UI components
    initUIComponents();
    
    // Add event listeners for interactive elements
    setupEventListeners();
    
    // Log initialization
    console.log('Web Template initialized successfully');
});

/**
 * Theme Management
 * Handles dark/light theme switching and persistence
 */
function initTheme() {
    // Theme settings
    const THEME_STORAGE_KEY = 'web-template-theme-preference';
    const DARK_THEME = 'dark';
    const LIGHT_THEME = 'light';
    
    // Get DOM elements
    const themeToggleButton = document.getElementById('theme-toggle');
    const lightIcon = document.getElementById('light-icon');
    const darkIcon = document.getElementById('dark-icon');
    const htmlElement = document.documentElement;
    
    // First check for saved preference
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    
    if (savedTheme) {
        // Use saved preference
        setTheme(savedTheme);
    } else {
        // Check for system preference
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(prefersDarkMode ? DARK_THEME : LIGHT_THEME);
    }
    
    // Update toggle button icons
    updateThemeIcons();
    
    // Set up theme toggle button
    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', function() {
            const currentTheme = getCurrentTheme();
            const newTheme = currentTheme === DARK_THEME ? LIGHT_THEME : DARK_THEME;
            
            setTheme(newTheme);
            updateThemeIcons();
            
            // Provide feedback with short animation
            themeToggleButton.classList.add('theme-toggled');
            setTimeout(() => {
                themeToggleButton.classList.remove('theme-toggled');
            }, 300);
        });
    }
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        // Only change theme automatically if user hasn't manually set a preference
        if (!localStorage.getItem(THEME_STORAGE_KEY)) {
            const newTheme = e.matches ? DARK_THEME : LIGHT_THEME;
            setTheme(newTheme);
            updateThemeIcons();
        }
    });
    
    /**
     * Get current theme
     * @returns {string} The current theme (dark or light)
     */
    function getCurrentTheme() {
        return htmlElement.getAttribute('data-theme') || DARK_THEME;
    }
    
    /**
     * Set theme
     * @param {string} theme - The theme to set (dark or light)
     */
    function setTheme(theme) {
        // Set theme attribute on html element
        htmlElement.setAttribute('data-theme', theme);
        
        // Store preference in localStorage
        localStorage.setItem(THEME_STORAGE_KEY, theme);
        
        // Add a class to body for potential transition animations
        document.body.classList.add('theme-transition');
        setTimeout(() => {
            document.body.classList.remove('theme-transition');
        }, 1000);
        
        // Update meta theme-color for browser UI
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.setAttribute('content', 
                theme === DARK_THEME ? '#0d1117' : '#ffffff');
        }
        
        // Dispatch custom event for other scripts that might need to know about theme changes
        const themeChangeEvent = new CustomEvent('themechange', { 
            detail: { theme: theme } 
        });
        document.dispatchEvent(themeChangeEvent);
    }
    
    /**
     * Update theme toggle icons based on current theme
     */
    function updateThemeIcons() {
        if (!lightIcon || !darkIcon) return;
        
        const currentTheme = getCurrentTheme();
        
        if (currentTheme === DARK_THEME) {
            lightIcon.style.display = 'block';
            darkIcon.style.display = 'none';
        } else {
            lightIcon.style.display = 'none';
            darkIcon.style.display = 'block';
        }
    }
}

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