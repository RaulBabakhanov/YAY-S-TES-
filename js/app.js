const products = [
  { id: 1, name: 'Başlangıç Yayı',   desc: 'Yeni başlayanlar için ideal',   price: 450,  icon: '🏹' },
  { id: 2, name: 'Spor Yayı Pro',     desc: 'Orta seviye sporcular için',    price: 950,  icon: '🎯' },
  { id: 3, name: 'Karbon Fiber Yay',  desc: 'Profesyonel yarışmacılar için', price: 2200, icon: '⚡' },
  { id: 4, name: 'Geleneksel Yay',    desc: 'El yapımı ahşap, otantik',      price: 750,  icon: '🌿' },
  { id: 5, name: 'Çocuk Yayı',        desc: '8-14 yaş için güvenli set',     price: 320,  icon: '🌟' },
  { id: 6, name: 'Ok Seti (12 adet)', desc: 'Her yay ile uyumlu oklar',      price: 180,  icon: '➶'  },
];

let cart = [];

function renderProducts() {
  const grid = document.getElementById('productGrid');
  grid.innerHTML = products.map(p => `
    <div class="product-card">
      <div class="product-img">${p.icon}</div>
      <div class="product-info">
        <div class="product-name">${p.name}</div>
        <div class="product-desc">${p.desc}</div>
        <div class="product-bottom">
          <div class="product-price">₺${p.price.toLocaleString('tr-TR')}</div>
          <button class="btn-add" onclick="addToCart(${p.id})">+ Sepete Ekle</button>
        </div>
      </div>
    </div>
  `).join('');
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(c => c.id === id);
  if (existing) { existing.qty++; }
  else { cart.push({ ...product, qty: 1 }); }
  updateCart();
  showToast(product.name + ' sepete eklendi!');
}

function removeFromCart(id) {
  const existing = cart.find(c => c.id === id);
  if (!existing) return;
  if (existing.qty > 1) { existing.qty--; }
  else { cart = cart.filter(c => c.id !== id); }
  updateCart();
}

function updateCart() {
  const total = cart.reduce((sum, c) => sum + c.price * c.qty, 0);
  const count = cart.reduce((sum, c) => sum + c.qty, 0);
  document.getElementById('cartCount').textContent = count;
  document.getElementById('cartTotal').textContent = '₺' + total.toLocaleString('tr-TR');
  const itemsEl = document.getElementById('cartItems');
  if (cart.length === 0) {
    itemsEl.innerHTML = '<div class="cart-empty">Sepetiniz boş.</div>';
    return;
  }
  itemsEl.innerHTML = cart.map(c => `
    <div class="cart-item">
      <div class="cart-item-left">
        <div class="cart-item-name">${c.icon} ${c.name}</div>
        <div class="cart-item-price">₺${(c.price * c.qty).toLocaleString('tr-TR')}</div>
      </div>
      <div class="cart-item-right">
        <button class="qty-btn" onclick="removeFromCart(${c.id})">−</button>
        <span>${c.qty}</span>
        <button class="qty-btn" onclick="addToCart(${c.id})">+</button>
      </div>
    </div>
  `).join('');
}

function toggleCart() {
  document.getElementById('cartPanel').classList.toggle('open');
  document.getElementById('overlay').classList.toggle('show');
}

function checkout() {
  if (cart.length === 0) { showToast('Sepetiniz boş!'); return; }
  cart = [];
  updateCart();
  toggleCart();
  showToast('Siparişiniz alındı! Teşekkürler 🎉');
}

function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + name).classList.add('active');
  window.scrollTo(0, 0);
}

function submitForm(e) {
  e.preventDefault();
  e.target.reset();
  showToast('Mesajınız gönderildi!');
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

renderProducts();
updateCart();