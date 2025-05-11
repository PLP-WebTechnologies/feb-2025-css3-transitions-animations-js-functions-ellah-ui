document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const themeBtn = document.getElementById('theme-btn');
    const animateBtn = document.getElementById('animate-btn');
    const animatedElement = document.querySelector('.animated-element');
    const usernameInput = document.getElementById('username');
    const body = document.body;
    const container = document.querySelector('.container');

    // Animation states
    const animations = ['animated-pulse', 'animated-bounce', 'animated-rotate', 'animated-slide'];
    let currentAnimationIndex = 0;

    // Load saved preferences
    loadPreferences();

    // Theme Toggle
    themeBtn.addEventListener('click', toggleTheme);

    // Animation Trigger
    animateBtn.addEventListener('click', function() {
        // Remove all animation classes
        animations.forEach(anim => animatedElement.classList.remove(anim));
        
        // Cycle to next animation
        currentAnimationIndex = (currentAnimationIndex + 1) % animations.length;
        animatedElement.classList.add(animations[currentAnimationIndex]);
        
        // Update button text
        animateBtn.textContent = `Animation: ${animations[currentAnimationIndex].replace('animated-', '')}`;
        
        // Save animation state
        saveAnimationState();
    });

    // Username persistence with debounce
    let usernameTimeout;
    usernameInput.addEventListener('input', function() {
        clearTimeout(usernameTimeout);
        usernameTimeout = setTimeout(() => {
            localStorage.setItem('username', this.value);
            showNotification('Username saved!');
        }, 500);
    });

    // Theme toggle function
    function toggleTheme() {
        body.classList.toggle('dark-mode');
        const isDarkMode = body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkMode);
        
        // Update container theme
        container.classList.toggle('dark-mode', isDarkMode);
        
        // Update button text
        themeBtn.textContent = isDarkMode ? 'Light Mode' : 'Dark Mode';
        
        showNotification(`Switched to ${isDarkMode ? 'dark' : 'light'} mode`);
    }

    // Save animation state
    function saveAnimationState() {
        const animationClasses = Array.from(animatedElement.classList)
            .filter(className => className.startsWith('animated-'))
            .join(' ');
        localStorage.setItem('animationState', animationClasses);
        localStorage.setItem('currentAnimationIndex', currentAnimationIndex);
    }

    // Show notification
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        // Add styles for notification
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: #4ecdc4;
            color: white;
            padding: 1rem 2rem;
            border-radius: 4px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            animation: slideIn 0.3s ease-out;
        `;

        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Load saved preferences
    function loadPreferences() {
        // Load theme
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        if (isDarkMode) {
            body.classList.add('dark-mode');
            container.classList.add('dark-mode');
            themeBtn.textContent = 'Light Mode';
        }

        // Load username
        const savedUsername = localStorage.getItem('username');
        if (savedUsername) {
            usernameInput.value = savedUsername;
        }

        // Load animation state
        const savedAnimation = localStorage.getItem('animationState');
        const savedIndex = localStorage.getItem('currentAnimationIndex');
        if (savedAnimation) {
            animatedElement.className = 'animated-element ' + savedAnimation;
            currentAnimationIndex = parseInt(savedIndex) || 0;
            animateBtn.textContent = `Animation: ${animations[currentAnimationIndex].replace('animated-', '')}`;
        }
    }

    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.altKey) {
            switch(e.key) {
                case 't':
                    toggleTheme();
                    break;
                case 'a':
                    animateBtn.click();
                    break;
            }
        }
    });
});