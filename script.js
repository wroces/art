document.addEventListener('DOMContentLoaded', () => {
  /* ---------- utilities ---------- */
  // auto year
  const yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  // smooth-scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const tgt = document.querySelector(this.getAttribute('href'));
      if (tgt) tgt.scrollIntoView({ behavior: 'smooth' });
    });
  });

  /* ---------- fade-in on scroll ---------- */
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('show');
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('section').forEach(sec => {
    sec.classList.add('hidden');
    observer.observe(sec);
  });

  /* ---------- resumé panel ---------- */
  const toggle = document.getElementById('resume-toggle');
  const panel  = document.getElementById('resume-panel');
  const close  = document.getElementById('close-panel');

  if (toggle && panel) {               // only if panel exists
    toggle.addEventListener('click', e => {
      e.preventDefault();
      panel.classList.add('active');
    });

    if (close) {                       // close button optional
      close.addEventListener('click', () => panel.classList.remove('active'));
    }

    window.addEventListener('click', e => {
      if (panel.classList.contains('active') &&
          !panel.contains(e.target) &&
          e.target !== toggle) {
        panel.classList.remove('active');
      }
    });
  }

  /* ---------- simple carousel ---------- */
  document.querySelectorAll('.carousel').forEach(carousel => {
    const track   = carousel.querySelector('.track');
    const prevBtn = carousel.querySelector('.prev');
    const nextBtn = carousel.querySelector('.next');
    if (!track || !prevBtn || !nextBtn) return;

    const scrollAmount = track.clientWidth;
    const goPrev = () => track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    const goNext = () => track.scrollBy({ left: scrollAmount, behavior: 'smooth' });

    prevBtn.addEventListener('click', goPrev);
    nextBtn.addEventListener('click', goNext);
    prevBtn.addEventListener('touchstart', goPrev);
    nextBtn.addEventListener('touchstart', goNext);
  });

  /* ---------- 3-photo film strip ---------- */
  const track   = document.getElementById('strip-track');
  const prevBtn = document.querySelector('.strip-btn.prev');
  const nextBtn = document.querySelector('.strip-btn.next');
  if (!track || !prevBtn || !nextBtn) return;

  const scrollStep = track.clientWidth / 3;
  const goPrev = () => track.scrollBy({ left: -scrollStep, behavior: 'smooth' });
  const goNext = () => track.scrollBy({ left: scrollStep, behavior: 'smooth' });

  prevBtn.addEventListener('click', goPrev);
  nextBtn.addEventListener('click', goNext);
  prevBtn.addEventListener('touchstart', goPrev);
  nextBtn.addEventListener('touchstart', goNext);

  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') goPrev();
    if (e.key === 'ArrowRight') goNext();
  });
});
