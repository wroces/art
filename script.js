// auto year
document.getElementById('yr').textContent = new Date().getFullYear();

// smooth-scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
  });
});

// fade-in sections on scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('show');
  });
}, { threshold: 0.15 });

document.querySelectorAll('section').forEach(sec => {
  sec.classList.add('hidden');   // start hidden
  observer.observe(sec);
});
// toggle panel
const toggle = document.getElementById('resume-toggle');
const panel  = document.getElementById('resume-panel');
const close  = document.getElementById('close-panel');

toggle.addEventListener('click', e => {
  e.preventDefault();
  panel.classList.add('active');
});
close.addEventListener('click', () => panel.classList.remove('active'));
