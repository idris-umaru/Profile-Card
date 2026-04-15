/**
 * Profile Card Component - JavaScript Module
 * Handles dynamic time updates and accessibility features
 */

class ProfileCard {
    constructor() {
        this.timeElement = document.querySelector('[data-testid="test-user-time"]');
        this.updateInterval = null;
        this.init();
    }

    /**
     * Initialize the profile card
     */
    init() {
        // Update time immediately on load
        this.updateTime();

        // Update time every 500ms for real-time display
        this.updateInterval = setInterval(() => this.updateTime(), 500);

        // Cleanup interval on page unload
        window.addEventListener('beforeunload', () => {
            if (this.updateInterval) {
                clearInterval(this.updateInterval);
            }
        });

        // Announce time updates to screen readers (already set with aria-live in HTML)
        // This ensures compatibility with assistive technologies
    }

    /**
     * Update the current time display in milliseconds
     */
    updateTime() {
        if (!this.timeElement) return;

        const currentTime = Date.now();
        this.timeElement.textContent = currentTime;

        // Update aria-label for potential announcements
        this.timeElement.setAttribute(
            'aria-label',
            `Current epoch time in milliseconds: ${this.formatNumber(currentTime)}`
        );
    }

    /**
     * Format a number with thousands separator for readability
     * @param {number} num - The number to format
     * @returns {string} Formatted number
     */
    formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    /**
     * Destroy the profile card instance (cleanup)
     */
    destroy() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = null;
        }
    }
}

/**
 * Initialize the profile card when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
    const profileCard = new ProfileCard();

    // Make available globally for testing purposes
    window.profileCardInstance = profileCard;
});

/**
 * Keyboard navigation enhancement
 * Ensures all interactive elements are keyboard accessible
 */
document.addEventListener('keydown', (event) => {
    // Tab key for navigation is handled natively
    // Enhanced focus visibility for keyboard users
    if (event.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

/**
 * Mouse click removes keyboard navigation indicator
 */
document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});


 
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProfileCard;
}
