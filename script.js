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

    const goPrev = () => track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    const goNext = () => track.scrollBy({ left:  scrollAmount, behavior: 'smooth' });

    prevBtn.addEventListener('click', goPrev);
    nextBtn.addEventListener('click', goNext);
    prevBtn.addEventListener('touchstart', goPrev);
    nextBtn.addEventListener('touchstart', goNext);
  });
});   /* ← closes DOMContentLoaded */
/* ---- carousel buttons ---- */
document.querySelectorAll('.carousel').forEach(carousel => {
  const track   = carousel.querySelector('.track');
  const prevBtn = carousel.querySelector('.prev');
  const nextBtn = carousel.querySelector('.next');
  const scrollAmount = track.clientWidth;

  const goPrev = () => track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  const goNext = () => track.scrollBy({ left:  scrollAmount, behavior: 'smooth' });

  prevBtn.addEventListener('click', goPrev);
  nextBtn.addEventListener('click', goNext);
  prevBtn.addEventListener('touchstart', goPrev);
  nextBtn.addEventListener('touchstart', goNext);
});
/* =====  3-PHOTO FILM STRIP  ===== */
#gallery{padding:4rem 2rem;max-width:1200px;margin:auto;}
.film-strip{position:relative;display:flex;align-items:center;gap:1rem;}
.strip-track{
  display:flex;
  overflow-x:auto;
  scroll-behavior:smooth;
  scroll-snap-type:x mandatory;
  gap:1rem;
  width:100%;
}
.strip-track .img-shield{
  flex:0 0 calc(33.333% - 0.67rem);   /* exactly 3 across */
  scroll-snap-align:start;
  height:auto;
  max-height:60vh;
}
.strip-btn{
  position:absolute;
  top:50%;
  transform:translateY(-50%);
  background:rgba(0,0,0,.45);
  color:#fff;
  border:none;
  font-size:2rem;
  line-height:1;
  padding:0 .6rem;
  cursor:pointer;
  z-index:10;
  border-radius:4px;
  opacity:.8;
  transition:opacity .2s;
}
.strip-btn:hover{opacity:1;}
.prev{left:1rem;}
.next{right:1rem;}
@media(max-width:768px){
  .strip-track .img-shield{flex:0 0 calc(50% - .5rem);}   /* 2 across on tablets */
  .strip-btn{font-size:1.5rem;padding:0 .4rem;}
}
@media(max-width:480px){
  .strip-track .img-shield{flex:0 0 100%;}               /* 1 across on phones */
}
@media(prefers-reduced-motion:reduce){.strip-track{scroll-behavior:auto;}}
