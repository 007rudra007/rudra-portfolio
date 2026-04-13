/* ====================================
   RUDRA TRIVEDI PORTFOLIO — main.js
   ==================================== */

/* === Cursor Glow === */
const cursorGlow = document.getElementById('cursorGlow');
document.addEventListener('mousemove', (e) => {
  cursorGlow.style.left = e.clientX + 'px';
  cursorGlow.style.top  = e.clientY + 'px';
});

/* === Navbar Scroll === */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

/* === Mobile Menu === */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* === Active Nav Link on Scroll === */
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(n => n.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

/* === Reveal on Scroll === */
const revealEls = document.querySelectorAll([
  '.about-text', '.about-card', '.skill-category',
  '.project-card', '.contact-item', '.contact-form',
  '.certs-strip', '.section-header'
].join(','));

revealEls.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), 0);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

// Stagger children within grids
document.querySelectorAll('.about-card-group, .skills-grid, .projects-grid, .contact-info').forEach(grid => {
  const children = grid.querySelectorAll('.reveal');
  children.forEach((child, i) => {
    child.style.transitionDelay = `${i * 80}ms`;
  });
});

revealEls.forEach(el => revealObserver.observe(el));

/* === Typewriter Effect === */
const words = [
  'Artificial Intelligence',
  'Android Apps',
  'Cloud Infrastructure',
  'Quantitative Research',
  'Open Source',
  'Web Development'
];

let wordIdx = 0;
let charIdx = 0;
let deleting = false;
const typedEl = document.getElementById('typedText');

function typeLoop() {
  const current = words[wordIdx];
  if (!deleting) {
    typedEl.textContent = current.slice(0, charIdx + 1);
    charIdx++;
    if (charIdx === current.length) {
      deleting = true;
      setTimeout(typeLoop, 2200);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) {
      deleting = false;
      wordIdx = (wordIdx + 1) % words.length;
    }
  }
  setTimeout(typeLoop, deleting ? 50 : 80);
}

typeLoop();

/* === Contact Form === */
function handleSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('contactSubmit');
  const note = document.getElementById('formNote');
  btn.disabled = true;
  btn.textContent = 'Sending…';

  // Simulate send (no backend; open mailto as fallback)
  const name    = document.getElementById('contactName').value;
  const email   = document.getElementById('contactEmailField').value;
  const subject = document.getElementById('contactSubject').value || 'Portfolio Contact';
  const msg     = document.getElementById('contactMsg').value;

  const mailtoUrl = `mailto:rudra31trivedi@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${msg}`)}`;

  setTimeout(() => {
    window.location.href = mailtoUrl;
    btn.disabled = false;
    btn.textContent = 'Send Message →';
    note.textContent = '✓ Opening your email client…';
    setTimeout(() => { note.textContent = ''; }, 4000);
    e.target.reset();
  }, 600);
}

/* === Smooth scroll polyfill for older Safari === */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
