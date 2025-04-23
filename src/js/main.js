/**
 * Theme Switcher
 * Handles dark/light theme switching and persistence
 */

// Theme settings
const THEME_STORAGE_KEY = 'web-template-theme-preference';
const DARK_THEME = 'dark';
const LIGHT_THEME = 'light';

// DOM elements that will be accessed
let themeToggleButton;
let lightIcon;
let darkIcon;
let htmlElement;

// Initialize theme on document load
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    themeToggleButton = document.getElementById('theme-toggle');
    lightIcon = document.getElementById('light-icon');
    darkIcon = document.getElementById('dark-icon');
    htmlElement = document.documentElement;
    
    // Initialize theme based on saved preference or system preference
    initializeTheme();
    
    // Set up theme toggle button
    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', toggleTheme);
    }
});

/**
 * Initialize theme based on saved preference or system preference
 */
function initializeTheme() {
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
}

/**
 * Toggle between dark and light themes
 */
function toggleTheme() {
    const currentTheme = getCurrentTheme();
    const newTheme = currentTheme === DARK_THEME ? LIGHT_THEME : DARK_THEME;
    
    setTheme(newTheme);
    updateThemeIcons();
    
    // Provide feedback with short animation
    themeToggleButton.classList.add('theme-toggled');
    setTimeout(() => {
        themeToggleButton.classList.remove('theme-toggled');
    }, 300);
}

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
    
    // Update theme stylesheet link (optional approach)
    const themeStyleLink = document.getElementById('theme-style');
    if (themeStyleLink) {
        themeStyleLink.href = `/css/${theme}-theme.css`;
    }
    
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

/**
 * Listen for system theme changes
 */
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    // Only change theme automatically if user hasn't manually set a preference
    if (!localStorage.getItem(THEME_STORAGE_KEY)) {
        const newTheme = e.matches ? DARK_THEME : LIGHT_THEME;
        setTheme(newTheme);
        updateThemeIcons();
    }
});