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
  sec.classList.add('hidden');
  observer.observe(sec);
});

// ===== resumé panel (wait for DOM) =====
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('resume-toggle');
  const panel  = document.getElementById('resume-panel');
  const close  = document.getElementById('close-panel');

  // open panel
toggle.addEventListener('click', e => {
  e.preventDefault();
  panel.classList.add('active');
});
// close button
close.addEventListener('click', () => panel.classList.remove('active'));
// close when clicking OUTSIDE (backdrop)
window.addEventListener('click', e => {
  if (panel.classList.contains('active') &&
      !panel.contains(e.target) &&
      e.target !== toggle) {
    panel.classList.remove('active');
  }
});

                          /* =====  simple carousel  ===== */
document.querySelectorAll('.carousel').forEach(carousel => {
  const track   = carousel.querySelector('.track');
  const prevBtn = carousel.querySelector('.prev');
  const nextBtn = carousel.querySelector('.next');
  const scrollAmount = track.clientWidth;   // one full slide

  prevBtn.addEventListener('click', () => track.scrollBy({ left: -scrollAmount, behavior: 'smooth' }));
  nextBtn.addEventListener('click', () => track.scrollBy({ left:  scrollAmount, behavior: 'smooth' }));
});
