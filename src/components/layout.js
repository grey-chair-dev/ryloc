// Shared layout components
import { products } from '../data/products.js';

export function renderNavbar(activePage = 'home') {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return `
    <nav id="navbar" class="fixed w-full z-50 transition-all duration-300 py-4 px-4 sm:py-5 sm:px-6 md:py-6 md:px-8 flex justify-between items-center text-white">
      <div class="flex items-center gap-2 sm:gap-4 min-w-0">
        <a href="/index.html" class="flex-shrink-0" aria-label="Ryloc Parts Home">
          <img src="/logo.png" alt="Ryloc Parts Logo" class="h-20 sm:h-24 md:h-28 w-auto invert brightness-0 filter" style="filter: brightness(0) invert(1);">
        </a>
      </div>
      <!-- Desktop nav -->
      <div class="hidden md:flex gap-8 text-sm uppercase tracking-widest font-medium">
        <a href="/index.html" class="${activePage === 'home' ? 'text-white border-b border-white' : 'text-gray-400 hover:text-white'} transition-colors pb-1">Home</a>
        <div class="relative group">
          <a href="/parts.html" class="${activePage === 'parts' ? 'text-white border-b border-white' : 'text-gray-400 hover:text-white'} transition-colors pb-1 flex items-center gap-1">
            Parts
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
          </a>
          <div class="absolute top-full left-0 mt-2 w-48 bg-black/90 backdrop-blur-md border border-white/10 rounded shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <a href="/parts.html" class="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 transition-colors">All Parts</a>
            <a href="#" class="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 transition-colors">Install Guides</a>
            <a href="/parts.html?category=Full Assembly" class="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 transition-colors">Assemblies</a>
            <a href="/parts.html?category=Individual Boards" class="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 transition-colors">Boards</a>
          </div>
        </div>
        <a href="/about.html" class="${activePage === 'about' ? 'text-white border-b border-white' : 'text-gray-400 hover:text-white'} transition-colors pb-1">About Us</a>
        <a href="/contact.html" class="${activePage === 'contact' ? 'text-white border-b border-white' : 'text-gray-400 hover:text-white'} transition-colors pb-1">Contact</a>
      </div>
      <div class="flex items-center gap-4 sm:gap-6 flex-shrink-0">
        <a href="/engineering.html" class="hidden lg:block text-xs uppercase tracking-widest font-bold text-mb-blue hover:text-white transition-colors">Subcontract Engineering</a>
        <button id="auth-btn" class="p-2 -m-2 md:p-0 md:m-0 hover:text-gray-300 transition-colors touch-manipulation" aria-label="Account">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
        </button>
        <button id="cart-btn" class="p-2 -m-2 md:p-0 md:m-0 hover:text-gray-300 transition-colors relative touch-manipulation" aria-label="Cart">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
          <span id="cart-count" class="${cartCount > 0 ? 'flex' : 'hidden'} absolute -top-1 -right-1 md:-top-2 md:-right-2 w-5 h-5 md:w-4 md:h-4 bg-mb-blue text-black text-[10px] font-bold rounded-full items-center justify-center">${cartCount}</span>
        </button>
        <button id="menu-btn" class="md:hidden p-2 -m-2 hover:text-gray-300 transition-colors touch-manipulation" aria-label="Open menu" aria-expanded="false">
          <svg id="menu-icon-open" class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
          <svg id="menu-icon-close" class="h-6 w-6 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>
    </nav>

    <!-- Mobile menu overlay -->
    <div id="mobile-menu-overlay" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-[52] opacity-0 invisible transition-all duration-300 md:hidden" aria-hidden="true"></div>
    <!-- Mobile menu drawer -->
    <div id="mobile-menu" class="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-mb-dark-grey border-l border-white/10 z-[53] transform translate-x-full transition-transform duration-300 ease-out flex flex-col md:hidden overflow-y-auto">
      <div class="p-4 flex justify-between items-center border-b border-white/10 safe-area-top">
        <span class="text-sm uppercase tracking-widest text-gray-500">Menu</span>
        <button id="mobile-menu-close" class="p-3 -m-3 text-gray-400 hover:text-white touch-manipulation" aria-label="Close menu">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>
      <nav class="p-6 flex flex-col gap-1" aria-label="Main">
        <a href="/index.html" class="mobile-nav-link ${activePage === 'home' ? 'text-white' : 'text-gray-300'} py-4 border-b border-white/5">Home</a>
        <a href="/parts.html" class="mobile-nav-link ${activePage === 'parts' ? 'text-white' : 'text-gray-300'} py-4 border-b border-white/5">Parts</a>
        <a href="/parts.html?category=Full Assembly" class="mobile-nav-link text-gray-400 pl-4 py-3 text-sm border-b border-white/5">Assemblies</a>
        <a href="/parts.html?category=Individual Boards" class="mobile-nav-link text-gray-400 pl-4 py-3 text-sm border-b border-white/5">Boards</a>
        <a href="#" class="mobile-nav-link text-gray-400 pl-4 py-3 text-sm border-b border-white/5">Install Guides</a>
        <a href="/about.html" class="mobile-nav-link ${activePage === 'about' ? 'text-white' : 'text-gray-300'} py-4 border-b border-white/5">About Us</a>
        <a href="/contact.html" class="mobile-nav-link ${activePage === 'contact' ? 'text-white' : 'text-gray-300'} py-4 border-b border-white/5">Contact</a>
        <a href="/engineering.html" class="mobile-nav-link text-mb-blue font-semibold py-4 border-b border-white/5">Subcontract Engineering</a>
      </nav>
      <div class="mt-auto p-6 border-t border-white/10 safe-area-bottom"></div>
    </div>

    <!-- Cart Drawer -->
    <div id="cart-drawer" class="fixed inset-y-0 right-0 w-full md:w-96 bg-mb-dark-grey border-l border-white/10 transform translate-x-full transition-transform duration-300 z-[60] shadow-2xl flex flex-col">
      <div class="p-6 border-b border-white/10 flex justify-between items-center">
        <h2 class="text-xl font-serif">Your Cart</h2>
        <button id="close-cart" class="text-gray-400 hover:text-white"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>
      </div>
      <div id="cart-items" class="flex-1 overflow-y-auto p-6 space-y-6">
        <!-- Cart items injected here -->
        ${cart.length === 0 ? '<p class="text-gray-500 text-center mt-10">Your cart is empty.</p>' : ''}
      </div>
      <div class="p-6 border-t border-white/10 bg-black/20 safe-area-bottom">
        <div class="flex justify-between mb-4 text-lg font-serif">
          <span>Total</span>
          <span id="cart-total">$${cart.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2)}</span>
        </div>
        <button id="checkout-btn" class="w-full btn-primary">Checkout</button>
      </div>
    </div>
    
    <!-- Overlay -->
    <div id="cart-overlay" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-[55] opacity-0 invisible transition-all duration-300"></div>
  `;
}

