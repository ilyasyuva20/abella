import { products } from './data/products.js';

// Application State
const state = {
  cart: [],
  wishlist: [],
  activeFilter: 'all',
  searchQuery: '',
  currentHeroSlide: 0,
  heroSlideCount: 3,
  heroAutoTimer: null
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
  initProductGrid();
  initEventListeners();
  initHeroSlider();
});

// Hero Slider Initialization
function initHeroSlider() {
  const track = document.getElementById('heroSliderTrack');
  const prevBtn = document.getElementById('heroPrevBtn');
  const nextBtn = document.getElementById('heroNextBtn');
  const dots = document.querySelectorAll('.hero-dot');

  if (!track) return;

  function updateSlide(index) {
    state.currentHeroSlide = (index + state.heroSlideCount) % state.heroSlideCount;
    track.style.transform = `translateX(-${state.currentHeroSlide * 100}%)`;

    // Update Dots
    dots.forEach((dot, idx) => {
      if (idx === state.currentHeroSlide) {
        dot.className = 'hero-dot w-6 h-1.5 rounded-full bg-olive transition-all duration-300';
      } else {
        dot.className = 'hero-dot w-2 h-1.5 rounded-full bg-sand hover:bg-taupe transition-all duration-300';
      }
    });
  }

  function startAutoPlay() {
    stopAutoPlay();
    state.heroAutoTimer = setInterval(() => {
      updateSlide(state.currentHeroSlide + 1);
    }, 6000);
  }

  function stopAutoPlay() {
    if (state.heroAutoTimer) clearInterval(state.heroAutoTimer);
  }

  prevBtn?.addEventListener('click', () => {
    updateSlide(state.currentHeroSlide - 1);
    startAutoPlay();
  });

  nextBtn?.addEventListener('click', () => {
    updateSlide(state.currentHeroSlide + 1);
    startAutoPlay();
  });

  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const idx = parseInt(e.target.dataset.slide, 10);
      updateSlide(idx);
      startAutoPlay();
    });
  });

  // Touch Swipe for Mobile
  let touchStartX = 0;
  let touchEndX = 0;
  const heroSection = document.getElementById('home');

  heroSection?.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  heroSection?.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchStartX - touchEndX > 50) {
      updateSlide(state.currentHeroSlide + 1);
      startAutoPlay();
    } else if (touchEndX - touchStartX > 50) {
      updateSlide(state.currentHeroSlide - 1);
      startAutoPlay();
    }
  }, { passive: true });

  startAutoPlay();
}

// Render Product Grid
function initProductGrid() {
  const container = document.getElementById('productGrid');
  if (!container) return;

  const filtered = state.activeFilter === 'all'
    ? products
    : products.filter(p => p.collection === state.activeFilter);

  container.innerHTML = filtered.map(product => {
    const isWishlisted = state.wishlist.includes(product.id);
    return `
      <div class="product-card group relative flex flex-col justify-between focus:outline-none">
        <!-- Image Container -->
        <div onclick="window.openQuickView('${product.id}')" class="relative cursor-pointer aspect-[4/5] overflow-hidden rounded-none bg-[#FAF8F5] border border-[#E5DFD5] shadow-xs">
          <img src="${product.image}" alt="${product.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
          
          <!-- Heart Wishlist Button -->
          <button onclick="event.stopPropagation(); window.toggleWishlist('${product.id}')" 
                  aria-label="Add to wishlist" 
                  class="absolute top-2.5 right-2.5 z-10 p-1.2 text-[#222222] hover:text-red-500 transition-colors focus:outline-none">
            <svg class="w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : 'fill-none'}" stroke="currentColor" stroke-width="1.6" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/>
            </svg>
          </button>
        </div>

        <!-- Product Title & Price Below Image -->
        <div class="mt-2.5 text-left space-y-0.5">
          <h3 onclick="window.openQuickView('${product.id}')" class="font-sans text-xs sm:text-sm font-medium text-[#222222] group-hover:text-[#8C7A6B] cursor-pointer transition-colors leading-snug">
            ${product.title}
          </h3>
          <p class="font-sans text-xs sm:text-sm font-semibold text-[#1A1A1A]">
            ₹ ${product.price.toLocaleString('en-IN')}
          </p>
        </div>
      </div>
    `;
  }).join('');
}

// Global Functions for Inline Onclick Handlers
window.toggleWishlist = (id) => {
  const index = state.wishlist.indexOf(id);
  if (index > -1) {
    state.wishlist.splice(index, 1);
    showToast('Removed from wishlist');
  } else {
    state.wishlist.push(id);
    showToast('Added to wishlist ❤️');
  }
  updateCounters();
  initProductGrid();
  renderWishlistDrawer();
};

