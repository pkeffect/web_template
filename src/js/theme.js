/**
 * Theme Management
 * Handles dark/light theme switching and persistence
 */
document.addEventListener('DOMContentLoaded', function() {
    // Theme settings
    const THEME_STORAGE_KEY = 'web-template-theme-preference';
    const DARK_THEME = 'dark';
    const LIGHT_THEME = 'light';
    
    // Get DOM elements
    const themeToggleButton = document.getElementById('theme-toggle');
    const lightIcon = document.getElementById('light-icon');
    const darkIcon = document.getElementById('dark-icon');
    const htmlElement = document.documentElement;
    
    // Debug info
    console.log('Theme toggle button:', themeToggleButton);
    console.log('Light icon:', lightIcon);
    console.log('Dark icon:', darkIcon);
    console.log('Current theme:', getCurrentTheme());
    
    // Set up theme toggle button
    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', function() {
            console.log('Theme toggle clicked');
            const currentTheme = getCurrentTheme();
            console.log('Current theme:', currentTheme);
            const newTheme = currentTheme === DARK_THEME ? LIGHT_THEME : DARK_THEME;
            console.log('Switching to:', newTheme);
            
            setTheme(newTheme);
            updateThemeIcons();
        });
    }
    
    // Initialize on load
    updateThemeIcons();
    
    function getCurrentTheme() {
        return htmlElement.getAttribute('data-theme') || DARK_THEME;
    }
    
    function setTheme(theme) {
        htmlElement.setAttribute('data-theme', theme);
        localStorage.setItem(THEME_STORAGE_KEY, theme);
    }
    
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
});