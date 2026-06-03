// BIG.dk Main JavaScript

// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorRing = document.querySelector('.cursor-ring');

let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  if (cursor) {
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  }
});

function animateRing() {
  if (cursorRing) {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top = ringY + 'px';
  }
  requestAnimationFrame(animateRing);
}
animateRing();

// Add hover effect to interactive elements
document.querySelectorAll('a, button, [style*="cursor"]').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor?.classList.add('hovered');
    cursorRing?.classList.add('hovered');
  });
  el.addEventListener('mouseleave', () => {
    cursor?.classList.remove('hovered');
    cursorRing?.classList.remove('hovered');
  });
});

// Nav scroll behavior
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  if (nav) {
    nav.classList.toggle('scrolled', window.scrollY > 10);
  }
});

// Intersection Observer for reveal animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Back to top
const backBtn = document.querySelector('.back-to-top');
if (backBtn) {
  backBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Page transition
function navigateTo(url) {
  const overlay = document.createElement('div');
  overlay.className = 'page-transition';
  document.body.appendChild(overlay);
  
  setTimeout(() => {
    overlay.classList.add('enter');
  }, 10);
  
  setTimeout(() => {
    window.location.href = url;
  }, 500);
}

// Intercept nav link clicks for smooth transitions
document.querySelectorAll('nav a, .nav-links a').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href && !href.startsWith('#') && !href.startsWith('http') && !href.startsWith('mailto')) {
      e.preventDefault();
      navigateTo(href);
    }
  });
});

// Expandable sections
document.querySelectorAll('[data-expand]').forEach(trigger => {
  trigger.addEventListener('click', () => {
    const target = document.getElementById(trigger.dataset.expand);
    if (target) {
      target.classList.toggle('open');
      trigger.classList.toggle('open');
    }
  });
});

// Person card expand
document.querySelectorAll('.person-card').forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('expanded');
  });
});

// Jobs filter
const locationSelect = document.getElementById('job-location');
const deptSelect = document.getElementById('job-dept');
const jobItems = document.querySelectorAll('.job-item');

function filterJobs() {
  const loc = locationSelect?.value || 'all';
  const dept = deptSelect?.value || 'all';
  
  jobItems.forEach(item => {
    const itemLoc = item.dataset.location || '';
    const itemDept = item.dataset.dept || '';
    const locMatch = loc === 'all' || itemLoc.toLowerCase().includes(loc.toLowerCase());
    const deptMatch = dept === 'all' || itemDept.toLowerCase().includes(dept.toLowerCase());
    item.style.display = (locMatch && deptMatch) ? 'grid' : 'none';
  });
}

locationSelect?.addEventListener('change', filterJobs);
deptSelect?.addEventListener('change', filterJobs);

// Active nav link
const currentPath = window.location.pathname;
document.querySelectorAll('.nav-links a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPath || (currentPath === '/' && href === 'index.html')) {
    link.classList.add('active');
  }
  if (href && href !== 'index.html' && href !== '/' && currentPath.includes(href.replace('.html',''))) {
    link.classList.add('active');
  }
});
