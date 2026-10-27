let cart = [];
let wishlist = [];

const appMain = document.getElementById('appMain');
const cartBtn = document.getElementById('cartBtn');
const wishlistBtn = document.getElementById('wishlistBtn');
const searchBtn = document.getElementById('searchBtn');
const cartDrawer = document.getElementById('cartDrawer');
const wishlistDrawer = document.getElementById('wishlistDrawer');
const searchModal = document.getElementById('searchModal');
const closeCart = document.getElementById('closeCart');
const closeWishlist = document.getElementById('closeWishlist');
const closeSearch = document.getElementById('closeSearch');
const cartBadge = document.getElementById('cartBadge');
const wishlistBadge = document.getElementById('wishlistBadge');
const cartItemsList = document.getElementById('cartItemsList');
const wishlistItemsList = document.getElementById('wishlistItemsList');
const cartTotalPrice = document.getElementById('cartTotalPrice');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

document.addEventListener('DOMContentLoaded', () => {
    loadRoute('home');
    setupEventListeners();
});

function setupEventListeners() {
    document.querySelectorAll('[data-route]').forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            const route = el.getAttribute('data-route');
            loadRoute(route);
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            if(el.classList.contains('nav-link')) {
                el.classList.add('active');
            }
        });
    });

    cartBtn.addEventListener('click', () => cartDrawer.classList.add('open'));
    closeCart.addEventListener('click', () => cartDrawer.classList.remove('open'));
    wishlistBtn.addEventListener('click', () => wishlistDrawer.classList.add('open'));
    closeWishlist.addEventListener('click', () => wishlistDrawer.classList.remove('open'));
    searchBtn.addEventListener('click', () => searchModal.classList.add('open'));
    closeSearch.addEventListener('click', () => searchModal.classList.remove('open'));

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        if(!query) {
            searchResults.innerHTML = '';
            return;
        }
        const filtered = productsData.filter(p => p.title.toLowerCase().includes(query) || p.category.toLowerCase().includes(query));
        searchResults.innerHTML = filtered.map(p => `
            <div class="search-result-item" onclick="viewProduct(${p.id})">
                <img src="${p.image}" alt="${p.title}">
                <div>
                    <h4>${p.title}</h4>
                    <p>$${p.price.toLocaleString()}</p>
                </div>
            </div>
        `).join('');
    });
}

function loadRoute(route) {
    window.scrollTo(0, 0);
    switch(route) {
        case 'home':
            renderHomeView();
            break;
        case 'collections':
            renderCollectionsView();
            break;
        case 'configurator':
            renderConfiguratorView();
            break;
        case 'atelier':
            renderAtelierView();
            break;
        case 'journal':
            renderJournalView();
            break;
        default:
            renderHomeView();
    }
}

function renderHomeView() {
    appMain.innerHTML = `
        <section class="hero-section">
            <img src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1920&q=80" alt="Hero Jewelry" class="hero-bg">
            <div class="hero-content">
                <span class="hero-subtitle">Bespoke Fine Jewelry Atelier</span>
                <h1 class="hero-title">Timeless Elegance Carved in Gold</h1>
                <p class="hero-description">Discover handcrafted heirlooms designed to celebrate your most cherished milestones with uncompromising ethical luxury.</p>
                <div class="hero-actions">
                    <button class="btn-primary" data-route="collections" onclick="loadRoute('collections')">Explore Collections</button>
                    <button class="btn-outline" data-route="configurator" onclick="loadRoute('configurator')">Bespoke Studio</button>
                </div>
            </div>
        </section>

        <section class="section-padding">
            <div class="section-header">
                <h2>Curated Categories</h2>
                <p>Explore our master craftsmanship across iconic fine jewelry lines.</p>
            </div>
            <div class="categories-grid">
                <div class="category-card" onclick="loadRoute('collections')">
                    <img src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80" alt="Rings">
                    <div class="category-overlay">
                        <span>Masterpiece Line</span>
                        <h3>Engagement Rings</h3>
                    </div>
                </div>
                <div class="category-card" onclick="loadRoute('collections')">
                    <img src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80" alt="Necklaces">
                    <div class="category-overlay">
                        <span>Luminous Art</span>
                        <h3>Fine Necklaces</h3>
                    </div>
                </div>
                <div class="category-card" onclick="loadRoute('collections')">
                    <img src="https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80" alt="Earrings">
                    <div class="category-overlay">
                        <span>Grace & Motion</span>
                        <h3>Earrings & Cuffs</h3>
                    </div>
                </div>
            </div>
        </section>

        <section class="section-padding" style="background-color: #f1ede4;">
            <div class="section-header">
                <h2>Signature Masterpieces</h2>
                <p>Our most coveted creations available for immediate acquisition.</p>
            </div>
            <div class="products-grid">
                ${productsData.slice(0, 4).map(product => renderProductCard(product)).join('')}
            </div>
        </section>
    `;
    attachProductListeners();
}

