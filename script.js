// Smooth scroll for all anchor links
document.querySelectorAll('a[href="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
  });
});

// Navbar scroll effect
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.style.borderBottom = '1px solid #2a2a2a';
  } else {
    nav.style.borderBottom = '1px solid #1f1f1f';
  }
});

// Video cards hover tilt effect
const cards = document.querySelectorAll('.video-card');
cards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    card.style.transform = `perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
  });
  card.addEventListener('mouseleave', (card => {
    return function() {
      const index = Array.from(cards).indexOf(card);
      if (index === 0) card.style.transform = 'rotate(-6deg) translate(-80px, -20px)';
      if (index === 1) card.style.transform = 'rotate(3deg) translate(60px, 20px)';
      if (index === 2) card.style.transform = 'rotate(-2deg) translate(-10px, 80px)';
    }
  })(card));
});

// Intersection Observer for scroll animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.step, .stat').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

console.log('😂 Cheka — Built in Kenya 🇰🇪');
