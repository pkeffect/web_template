/**
 * Loading Screen Manager
 * A streamlined, performance-optimized loading screen system
 */

// DOM elements
let loadingScreen;
let progressBar;
let resourcesLoaded = 0;
let totalResources = 0;

// Resources to track
const RESOURCE_TYPES = [
    'img', 'script', 'link[rel="stylesheet"]', 'audio', 'video', 'iframe'
];

// Initialize loading screen
document.addEventListener('DOMContentLoaded', function() {
    // Set body as loading
    document.body.classList.add('loading');
    
    // Get references to elements
    loadingScreen = document.querySelector('.loading-screen');
    progressBar = document.querySelector('.loading-progress-bar');
    
    // Count resources that need to be loaded
    countResources();
    
    // Set up event listeners for resource loading
    trackResourceLoading();
    
    // If there are no resources to track or very few, set a minimum loading time
    if (totalResources < 5) {
        setTimeout(hideLoadingScreen, 800);
    }
    
    // Fallback in case some resources fail to load
    setTimeout(hideLoadingScreen, 5000);
});

/**
 * Count total resources that need to be loaded
 */
function countResources() {
    RESOURCE_TYPES.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        totalResources += elements.length;
    });
    
    // Log resource count for debugging
    console.log(`Loading ${totalResources} resources`);
}

/**
 * Track loading of resources
 */
function trackResourceLoading() {
    // Track images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (img.complete) {
            resourceLoaded();
        } else {
            img.addEventListener('load', resourceLoaded);
            img.addEventListener('error', resourceLoaded); // Count errors to avoid hanging
        }
    });
    
    // Track scripts
    const scripts = document.querySelectorAll('script');
    scripts.forEach(script => {
        if (script.getAttribute('src')) {
            script.addEventListener('load', resourceLoaded);
            script.addEventListener('error', resourceLoaded);
        } else {
            resourceLoaded(); // Inline scripts are already loaded
        }
    });
    
    // Track stylesheets
    const links = document.querySelectorAll('link[rel="stylesheet"]');
    links.forEach(link => {
        if (link.sheet) {
            resourceLoaded();
        } else {
            link.addEventListener('load', resourceLoaded);
            link.addEventListener('error', resourceLoaded);
        }
    });
    
    // Track other embedded content
    const other = document.querySelectorAll('audio, video, iframe');
    other.forEach(el => {
        el.addEventListener('load', resourceLoaded);
        el.addEventListener('loadeddata', resourceLoaded);
        el.addEventListener('error', resourceLoaded);
    });
    
    // Listen for window load event as a backup
    window.addEventListener('load', function() {
        // Force complete loading after window load
        setTimeout(hideLoadingScreen, 300);
    });
}

/**
 * Handle when a resource is loaded
 */
function resourceLoaded() {
    resourcesLoaded++;
    
    // Update progress bar
    if (progressBar && totalResources > 0) {
        const progress = (resourcesLoaded / totalResources) * 100;
        progressBar.style.width = `${Math.min(progress, 100)}%`;
    }
    
    // Check if all resources are loaded
    if (resourcesLoaded >= totalResources) {
        hideLoadingScreen();
    }
}

/**
 * Hide the loading screen
 */
function hideLoadingScreen() {
    if (!loadingScreen) return;
    
    // Remove class from body
    document.body.classList.remove('loading');
    
    // Add fade out class to loading screen
    loadingScreen.classList.add('fade-out');
    
    // Remove loading screen after animation completes
    setTimeout(() => {
        if (loadingScreen.parentNode) {
            loadingScreen.parentNode.removeChild(loadingScreen);
        }
    }, 300);
}