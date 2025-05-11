document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const themeBtn = document.getElementById('theme-btn');
    const animateBtn = document.getElementById('animate-btn');
    const animatedElement = document.querySelector('.animated-element');
    const usernameInput = document.getElementById('username');
    const body = document.body;

    // Load saved preferences
    loadPreferences();

    // Theme Toggle
    themeBtn.addEventListener('click', toggleTheme);

    // Animation Trigger
    animateBtn.addEventListener('click', function() {
        // Toggle between animations
        if (animatedElement.classList.contains('animated-pulse')) {
            animatedElement.classList.remove('animated-pulse');
            animatedElement.classList.add('animate-bounce');
        } else if (animatedElement.classList.contains('animated-bounce')) {
            animatedElement.classList.remove('animated-bounce');
        } else {
            animatedElement.classList.add('animate-pulse');
        }
        
        // Save animation state
        localStorage.setItem('animationState', animatedElement.className);
    });

    // Username persistence
    usernameInput.addEventListener('input', function() {
        localStorage.setItem('username', this.value);
    });

    // Theme toggle function
    function toggleTheme() {
        body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', body.classList.contains('dark-mode'));
    }

    // Load saved preferences
    function loadPreferences() {
        // Load theme
        if (localStorage.getItem('darkMode') === 'true') {
            body.classList.add('dark-mode');
        }

        // Load username
        const savedUsername = localStorage.getItem('username');
        if (savedUsername) {
            usernameInput.value = savedUsername;
        }

        // Load animation state
        const savedAnimation = localStorage.getItem('animationState');
        if (savedAnimation) {
            animatedElement.className = 'animated-element ' + savedAnimation;
        }
    }
});