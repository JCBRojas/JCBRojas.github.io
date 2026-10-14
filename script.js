// Spanish text lives in index.html; this map holds the English versions.
const EN = {
  skip: 'Skip to content',
  'nav.about': 'About',
  'nav.skills': 'Skills',
  'nav.experience': 'Experience',
  'nav.contact': 'Contact',
  'hero.status': 'Open to new projects',
  'nav.education': 'Education',
  'about.p3': 'I am currently studying <strong>Software and Data Engineering</strong> at IU Digital de Antioquia.',
  'about.f0k': 'Location',
  'about.f5k': 'Background',
  'about.f5v': '10+ years in IT',
  'skills.analysis': 'Data analysis',
  'skills.support': 'Hardware support &amp; maintenance',
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
  'edu.title': 'Education',
  'edu.studies': 'Studies',
  'edu.ongoing': 'In progress',
  'edu.iud.title': 'Software and Data Engineering',
  'edu.iud.date': '2026 — 2030',
  'edu.cetasdi.title': 'Systems Technician — Computer Programming',
  'edu.sena1.title': 'Computer Hardware Maintenance',
  'edu.sena2.title': 'Computer Systems Programming Methodology',
  'edu.certs': 'Certifications',
  'edu.cert.php': 'Complete backend web development',
  'hero.role': 'Web developer · PHP &amp; Laravel',
  'hero.lead': 'More than a developer — a <em>backend craftsman</em>. I build Laravel web applications that solve real-world processes, and I teach others how to do it.',
  'hero.cta1': "Let's talk",
  'about.title': 'About me',
  'about.p1': 'I am a full-stack web developer with a backend focus. I work mainly with <strong>PHP and Laravel</strong>, building management systems with authentication, role-based access control, PDF and Excel reporting, and real-time features.',
  'about.p2': 'I am also a <strong>programming instructor</strong>, teaching PHP, databases and C#. Teaching pushes me to write code that is clear, explainable and easy to maintain — and it shows in every project.',
  'about.f1k': 'Focus',
  'about.f1v': 'Backend · Full-stack',
  'about.f2k': 'Framework',
  'about.f3k': 'Teaching',
  'about.f4k': 'Languages',
  'about.f4v': 'Spanish',
  'skills.title': 'Skills',
  'skills.backend': 'Backend',
  'skills.rbac': 'Roles &amp; permissions (Spatie)',
  'skills.frontend': 'Frontend',
  'skills.data': 'Databases',
  'skills.modeling': 'Data modeling',
  'skills.tools': 'Tools &amp; integrations',
  'skills.realtime': 'Real-time (Pusher / Echo)',
  'skills.reports': 'PDF &amp; Excel reports',
  'skills.backups': 'Automated backups',
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
  try { localStorage.setItem('lang', lang); } catch (e) {}
}

let saved = null;
try { saved = localStorage.getItem('lang'); } catch (e) {}
setLang(saved || ((navigator.language || 'es').toLowerCase().startsWith('es') ? 'es' : 'en'));

document.getElementById('langToggle').addEventListener('click', () => {
  setLang(root.lang === 'es' ? 'en' : 'es');
});

document.getElementById('themeToggle').addEventListener('click', () => {
  const current = root.dataset.theme ||
    (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  const next = current === 'dark' ? 'light' : 'dark';
  root.dataset.theme = next;
  try { localStorage.setItem('theme', next); } catch (e) {}
});

document.getElementById('year').textContent = new Date().getFullYear();
