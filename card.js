class ProfileCard {
    constructor() {
        this.timeElement = document.querySelector('[data-testid="test-user-time"]');
        this.updateInterval = null;
        this.init();
    }

    init() {
        this.updateTime();
        this.updateInterval = setInterval(() => this.updateTime(), 500);
        window.addEventListener('beforeunload', () => {
            if (this.updateInterval) {
                clearInterval(this.updateInterval);
            }
        });
    }

    updateTime() {
        if (!this.timeElement) return;

        const currentTime = Date.now();
        this.timeElement.textContent = currentTime;
        this.timeElement.setAttribute(
            'aria-label',
            `Current epoch time in milliseconds: ${this.formatNumber(currentTime)}`
        );
    }

    formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    destroy() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = null;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const profileCard = new ProfileCard();
    window.profileCardInstance = profileCard;
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProfileCard;
}
