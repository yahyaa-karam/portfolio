// ===== REVEAL ON SCROLL =====
const faders = document.querySelectorAll('.fade');

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

faders.forEach(el => observer.observe(el));

// ===== SMOOTH SCROLL FOR NAV =====
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const targetId = link.getAttribute('href');
    if (!targetId || targetId === '#') return;

    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== SECTION NAV ACTIVE STATE =====
const sectionNavLinks = document.querySelectorAll('.section-nav a');
const sections = [...document.querySelectorAll('section[id]')];

window.addEventListener('scroll', () => {
  const scrollPos = window.scrollY + 120;

  let currentId = null;
  for (const section of sections) {
    if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
      currentId = section.id;
      break;
    }
  }

  sectionNavLinks.forEach(link => {
    const href = link.getAttribute('href').replace('#', '');
    link.classList.toggle('active', href === currentId);
  });
});

// ===== DARK / LIGHT MODE TOGGLE =====
const body = document.body;
const themeToggleBtn = document.getElementById('theme-toggle');
const THEME_KEY = 'yk-portfolio-theme';

function applyTheme(theme) {
  if (theme === 'light') {
    body.classList.add('light-theme');
  } else {
    body.classList.remove('light-theme');
  }

  const icon = themeToggleBtn.querySelector('i');
  if (body.classList.contains('light-theme')) {
    icon.classList.remove('fa-moon', 'fa-regular');
    icon.classList.add('fa-sun', 'fa-solid');
  } else {
    icon.classList.remove('fa-sun', 'fa-solid');
    icon.classList.add('fa-moon', 'fa-regular');
  }
}

// Load saved theme
const savedTheme = localStorage.getItem(THEME_KEY) || 'dark';
applyTheme(savedTheme);

// Toggle theme on click
themeToggleBtn.addEventListener('click', () => {
  const newTheme = body.classList.contains('light-theme') ? 'dark' : 'light';
  applyTheme(newTheme);
  localStorage.setItem(THEME_KEY, newTheme);
});

// ===== BACK TO TOP BUTTON =====
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopBtn.style.display = 'flex';
  } else {
    backToTopBtn.style.display = 'none';
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
