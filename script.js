// Interaktif foto profil (parallax, glare, scale, animasi smooth)
const heroImg = document.querySelector('.interactive-img');
if (heroImg) {
    let resetTimeout;
    function setParallax(e) {
        const rect = heroImg.getBoundingClientRect();
        const x = ((e.touches ? e.touches[0].clientX : e.clientX) - rect.left) / rect.width;
        const y = ((e.touches ? e.touches[0].clientY : e.clientY) - rect.top) / rect.height;
        const rotateX = (y - 0.5) * 18;
        const rotateY = (x - 0.5) * -18;
        const glareX = (x - 0.5) * 40;
        const glareY = (y - 0.5) * 40;
        heroImg.style.transform = `scale(1.12) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        heroImg.classList.add('active');
        heroImg.style.setProperty('--glare-x', `${glareX}px`);
        heroImg.style.setProperty('--glare-y', `${glareY}px`);
        clearTimeout(resetTimeout);
    }
    function resetParallax() {
        heroImg.style.transform = '';
        heroImg.classList.remove('active');
    }
    heroImg.addEventListener('mousemove', setParallax);
    heroImg.addEventListener('mouseleave', () => { resetTimeout = setTimeout(resetParallax, 200); });
    heroImg.addEventListener('touchmove', setParallax);
    heroImg.addEventListener('touchend', () => { resetTimeout = setTimeout(resetParallax, 200); });
}
// Custom Cursor
const cursor = document.querySelector('.cursor-crosshair');
if (cursor) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });
}

// Scroll Reveal Animations
if (typeof ScrollReveal !== 'undefined') {
    ScrollReveal().reveal('.reveal', {
        distance: '50px',
        duration: 1200,
        easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
        interval: 100,
        origin: 'bottom'
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Button ripple effect
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
        const circle = document.createElement('span');
        circle.className = 'ripple';
        circle.style.left = `${e.offsetX}px`;
        circle.style.top = `${e.offsetY}px`;
        this.appendChild(circle);
        setTimeout(() => circle.remove(), 600);
    });
});