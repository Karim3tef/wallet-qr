// ============ Ripple Effect on Contact Items ============
document.querySelectorAll('.contact-item').forEach(item => {
    item.addEventListener('click', function(e) {
        // Create ripple
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.15);
            width: ${size}px;
            height: ${size}px;
            top: ${e.clientY - rect.top - size/2}px;
            left: ${e.clientX - rect.left - size/2}px;
            transform: scale(0);
            animation: ripple-anim 0.6s ease-out;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple-anim {
        to { transform: scale(2.5); opacity: 0; }
    }
`;
document.head.appendChild(style);

// ============ Intersection Observer for Scroll Animations ============
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.card, .reward-card, .footer').forEach(el => {
    observer.observe(el);
});

// ============ Dynamic Time Greeting ============
function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return 'صباح الخير ☀️';
    if (hour < 17) return 'مساء النور 🌤️';
    if (hour < 21) return 'مساء الخير 🌅';
    return 'مساء النور 🌙';
}

// Update subtitle with greeting
const subtitle = document.querySelector('.subtitle');
if (subtitle) {
    const greeting = getGreeting();
    subtitle.textContent = `${greeting} — لو لقيت المحفظة دي، ياريت تتواصل معايا`;
}

// ============ Console Easter Egg ============
console.log('%c🙏 جزاك الله خيراً إنك بتحاول تساعد!', 
    'font-size: 20px; color: #ffc857; font-family: Cairo;');