window.addToCart = (id) => {
  const existing = state.cart.find(item => item.id === id);
  if (existing) {
    existing.quantity += 1;
  } else {
    const p = products.find(prod => prod.id === id);
    state.cart.push({ ...p, quantity: 1, selectedSize: p.sizes[0] });
  }
  showToast('Added to shopping bag 🛍️');
  updateCounters();
  renderCartDrawer();
};

window.updateCartQty = (id, delta) => {
  const item = state.cart.find(i => i.id === id);
  if (!item) return;
  item.quantity += delta;
  if (item.quantity <= 0) {
    state.cart = state.cart.filter(i => i.id !== id);
  }
  updateCounters();
  renderCartDrawer();
};

window.openQuickView = (id) => {
  const p = products.find(prod => prod.id === id);
  if (!p) return;

  const modalBody = document.getElementById('modalBody');
  modalBody.innerHTML = `
    <div class="aspect-[4/5] overflow-hidden border border-sand">
      <img src="${p.image}" alt="${p.title}" class="w-full h-full object-cover">
    </div>
    <div class="space-y-4 flex flex-col justify-between">
      <div class="space-y-2">
        <span class="text-xs uppercase font-sans tracking-widest text-taupe">${p.category}</span>
        <h2 class="font-serif text-2xl text-charcoal">${p.title}</h2>
        <div class="flex items-center gap-3">
          <span class="text-lg font-bold text-olive">₹ ${p.price.toLocaleString('en-IN')}</span>
          <span class="text-xs text-taupe line-through">₹ ${p.compareAtPrice.toLocaleString('en-IN')}</span>
        </div>
        <p class="text-xs text-taupe leading-relaxed pt-2">${p.description}</p>
      </div>

      <!-- Size Selector -->
      <div class="space-y-2">
        <span class="text-xs font-medium uppercase tracking-wider text-charcoal block">Select Size:</span>
        <div class="flex gap-2">
          ${p.sizes.map(size => `
            <button class="size-btn px-3 py-1.5 border border-sand text-xs hover:border-olive focus:border-olive focus:bg-champagne">${size}</button>
          `).join('')}
        </div>
      </div>

      <div class="space-y-3 pt-4 border-t border-sand">
        <button onclick="window.addToCart('${p.id}'); window.closeModal();" class="w-full py-3 bg-olive text-ivory text-xs font-medium uppercase tracking-widest hover:bg-taupe transition-colors">
          ADD TO BAG — ₹ ${p.price.toLocaleString('en-IN')}
        </button>
        <a href="https://wa.me/919446861646?text=Hi%20Abella%2C%20I%20want%20to%20customize%20or%20order%20${encodeURIComponent(p.title)}" target="_blank" class="flex items-center justify-center gap-2 w-full py-3 border border-olive text-olive text-xs font-medium uppercase tracking-widest hover:bg-olive hover:text-ivory transition-colors">
          💬 CUSTOMIZE ON WHATSAPP
        </a>
      </div>
    </div>
  `;

  document.getElementById('quickViewModal').classList.add('modal-open');
};

window.closeModal = () => {
  document.getElementById('quickViewModal').classList.remove('modal-open');
};

// UI Counters Update
function updateCounters() {
  document.getElementById('wishlistCount').textContent = state.wishlist.length;
  const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById('cartCount').textContent = totalItems;
}

