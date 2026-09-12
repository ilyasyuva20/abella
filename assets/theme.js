// ABELLA BY SEBASTIANS — Shopify Theme Interactive JavaScript

document.addEventListener('DOMContentLoaded', () => {
  initHeroSlider();
  initMobileMenu();
  initSmoothScroll();
});

// Hero Banner Carousel Slider
function initHeroSlider() {
  const track = document.getElementById('heroSliderTrack');
  const prevBtn = document.getElementById('heroPrevBtn');
  const nextBtn = document.getElementById('heroNextBtn');
  const dots = document.querySelectorAll('.hero-dot');

  if (!track) return;

  let currentSlide = 0;
  const slideCount = dots.length || 3;
  let autoTimer = null;

  function updateSlide(index) {
    currentSlide = (index + slideCount) % slideCount;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;

    dots.forEach((dot, idx) => {
      if (idx === currentSlide) {
        dot.className = 'hero-dot w-6 h-2 rounded-full bg-[#2C221E] transition-all duration-300';
      } else {
        dot.className = 'hero-dot w-2 h-2 rounded-full bg-[#7A6B60]/40 hover:bg-[#7A6B60]/80 transition-all duration-300';
      }
    });
  }

  function startAutoPlay() {
    stopAutoPlay();
    autoTimer = setInterval(() => {
      updateSlide(currentSlide + 1);
    }, 6000);
  }

  function stopAutoPlay() {
    if (autoTimer) clearInterval(autoTimer);
  }

  prevBtn?.addEventListener('click', () => {
    updateSlide(currentSlide - 1);
    startAutoPlay();
  });

  nextBtn?.addEventListener('click', () => {
    updateSlide(currentSlide + 1);
    startAutoPlay();
  });

  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const idx = parseInt(e.target.dataset.slide, 10);
      updateSlide(idx);
      startAutoPlay();
    });
  });

  startAutoPlay();
}

// Mobile Drawer Menu
function initMobileMenu() {
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const closeBtn = document.getElementById('closeMobileMenuBtn');
  const drawer = document.getElementById('mobileMenuDrawer');

  if (!mobileBtn || !drawer) return;

  mobileBtn.addEventListener('click', () => {
    drawer.classList.remove('opacity-0', 'pointer-events-none');
    drawer.classList.add('opacity-100');
    drawer.querySelector('.mobile-drawer-content')?.classList.remove('-translate-x-full');
  });

  function closeDrawer() {
    drawer.classList.add('opacity-0', 'pointer-events-none');
    drawer.classList.remove('opacity-100');
    drawer.querySelector('.mobile-drawer-content')?.classList.add('-translate-x-full');
  }

  closeBtn?.addEventListener('click', closeDrawer);
  drawer.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

// Smooth Scrolling
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
}
