// Custom Cursor
const cursor = document.querySelector('.cursor-crosshair');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
});

// Scroll Reveal Animations
ScrollReveal().reveal('.reveal', {
    distance: '50px',
    duration: 1200,
    easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
    interval: 100,
    origin: 'bottom'
});