// Render Cart Drawer
function renderCartDrawer() {
  const container = document.getElementById('cartItemsContainer');
  const subtotalEl = document.getElementById('cartSubtotal');
  if (!container) return;

  if (state.cart.length === 0) {
    container.innerHTML = `
      <div class="py-12 text-center text-taupe space-y-3">
        <p class="text-sm">Your shopping bag is empty.</p>
        <a href="#featured" onclick="window.closeCartDrawer()" class="inline-block text-xs uppercase tracking-widest text-olive hover:underline">Start Shopping &rarr;</a>
      </div>
    `;
    subtotalEl.textContent = '₹0';
    return;
  }

  let subtotal = 0;
  container.innerHTML = state.cart.map(item => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;
    return `
      <div class="flex items-center gap-4 py-3 border-b border-sand/50">
        <img src="${item.image}" alt="${item.title}" class="w-16 h-20 object-cover border border-sand">
        <div class="flex-1 space-y-1">
          <h4 class="text-xs font-medium text-charcoal">${item.title}</h4>
          <p class="text-[11px] text-taupe">Size: ${item.selectedSize}</p>
          <p class="text-xs font-semibold text-olive">₹ ${item.price.toLocaleString('en-IN')}</p>
          <div class="flex items-center gap-2 pt-1">
            <button onclick="window.updateCartQty('${item.id}', -1)" class="w-5 h-5 border border-sand flex items-center justify-center text-xs text-charcoal hover:bg-sand">-</button>
            <span class="text-xs font-medium px-2">${item.quantity}</span>
            <button onclick="window.updateCartQty('${item.id}', 1)" class="w-5 h-5 border border-sand flex items-center justify-center text-xs text-charcoal hover:bg-sand">+</button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  subtotalEl.textContent = `₹ ${subtotal.toLocaleString('en-IN')}`;
}

// Render Wishlist Drawer
function renderWishlistDrawer() {
  const container = document.getElementById('wishlistItemsContainer');
  if (!container) return;

  if (state.wishlist.length === 0) {
    container.innerHTML = `
      <div class="py-12 text-center text-taupe space-y-3">
        <p class="text-sm">Your wishlist is empty.</p>
      </div>
    `;
    return;
  }

  const wishlistedProds = products.filter(p => state.wishlist.includes(p.id));
  container.innerHTML = wishlistedProds.map(p => `
    <div class="flex items-center gap-4 py-3 border-b border-sand/50">
      <img src="${p.image}" alt="${p.title}" class="w-16 h-20 object-cover border border-sand">
      <div class="flex-1 space-y-1">
        <h4 class="text-xs font-medium text-charcoal">${p.title}</h4>
        <p class="text-xs font-semibold text-olive">₹ ${p.price.toLocaleString('en-IN')}</p>
        <button onclick="window.addToCart('${p.id}'); window.toggleWishlist('${p.id}');" class="mt-1 px-3 py-1 bg-olive text-ivory text-[10px] uppercase tracking-wider">Move to Bag</button>
      </div>
    </div>
  `).join('');
}

// Toast Handler
function showToast(msg) {
  const toast = document.getElementById('toastNotification');
  const toastMsg = document.getElementById('toastMsg');
  if (!toast || !toastMsg) return;

  toastMsg.textContent = msg;
  toast.classList.add('toast-visible');
  setTimeout(() => {
    toast.classList.remove('toast-visible');
  }, 2500);
}

// Event Listeners
function initEventListeners() {
  // Mobile Menu Drawer
  const mobileMenuDrawer = document.getElementById('mobileMenuDrawer');
  document.getElementById('mobileMenuBtn')?.addEventListener('click', () => mobileMenuDrawer.classList.add('drawer-open'));
  document.getElementById('closeMobileMenuBtn')?.addEventListener('click', () => mobileMenuDrawer.classList.remove('drawer-open'));
  document.querySelectorAll('.mobile-nav-link').forEach(l => l.addEventListener('click', () => mobileMenuDrawer.classList.remove('drawer-open')));

  // Cart Drawer
  const cartDrawer = document.getElementById('cartDrawer');
  document.getElementById('openCartBtn')?.addEventListener('click', () => cartDrawer.classList.add('drawer-open'));
  document.getElementById('closeCartBtn')?.addEventListener('click', () => cartDrawer.classList.remove('drawer-open'));
  window.closeCartDrawer = () => cartDrawer.classList.remove('drawer-open');

  // Wishlist Drawer
  const wishlistDrawer = document.getElementById('wishlistDrawer');
  document.getElementById('openWishlistBtn')?.addEventListener('click', () => wishlistDrawer.classList.add('drawer-open'));
  document.getElementById('closeWishlistBtn')?.addEventListener('click', () => wishlistDrawer.classList.remove('drawer-open'));

  // Quick View Modal Close
  document.getElementById('closeQuickViewBtn')?.addEventListener('click', () => window.closeModal());

  // Search Overlay
  const searchOverlay = document.getElementById('searchOverlay');
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');

  document.getElementById('openSearchBtn')?.addEventListener('click', () => {
    searchOverlay.classList.add('modal-open');
    searchInput.focus();
  });
  document.getElementById('closeSearchBtn')?.addEventListener('click', () => searchOverlay.classList.remove('modal-open'));

  searchInput?.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase().trim();
    if (!q) {
      searchResults.innerHTML = '';
      return;
    }
    const matches = products.filter(p => p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    searchResults.innerHTML = matches.map(p => `
      <div onclick="window.openQuickView('${p.id}'); searchOverlay.classList.remove('modal-open');" class="cursor-pointer border border-sand p-2 bg-ivory text-center">
        <img src="${p.image}" alt="${p.title}" class="w-full aspect-[4/5] object-cover mb-2">
        <h4 class="text-xs font-medium text-charcoal">${p.title}</h4>
        <p class="text-xs font-bold text-olive">₹ ${p.price.toLocaleString('en-IN')}</p>
      </div>
    `).join('');
  });

  // Newsletter Form
  document.getElementById('newsletterForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('Thank you for subscribing to Abella! ✨');
    e.target.reset();
  });
}
