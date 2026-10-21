// Spanish text lives in index.html; this map holds the English versions.
const EN = {
  skip: 'Skip to content',
  'nav.about': 'About',
  'nav.skills': 'Skills',
  'nav.experience': 'Experience',
  'nav.contact': 'Contact',
  'hero.status': 'Open to new projects',
  'nav.education': 'Education',
  'nav.projects': 'Projects',
  'about.f0k': 'Location',
  'exp.d1': 'Jun 2020 — Sep 2026',
  'exp.l1': '6 yrs 4 mos',
  'exp.serviucis.role': 'IT Systems Technician',
  'exp.serviucis.desc': 'Support and administration of the technology infrastructure, plus development of internal Laravel web applications to digitize administrative and operational processes: role-based access control, reporting and real-time notifications.',
  'exp.tag.support': 'IT support',
  'exp.d2': 'May 2023 — Jan 2025',
  'exp.l2': '1 yr 9 mos',
  'exp.censa.role': 'Instructor',
  'exp.censa.desc': 'Taught web programming with PHP, object-oriented programming, relational databases and C#, with a hands-on, project-based approach.',
  'exp.tag.oop': 'OOP',
  'exp.d3': 'Dec 2017 — Jul 2020',
  'exp.l3': '2 yrs 8 mos',
  'exp.unisys.role': 'Technical Service Analyst REP 3',
  'exp.unisys.desc': 'Technical support and incident handling in a multinational corporate environment, diagnosing and resolving hardware and software issues.',
  'exp.d4': 'Feb 2015 — Feb 2016',
  'exp.l4': '1 yr 1 mo',
  'exp.cetasdi.role': 'Programming Instructor · IT Technician',
  'exp.cetasdi.desc': 'Taught programming fundamentals and provided technical support for the institution’s equipment.',
  'proj.title': 'Projects',
  'proj.nt.badge': 'Interactive demo',
  'proj.nt.desc': 'Real-time hospital diet management between dietitians and kitchen.',
  'proj.nt.cta': 'View demo',
  'edu.title': 'Education',
  'edu.studies': 'Studies',
  'edu.ongoing': 'In progress',
  'edu.iud.title': 'Software and Data Engineering',
  'edu.iud.date': '2026 — 2030',
  'edu.cetasdi.title': 'Systems Technician — Computer Programming',
  'edu.sena1.title': 'Computer Hardware Maintenance',
  'edu.sena2.title': 'Computer Systems Programming Methodology',
  'edu.certs': 'Certifications',
  'edu.react.title': 'React course',
  'edu.react.desc': 'Building modern, component-based interfaces',
  'edu.claude.title': 'Claude courses',
  'edu.cert.php': 'Complete backend web development',
  'hero.role': 'Web developer · PHP &amp; Laravel',
  'hero.lead': 'More than a developer — a <em>backend craftsman</em>. I build Laravel web applications that solve real-world processes, and I teach others how to do it.',
  'hero.cta1': "Let's talk",
  'about.title': 'About me',
  'about.p1': 'PHP &amp; Laravel web developer with 4+ years of experience and a background as a <strong>programming instructor</strong>. I build management systems that are clear, secure and easy to maintain. Currently studying <strong>Software and Data Engineering</strong> and training in <strong>React</strong> and <strong>Claude</strong> (AI).',
  'about.f1k': 'Focus',
  'about.f1v': 'Backend · Full-stack',
  'about.f3k': 'Teaching',
  'skills.title': 'Skills',
  'exp.title': 'Experience',
  'exp.now': 'Present',
  'exp.dev.role': 'Full-stack Web Developer',
  'exp.dev.desc': 'Design and development of Laravel management applications: admin modules, operational workflows, role-based access control, report generation and real-time notifications.',
  'exp.teach.role': 'Programming Instructor',
  'exp.teach.desc': 'Teaching web programming with PHP, object-oriented programming, relational databases and C#, with a hands-on, project-based approach.',
  'contact.title': 'Contact',
  'contact.lead': 'Got a project, a job opening or an idea? Reach out and let’s talk.',
  footer: 'Handcrafted, like good backend.'
};

const root = document.documentElement;
const nodes = [...document.querySelectorAll('[data-i18n]')];
const ES = Object.fromEntries(nodes.map(n => [n.dataset.i18n, n.innerHTML]));

function setLang(lang) {
  const dict = lang === 'en' ? EN : ES;
  nodes.forEach(n => { const v = dict[n.dataset.i18n]; if (v != null) n.innerHTML = v; });
  root.lang = lang;
  document.title = lang === 'en'
    ? 'Camilo Rojas · Full-stack Developer'
    : 'Camilo Rojas · Desarrollador Full-stack';
  document.getElementById('themeToggle').setAttribute('aria-label', lang === 'en' ? 'Toggle theme' : 'Cambiar tema');
  document.getElementById('menuToggle').setAttribute('aria-label', lang === 'en' ? 'Toggle menu' : 'Abrir menú');
  try { localStorage.setItem('lang', lang); } catch (e) {}
}

let saved = null;
try { saved = localStorage.getItem('lang'); } catch (e) {}
setLang(saved || ((navigator.language || 'es').toLowerCase().startsWith('es') ? 'es' : 'en'));

document.getElementById('langToggle').addEventListener('click', () => {
  setLang(root.lang === 'es' ? 'en' : 'es');
  moveIndicator();
});

document.getElementById('themeToggle').addEventListener('click', () => {
  const current = root.dataset.theme ||
    (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  const next = current === 'dark' ? 'light' : 'dark';
  root.dataset.theme = next;
  try { localStorage.setItem('theme', next); } catch (e) {}
});

// Mobile menu
const nav = document.querySelector('.nav');
const menuToggle = document.getElementById('menuToggle');
const navLinks = [...document.querySelectorAll('#navLinks a')];

function setMenu(open) {
  nav.classList.toggle('is-open', open);
  menuToggle.setAttribute('aria-expanded', open);
}
menuToggle.addEventListener('click', () => setMenu(!nav.classList.contains('is-open')));
navLinks.forEach(a => a.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
document.addEventListener('click', e => { if (!nav.contains(e.target)) setMenu(false); });

navLinks.forEach((a, i) => a.style.setProperty('--i', i)); // stagger on open

// Sliding underline under the active link (desktop)
const indicator = document.querySelector('.nav__indicator');
function moveIndicator() {
  const active = navLinks.find(a => a.classList.contains('is-active'));
  indicator.classList.toggle('is-on', !!active);
  if (!active) return;
  indicator.style.width = active.offsetWidth + 'px';
  indicator.style.transform = `translateX(${active.offsetLeft}px)`;
}
addEventListener('resize', moveIndicator);
document.fonts && document.fonts.ready.then(moveIndicator);

// Highlight the link of the section in view
if ('IntersectionObserver' in window) {
  const spy = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      navLinks.forEach(a => {
        const on = a.getAttribute('href') === '#' + e.target.id;
        a.classList.toggle('is-active', on);
        if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
      });
      moveIndicator();
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  navLinks.forEach(a => {
    const section = document.querySelector(a.getAttribute('href'));
    if (section) spy.observe(section);
  });
  spy.observe(document.getElementById('top')); // clears the highlight back at the hero
}

// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach((el, i) => {
    el.style.setProperty('--d', (i % 4) * 70 + 'ms');
    io.observe(el);
  });
} else {
  reveals.forEach(el => el.classList.add('is-visible'));
}

document.getElementById('year').textContent = new Date().getFullYear();
