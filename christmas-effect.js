// Christmas Effect for Header - Vanilla JS
class ChristmasEffect {
    constructor(headerSelector = 'header.hero', options = {}) {
        this.header = document.querySelector(headerSelector);
        if (!this.header) return;

        this.options = {
            snowflakes: options.snowflakes || 50,
            lights: options.lights || 20,
            enabled: options.enabled !== false,
            intensity: options.intensity || 'medium', // low, medium, high
            ...options
        };

        this.snowflakes = [];
        this.lights = [];
        this.isVisible = true;

        this.init();
    }

    init() {
        if (!this.options.enabled) return;

        this.createSnowflakes();
        this.createLights();
        this.addOverlay();
        this.setupVisibilityObserver();
        this.adjustForMobile();
    }

    createSnowflakes() {
        const container = this.header;
        const count = this.getSnowflakeCount();

        for (let i = 0; i < count; i++) {
            const snowflake = document.createElement('div');
            snowflake.className = 'christmas-snowflake';
            snowflake.style.left = Math.random() * 100 + '%';
            snowflake.style.animationDelay = Math.random() * 10 + 's';
            snowflake.style.animationDuration = (Math.random() * 5 + 5) + 's';
            snowflake.style.opacity = Math.random() * 0.8 + 0.2;

            container.appendChild(snowflake);
            this.snowflakes.push(snowflake);
        }
    }

    createLights() {
        const container = this.header;
        const count = this.options.lights;

        for (let i = 0; i < count; i++) {
            const light = document.createElement('div');
            light.className = 'christmas-light';
            light.style.left = (i / count) * 100 + '%';
            light.style.animationDelay = (i * 0.5) + 's';
            light.style.backgroundColor = this.getRandomLightColor();

            container.appendChild(light);
            this.lights.push(light);
        }
    }

    addOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'christmas-overlay';
        this.header.appendChild(overlay);

        // Optional: Add Christmas message
        const message = document.createElement('div');
        message.className = 'christmas-message';
        message.innerHTML = '🎄 Feliz Navidad 🎄';
        this.header.appendChild(message);
    }

    getSnowflakeCount() {
        const baseCount = this.options.snowflakes;
        const intensity = this.options.intensity;

        if (intensity === 'low') return Math.floor(baseCount * 0.5);
        if (intensity === 'high') return Math.floor(baseCount * 1.5);
        return baseCount;
    }

    getRandomLightColor() {
        const colors = ['#ff0000', '#00ff00', '#ffff00', '#ff4500', '#00ffff'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    setupVisibilityObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                this.isVisible = entry.isIntersecting;
                if (this.isVisible) {
                    this.resumeAnimations();
                } else {
                    this.pauseAnimations();
                }
            });
        }, { threshold: 0.1 });

        observer.observe(this.header);
    }

    pauseAnimations() {
        this.snowflakes.forEach(flake => {
            flake.style.animationPlayState = 'paused';
        });
        this.lights.forEach(light => {
            light.style.animationPlayState = 'paused';
        });
    }

    resumeAnimations() {
        this.snowflakes.forEach(flake => {
            flake.style.animationPlayState = 'running';
        });
        this.lights.forEach(light => {
            light.style.animationPlayState = 'running';
        });
    }

    adjustForMobile() {
        const isMobile = window.innerWidth < 768;
        if (isMobile) {
            this.options.snowflakes = Math.floor(this.options.snowflakes * 0.5);
            this.options.lights = Math.floor(this.options.lights * 0.7);
            this.updateElements();
        }
    }

    updateElements() {
        // Remove existing elements
        this.snowflakes.forEach(flake => flake.remove());
        this.lights.forEach(light => light.remove());
        this.snowflakes = [];
        this.lights = [];

        // Recreate with new counts
        this.createSnowflakes();
        this.createLights();
    }

    toggle(enabled) {
        this.options.enabled = enabled;
        if (enabled) {
            this.init();
        } else {
            this.destroy();
        }
    }

    setIntensity(intensity) {
        this.options.intensity = intensity;
        this.updateElements();
    }

    destroy() {
        this.snowflakes.forEach(flake => flake.remove());
        this.lights.forEach(light => light.remove());
        document.querySelector('.christmas-overlay')?.remove();
        this.snowflakes = [];
        this.lights = [];
    }
}

// Auto-initialize if in December or if manually enabled
document.addEventListener('DOMContentLoaded', function() {
    const currentMonth = new Date().getMonth(); // 0-11, December is 11
    const isDecember = currentMonth === 11;

    // Check for manual override in localStorage or URL param
    const urlParams = new URLSearchParams(window.location.search);
    const forceChristmas = urlParams.get('christmas') === 'true' || localStorage.getItem('christmas-mode') === 'true';

    if (isDecember || forceChristmas) {
        window.christmasEffect = new ChristmasEffect();
    }

    // Optional: Add toggle button
    const toggleBtn = document.createElement('button');
    toggleBtn.id = 'christmas-toggle';
    toggleBtn.innerHTML = '🎄';
    toggleBtn.className = 'christmas-toggle-btn';
    toggleBtn.title = 'Toggle Christmas Mode';
    toggleBtn.addEventListener('click', function() {
        if (window.christmasEffect) {
            window.christmasEffect.toggle(false);
            window.christmasEffect = null;
            localStorage.removeItem('christmas-mode');
            toggleBtn.innerHTML = '❄️';
        } else {
            window.christmasEffect = new ChristmasEffect();
            localStorage.setItem('christmas-mode', 'true');
            toggleBtn.innerHTML = '🎄';
        }
    });
    document.body.appendChild(toggleBtn);
});