export function renderFooter() {
  return `
    <div id="gc-review-page-slot"></div>
    <footer class="bg-mb-dark-grey text-white pt-20 pb-10 border-t border-white/10">
      <div class="max-w-7xl mx-auto px-4 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div>
          <h4 class="font-serif text-xl mb-6">Ryloc Parts</h4>
          <p class="text-gray-400 text-sm leading-relaxed">
            Restoring the integrity of classic Mercedes-Benz engineering. The best or nothing, rebuilt better.
          </p>
          <div class="mt-6 flex gap-4">
             <a href="https://instagram.com/rylocparts" target="_blank" class="text-gray-400 hover:text-white transition-colors"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg></a>
             <a href="https://ebay.com/usr/ryloc_parts" target="_blank" class="text-gray-400 hover:text-white transition-colors">eBay</a>
          </div>
        </div>
        <div>
          <h4 class="uppercase tracking-widest text-xs font-bold mb-6 text-gray-500">Shop</h4>
          <ul class="space-y-3 text-sm text-gray-300">
            <li><a href="/parts.html" class="hover:text-white transition-colors">All Parts</a></li>
            <li><a href="/parts.html?category=Full Assembly" class="hover:text-white transition-colors">Assemblies</a></li>
            <li><a href="/parts.html?category=Individual Boards" class="hover:text-white transition-colors">Circuit Boards</a></li>
            <li><a href="/parts.html?category=Merchandise" class="hover:text-white transition-colors">Merchandise</a></li>
          </ul>
        </div>
        <div>
          <h4 class="uppercase tracking-widest text-xs font-bold mb-6 text-gray-500">Support</h4>
          <ul class="space-y-3 text-sm text-gray-300">
            <li><a href="/contact.html" class="hover:text-white transition-colors">Contact Us</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Core Exchange Program</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Install Guides</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Shipping & Returns</a></li>
          </ul>
        </div>
        <div>
          <h4 class="uppercase tracking-widest text-xs font-bold mb-6 text-gray-500">Engineering</h4>
          <ul class="space-y-3 text-sm text-gray-300">
            <li><a href="/engineering.html" class="hover:text-white transition-colors">Subcontract Services</a></li>
            <li><a href="/engineering.html#ideas" class="hover:text-white transition-colors">Submit an Idea</a></li>
          </ul>
        </div>
      </div>
      
      <div class="max-w-7xl mx-auto px-4 md:px-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
        <p>&copy; 2026 Ryloc Parts. All rights reserved.</p>
        <div class="flex gap-6">
          <a href="#" class="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" class="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  `;
}

