const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.topbar nav');

menuButton.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('#site-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const hero = document.querySelector('.hero');
const heroArt = document.querySelector('.hero-art');
const heroCopy = document.querySelector('.hero-copy');
const heroBottom = document.querySelector('.hero-bottom');

function updateHeroScroll() {
  if (!hero || !heroArt) return;
  const progress = Math.min(Math.max(window.scrollY / (hero.offsetHeight - window.innerHeight), 0), 1);
  const scale = 1.28 - (progress * 0.28);
  const shift = progress * -35;
  const copyOpacity = Math.max(0, 1 - (progress * 1.25));
  const copyY = progress * -110;
  const bottomOpacity = Math.max(0, 1 - (progress * 2.5));
  const scrollCopyOpacity = Math.min(1, Math.max(0, (progress - 0.28) * 2.2));
  const scrollCopyY = 40 - (scrollCopyOpacity * 40);
  hero.style.setProperty('--hero-scale', scale.toFixed(3));
  hero.style.setProperty('--hero-shift', `${shift.toFixed(1)}px`);
  hero.style.setProperty('--hero-copy-opacity', copyOpacity.toFixed(3));
  hero.style.setProperty('--hero-copy-y', `${copyY.toFixed(1)}px`);
  hero.style.setProperty('--hero-bottom-opacity', bottomOpacity.toFixed(3));
  hero.style.setProperty('--scroll-copy-opacity', scrollCopyOpacity.toFixed(3));
  hero.style.setProperty('--scroll-copy-y', `${scrollCopyY.toFixed(1)}px`);
}

let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      updateHeroScroll();
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });
updateHeroScroll();