function renderCollectionsView() {
    appMain.innerHTML = `
        <div class="section-padding">
            <div class="section-header">
                <h2>The Complete Collection</h2>
                <p>Explore heirloom pieces meticulously crafted with peerless gemstones and certified precious metals.</p>
            </div>
            <div class="products-grid">
                ${productsData.map(product => renderProductCard(product)).join('')}
            </div>
        </div>
    `;
    attachProductListeners();
}

function renderConfiguratorView() {
    appMain.innerHTML = `
        <div class="configurator-wrapper">
            <div class="configurator-container">
                <div class="configurator-preview">
                    <img id="configRingImg" src="https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=80" alt="Custom Ring">
                </div>
                <div class="configurator-controls">
                    <h2>Bespoke Ring Studio</h2>
                    <p>Customize your dream heirloom by selecting your preferred precious metal and centre gemstone.</p>
                    
                    <div class="config-group">
                        <label>Select Metal</label>
                        <div class="config-options">
                            <button class="config-btn active" onclick="updateConfig('metal', 'Yellow Gold', 0, this)">18k Yellow Gold</button>
                            <button class="config-btn" onclick="updateConfig('metal', 'White Gold', 150, this)">18k White Gold</button>
                            <button class="config-btn" onclick="updateConfig('metal', 'Rose Gold', 100, this)">18k Rose Gold</button>
                        </div>
                    </div>

                    <div class="config-group">
                        <label>Select Centre Gemstone</label>
                        <div class="config-options">
                            <button class="config-btn active" onclick="updateConfig('stone', 'Emerald', 2450, this)">Zambian Emerald</button>
                            <button class="config-btn" onclick="updateConfig('stone', 'Diamond', 3800, this)">Brilliant Diamond</button>
                            <button class="config-btn" onclick="updateConfig('stone', 'Sapphire', 2100, this)">Ceylon Sapphire</button>
                        </div>
                    </div>

                    <div class="config-price-row">
                        <div>
                            <span style="font-size: 0.85rem; text-transform: uppercase; color: #aaa; display: block;">Total Estimated Price</span>
                            <div class="config-total" id="configTotalPrice">$2,450</div>
                        </div>
                        <button class="btn-primary" onclick="addCustomToCart()">Add Custom Ring to Bag</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

let currentConfig = {
    metal: 'Yellow Gold',
    stone: 'Emerald',
    basePrice: 2450,
    metalAdd: 0,
    stoneAdd: 0
};

function updateConfig(type, value, price, btn) {
    btn.parentElement.querySelectorAll('.config-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    if(type === 'metal') {
        currentConfig.metal = value;
        currentConfig.metalAdd = price;
    } else {
        currentConfig.stone = value;
        currentConfig.stoneAdd = price;
    }
    
    const total = 1000 + currentConfig.metalAdd + currentConfig.stoneAdd;
    document.getElementById('configTotalPrice').innerText = `$${total.toLocaleString()}`;
}

function addCustomToCart() {
    const total = 1000 + currentConfig.metalAdd + currentConfig.stoneAdd;
    const customItem = {
        id: Date.now(),
        title: `Bespoke ${currentConfig.stone} Ring in ${currentConfig.metal}`,
        price: total,
        image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=80"
    };
    cart.push(customItem);
    updateCartUI();
    cartDrawer.classList.add('open');
}

function renderAtelierView() {
    appMain.innerHTML = `
        <div class="atelier-story">
            <div class="atelier-image">
                <img src="https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=80" alt="Atelier Craft">
            </div>
            <div class="atelier-text">
                <h2>Artisan Heritage & Craftsmanship</h2>
                <p>Founded in Geneva and expanded globally, Aurelia & Stone stands at the intersection of traditional European goldsmithing and ultra-modern conscious luxury.</p>
                <p>Every piece is individually cast, hand-polished, and stone-set by master artisans who have perfected their discipline over decades. We reject mass production in favor of enduring soul and uncompromising durability.</p>
                <button class="btn-primary" onclick="loadRoute('collections')" style="margin-top: 1.5rem;">Explore Creations</button>
            </div>
        </div>
    `;
}

function renderJournalView() {
    appMain.innerHTML = `
        <div class="section-padding">
            <div class="section-header">
                <h2>The Atelier Journal</h2>
                <p>Stories on gemstone ethics, fine jewelry maintenance, and Haute Horlogerie.</p>
            </div>
            <div class="journal-grid">
                ${journalData.map(j => `
                    <div class="journal-card">
                        <div class="journal-img">
                            <img src="${j.image}" alt="${j.title}">
                        </div>
                        <div class="journal-content">
                            <span class="journal-date">${j.date}</span>
                            <h3>${j.title}</h3>
                            <p>${j.excerpt}</p>
                            <span class="read-more">Read Full Article &rarr;</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function renderProductCard(product) {
    const isWishlisted = wishlist.some(item => item.id === product.id);
    return `
        <div class="product-card">
            <div class="product-image-wrap">
                <button class="wishlist-toggle ${isWishlisted ? 'active' : ''}" onclick="toggleWishlist(${product.id})">
                    <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
                </button>
                <img src="${product.image}" alt="${product.title}">
            </div>
            <div class="product-info">
                <div>
                    <span class="product-category">${product.category}</span>
                    <h3 class="product-title">${product.title}</h3>
                </div>
                <div class="product-footer">
                    <span class="product-price">$${product.price.toLocaleString()}</span>
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Bag</button>
                </div>
            </div>
        </div>
    `;
}

function attachProductListeners() {
}

function addToCart(productId) {
    const product = productsData.find(p => p.id === productId);
    if(product) {
        cart.push(product);
        updateCartUI();
        cartDrawer.classList.add('open');
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function updateCartUI() {
    cartBadge.innerText = cart.length;
    if(cart.length === 0) {
        cartItemsList.innerHTML = `<p style="color: var(--text-muted); text-align: center; margin-top: 2rem;">Your shopping bag is currently empty.</p>`;
        cartTotalPrice.innerText = `$0.00`;
        return;
    }
    let total = 0;
    cartItemsList.innerHTML = cart.map((item, index) => {
        total += item.price;
        return `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.title}">
                <div class="cart-item-info" style="flex-grow: 1;">
                    <h4>${item.title}</h4>
                    <div class="cart-item-price">$${item.price.toLocaleString()}</div>
                    <button style="font-size: 0.75rem; color: var(--accent-rose); margin-top: 0.5rem;" onclick="removeFromCart(${index})">Remove</button>
                </div>
            </div>
        `;
    }).join('');
    cartTotalPrice.innerText = `$${total.toLocaleString()}`;
}

function toggleWishlist(productId) {
    const product = productsData.find(p => p.id === productId);
    const index = wishlist.findIndex(item => item.id === productId);
    if(index > -1) {
        wishlist.splice(index, 1);
    } else if(product) {
        wishlist.push(product);
    }
    updateWishlistUI();
    const activeRoute = document.querySelector('.nav-link.active')?.getAttribute('data-route') || 'home';
    loadRoute(activeRoute);
}

function updateWishlistUI() {
    wishlistBadge.innerText = wishlist.length;
    if(wishlist.length === 0) {
        wishlistItemsList.innerHTML = `<p style="color: var(--text-muted); text-align: center; margin-top: 2rem;">Your wishlist is currently empty.</p>`;
        return;
    }
    wishlistItemsList.innerHTML = wishlist.map((item, index) => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.title}">
            <div class="cart-item-info" style="flex-grow: 1;">
                <h4>${item.title}</h4>
                <div class="cart-item-price">$${item.price.toLocaleString()}</div>
                <button style="font-size: 0.75rem; color: var(--bg-dark); margin-top: 0.5rem; text-transform: uppercase; font-weight: 600;" onclick="addToCartFromWishlist(${item.id})">Move to Bag</button>
            </div>
        </div>
    `).join('');
}

function addToCartFromWishlist(productId) {
    addToCart(productId);
    wishlist = wishlist.filter(item => item.id !== productId);
    updateWishlistUI();
    const activeRoute = document.querySelector('.nav-link.active')?.getAttribute('data-route') || 'home';
    loadRoute(activeRoute);
}