export function initLayout() {
  // Navbar Scroll Effect
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('glass-nav');
        navbar.classList.remove('py-6', 'md:py-6');
        navbar.classList.add('py-3', 'sm:py-4', 'md:py-4');
      } else {
        navbar.classList.remove('glass-nav');
        navbar.classList.remove('py-3', 'sm:py-4', 'md:py-4');
        navbar.classList.add('py-4', 'sm:py-5', 'md:py-6');
      }
    });
  }

  // Mobile menu
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
  const mobileMenuClose = document.getElementById('mobile-menu-close');
  const menuIconOpen = document.getElementById('menu-icon-open');
  const menuIconClose = document.getElementById('menu-icon-close');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function openMobileMenu() {
    if (!mobileMenu || !mobileMenuOverlay) return;
    mobileMenu.classList.remove('translate-x-full');
    mobileMenuOverlay.classList.remove('opacity-0', 'invisible');
    document.body.classList.add('overflow-hidden');
    if (menuBtn) menuBtn.setAttribute('aria-expanded', 'true');
    if (menuIconOpen) menuIconOpen.classList.add('hidden');
    if (menuIconClose) menuIconClose.classList.remove('hidden');
  }
  function closeMobileMenu() {
    if (!mobileMenu || !mobileMenuOverlay) return;
    mobileMenu.classList.add('translate-x-full');
    mobileMenuOverlay.classList.add('opacity-0', 'invisible');
    document.body.classList.remove('overflow-hidden');
    if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
    if (menuIconOpen) menuIconOpen.classList.remove('hidden');
    if (menuIconClose) menuIconClose.classList.add('hidden');
  }
  if (menuBtn) menuBtn.addEventListener('click', openMobileMenu);
  if (mobileMenuClose) mobileMenuClose.addEventListener('click', closeMobileMenu);
  if (mobileMenuOverlay) mobileMenuOverlay.addEventListener('click', closeMobileMenu);
  mobileNavLinks.forEach(link => link.addEventListener('click', closeMobileMenu));

  // Cart Drawer Logic
  const cartBtn = document.getElementById('cart-btn');
  const closeCartBtn = document.getElementById('close-cart');
  const cartDrawer = document.getElementById('cart-drawer');
  const cartOverlay = document.getElementById('cart-overlay');
  const checkoutBtn = document.getElementById('checkout-btn');

  function toggleCart() {
    cartDrawer.classList.toggle('translate-x-full');
    cartOverlay.classList.toggle('opacity-0');
    cartOverlay.classList.toggle('invisible');
    renderCartItems(); // Re-render items when opening
  }
  
  function handleCheckout() {
    // In a real app, this would redirect to Stripe/Shopify
    // For now, clear cart and show thank you
    localStorage.removeItem('cart');
    window.location.href = '/thank-you.html';
  }

  if (cartBtn) cartBtn.addEventListener('click', toggleCart);
  if (closeCartBtn) closeCartBtn.addEventListener('click', toggleCart);
  if (cartOverlay) cartOverlay.addEventListener('click', toggleCart);
  if (checkoutBtn) checkoutBtn.addEventListener('click', handleCheckout);

  // Render Cart Items
  function renderCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const cartCountElement = document.getElementById('cart-count');

    if (!cartItemsContainer) return;

    cartItemsContainer.innerHTML = cart.map(item => `
      <div class="flex gap-4 items-center bg-white/5 p-3 rounded">
        <img src="${item.image}" class="w-16 h-16 object-cover rounded" alt="${item.name}">
        <div class="flex-1">
          <h4 class="text-sm font-medium text-white">${item.name}</h4>
          <p class="text-xs text-gray-400">$${item.price}</p>
        </div>
        <div class="flex flex-col items-end gap-2">
           <button onclick="window.removeFromCart(${item.id})" class="text-red-400 hover:text-red-300 text-xs">Remove</button>
           <span class="text-sm text-gray-300">x${item.quantity}</span>
        </div>
      </div>
    `).join('');

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="text-gray-500 text-center mt-10">Your cart is empty.</p>';
    }

    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    if (cartTotalElement) cartTotalElement.innerText = `$${total.toFixed(2)}`;
    
    const count = cart.reduce((acc, item) => acc + item.quantity, 0);
    if (cartCountElement) {
        cartCountElement.innerText = count;
        cartCountElement.classList.toggle('hidden', count === 0);
        cartCountElement.classList.toggle('flex', count > 0);
    }
  }

  // Global Cart Functions
  window.addToCart = (productId) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    renderCartItems();
    
    // Open cart to show feedback
    cartDrawer.classList.remove('translate-x-full');
    cartOverlay.classList.remove('opacity-0');
    cartOverlay.classList.remove('invisible');
  };

  window.removeFromCart = (productId) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCartItems();
  };
  
  // Initial render
  renderCartItems();
}
