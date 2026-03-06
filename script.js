/* ================================
   Lilac & Loom — Myntra-Style Site
   ================================ */


   function initHeroSlider() {
  const slides = document.querySelectorAll(".hero-video-slider .video-slide video");
  let currentSlide = 0;

  if (!slides.length) return;
  slides[currentSlide].classList.add("active");
  slides[currentSlide].play();

  setInterval(() => {
    slides[currentSlide].classList.remove("active");
    if (slides[currentSlide].tagName === "VIDEO") slides[currentSlide].pause();

    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add("active");
    if (slides[currentSlide].tagName === "VIDEO") {
      slides[currentSlide].currentTime = 0;
      slides[currentSlide].play();
    }
  }, 8000);
}

/* ====== Product Data ====== */
const products = [
  { id:1, name:"Men's Jacket", category:"men", price:3500, img:"images/mensjacket.jpg", desc:"Stylish men's jacket crafted from premium fabric, offering warmth and comfort." },
  { id:2, name:"Casual Shirt", category:"men", price:2200, img:"images/casualshirt.jpg", desc:"Lightweight cotton casual shirt perfect for office and weekend wear." },
  { id:3, name:"Jeans", category:"men", price:2800, img:"images/jeansmen.jpg", desc:"Classic slim-fit jeans made with stretchable denim for all-day comfort." },
  { id:4, name:"Nike Shoes", category:"footwear", price:4500, img:"images/nikeshoes.jpg", desc:"Authentic Nike running shoes with breathable mesh and cushioned sole." },
  { id:5, name:"Formal Blazer", category:"men", price:5200, img:"images/blazer.jpg", desc:"Tailored blazer with sharp, elegant cut for formal occasions." },
  { id:6, name:"Watch", category:"accessories", price:5000, img:"images/watch.jpg", desc:"Premium wristwatch with stainless steel strap and water resistance." },
  { id:7, name:"Women's Dress", category:"women", price:2500, img:"images/dress.jpg", desc:"Trendy women’s dress with soft fabric and floral patterns." },
  { id:8, name:"Heels", category:"footwear", price:2800, img:"images/heels.jpg", desc:"Elegant high heels with cushioned sole and sturdy heel." },
  { id:9, name:"Lipstick", category:"cosmetics", price:800, img:"images/lipstick.jpg", desc:"Long-lasting matte lipstick enriched with hydrating ingredients." },
  { id:10, name:"Face Cream", category:"women", price:1500, img:"images/facecream.jpg", desc:"Moisturizing face cream enriched with vitamins and natural extracts." },
  { id:11, name:"Handbag", category:"accessories", price:3200, img:"images/handbag.jpg", desc:"Spacious leather handbag with multiple compartments." },
  { id:12, name:"Saree", category:"women", price:3800, img:"images/saree.jpg", desc:"Elegant silk saree with intricate embroidery." },
  { id:13, name:"Kurti", category:"women", price:1700, img:"images/kurti.jpg", desc:"Comfortable cotton kurti with chic prints." },
  { id:14, name:"Kids T-Shirt", category:"kids", price:1200, img:"images/kidstshirt.jpg", desc:"Soft and colorful cotton T-shirt for kids." },
  { id:15, name:"Kids Shorts", category:"kids", price:900, img:"images/kidsshort.jpg", desc:"Lightweight and durable shorts made for active kids." },
  { id:16, name:"Kids Sneakers", category:"footwear", price:1800, img:"images/kidsshoes.jpg", desc:"Trendy sneakers for kids with cushioned insoles." },
  { id:17, name:"Sports Shoes", category:"footwear", price:3000, img:"images/sportsshoe.jpg", desc:"Durable sports shoes ideal for gym and running." },
  { id:18, name:"Sandals", category:"footwear", price:1400, img:"images/sandals.jpg", desc:"Lightweight sandals with soft straps and cushioned sole." },
  { id:19, name:"Foundation", category:"cosmetics", price:1100, img:"images/foundation.jpg", desc:"Full-coverage foundation with smooth finish." },
  { id:20, name:"Mascara", category:"cosmetics", price:950, img:"images/mascara.jpg", desc:"Waterproof mascara that lengthens and volumizes lashes." },
  { id:21, name:"Moisturizer", category:"skincare", price:1600, img:"images/moisturiser.jpg", desc:"Hydrating moisturizer infused with aloe vera and vitamin E." },
  { id:22, name:"Sunscreen", category:"skincare", price:1300, img:"images/sunscreen.jpg", desc:"SPF 50 sunscreen with lightweight non-greasy formula." },
  { id:23, name:"Sunglasses", category:"accessories", price:2100, img:"images/sunglasses.jpg", desc:"Trendy UV-protected sunglasses." },
  { id:24, name:"Necklace", category:"accessories", price:3500, img:"images/necklace.jpg", desc:"Elegant gold-plated necklace with fine craftsmanship." },
  { id:25, name:"Cap", category:"accessories", price:800, img:"images/cap.jpg", desc:"Casual cotton baseball cap with adjustable fit." }
];

/* ====== Globals ====== */
let cart = JSON.parse(localStorage.getItem("cartItems")) || [];
let generatedOTP = null;
let isOtpVerified = false;
let currentFilter = "all";

/* ====== Helper Functions ====== */
function saveCart() {
  localStorage.setItem("cartItems", JSON.stringify(cart));
  updateCartCount();
}
function updateCartCount() {
  const el = document.getElementById("cart-count");
  if (el) el.innerText = cart.reduce((s, i) => s + (i.qty || 1), 0);
}

/* ====== Product Rendering ====== */
function initSite() {
  renderProducts();        // ✅ This builds the product grid
  updateCartCount();       // ✅ Updates bag count
  initHeroSlider();        // ✅ Starts hero video
}

function applyFilter(cat, e) {
  if (e) e.preventDefault();
  currentFilter = cat;
  document.querySelectorAll(".nav-menu a").forEach(a => a.classList.remove("active"));
  if (e?.target) e.target.classList.add("active");
  renderProducts();
}
function renderProducts() {
  const grid = document.getElementById("product-grid");
  if (!grid) return;
  const q = (document.getElementById("search")?.value || "").toLowerCase();
  grid.innerHTML = "";

  const list = products.filter(p => {
    const matchCategory = currentFilter === "all" || p.category === currentFilter;
    const matchSearch = p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q);
    return matchCategory && matchSearch;
  });

  if (!list.length) {
    grid.innerHTML = `<p style="text-align:center;color:#777;">No products found.</p>`;
    return;
  }

  list.forEach(p => {
    const div = document.createElement("div");
    div.className = "product-card";
    const discount = Math.floor(Math.random() * 30) + 10;
    div.innerHTML = `
      <div class="product-img-wrapper" onclick="openQuickView(${p.id})">
        <img src="${p.img}" alt="${p.name}">
        <span class="discount-tag">${discount}% OFF</span>
        <button class="add-btn" onclick="openQuickView(${p.id}); event.stopPropagation();">Quick View</button>
      </div>
      <div style="padding-top:8px;">
        <div class="brand">Lilac & Loom</div>
        <h3 class="pname">${p.name}</h3>
        <div class="rating">⭐ 4.${Math.floor(Math.random()*5)} | ${Math.floor(100+Math.random()*400)} ratings</div>
        <div class="price">₹${p.price}</div>
      </div>`;
    grid.appendChild(div);
  });
}

/* ====== Quick View Modal ====== */
let quickViewProduct = null;
function openQuickView(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  quickViewProduct = { ...p };

  document.getElementById("qvImage").src = p.img;
  document.getElementById("qvName").innerText = p.name;
  document.getElementById("qvPrice").innerText = p.price;
  document.getElementById("qvDesc").innerText = p.desc;
  document.getElementById("qvOldPrice").innerText = "₹" + Math.round(p.price * 1.15);
  document.getElementById("qvStars").innerText = "4.5";

  const extras = document.getElementById("qvExtras");
  extras.innerHTML = "";
  if (["men", "women", "kids"].includes(p.category)) {
    extras.innerHTML = `<label>Size:<select id="selectedSize"><option>S</option><option>M</option><option>L</option><option>XL</option></select></label>
                        <label>Qty:<input id="selectedQty" type="number" value="1" min="1"></label>`;
  } else if (p.category === "footwear") {
    extras.innerHTML = `<label>Size:<select id="selectedSize"><option>6</option><option>7</option><option>8</option><option>9</option><option>10</option></select></label>
                        <label>Qty:<input id="selectedQty" type="number" value="1" min="1"></label>`;
  } else {
    extras.innerHTML = `<label>Qty:<input id="selectedQty" type="number" value="1" min="1"></label>`;
  }

// === Size Chart availability check ===
const name = p.name.toLowerCase();
const cat = p.category.toLowerCase();
const showChart = cat.includes("footwear") || cat.includes("men") || cat.includes("women") ||
  cat.includes("kids") || name.includes("shirt") || name.includes("jeans") ||
  name.includes("tshirt") || name.includes("kurta") || name.includes("dress") ||
  name.includes("shoe") || name.includes("sneaker") || name.includes("heel");

// The "View size chart" link is already in HTML, so nothing else needed


  const modal = document.getElementById("quickViewModal");
  modal.classList.add("active");
  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
}
function closeQuickView() {
  const modal = document.getElementById("quickViewModal");
  modal.classList.remove("active");
  modal.style.display = "none";
  document.body.style.overflow = "auto";
}
function showSizeChart() {
  const name = document.getElementById("qvName").innerText.toLowerCase();
  const box = document.getElementById("sizeChartPanel");  // ✅ Corrected ID
  const title = document.getElementById("chartTitle");
  const table = document.getElementById("chartTable");

  // ✅ Toggle the slide-in panel
  const isActive = box.classList.toggle("active");
  box.setAttribute("aria-hidden", !isActive);

  if (!isActive) return; // if closed, stop

  // ✅ Clothing chart
  if (name.includes("shirt") || name.includes("tshirt") || name.includes("jeans") ||
      name.includes("kurta") || name.includes("dress")) {
    title.innerText = "Clothing Size Chart";
    table.innerHTML = `
      <tr><th>Size</th><th>Chest (in)</th><th>Waist (in)</th><th>Hip (in)</th></tr>
      <tr><td>XS</td><td>34</td><td>28</td><td>36</td></tr>
      <tr><td>S</td><td>36</td><td>30</td><td>38</td></tr>
      <tr><td>M</td><td>38</td><td>32</td><td>40</td></tr>
      <tr><td>L</td><td>40</td><td>34</td><td>42</td></tr>
      <tr><td>XL</td><td>42</td><td>36</td><td>44</td></tr>
      <tr><td>XXL</td><td>44</td><td>38</td><td>46</td></tr>`;
  }
  // ✅ Footwear chart
  else if (name.includes("shoe") || name.includes("sneaker") || name.includes("heel") || name.includes("footwear")) {
    title.innerText = "Shoe Size Chart";
    table.innerHTML = `
      <tr><th>UK</th><th>US</th><th>EU</th><th>Foot Length (cm)</th></tr>
      <tr><td>5</td><td>6</td><td>39</td><td>24.7</td></tr>
      <tr><td>6</td><td>7</td><td>40</td><td>25.3</td></tr>
      <tr><td>7</td><td>8</td><td>41</td><td>26.0</td></tr>
      <tr><td>8</td><td>9</td><td>42</td><td>26.7</td></tr>
      <tr><td>9</td><td>10</td><td>43</td><td>27.3</td></tr>
      <tr><td>10</td><td>11</td><td>44</td><td>28.0</td></tr>`;
  }
}


function closeSizeChart() {
  const panel = document.getElementById("sizeChartPanel");
  panel.classList.remove("active");
  panel.setAttribute("aria-hidden", "true");
}

/* ====== Cart ====== */
function addToCartFromModal() {
  if (!quickViewProduct) return;
  const size = document.getElementById("selectedSize")?.value || null;
  const qty = parseInt(document.getElementById("selectedQty")?.value || 1);
  const existing = cart.find(c => c.id === quickViewProduct.id && c.size === size);
  if (existing) existing.qty += qty;
  else cart.push({ ...quickViewProduct, size, qty });
  saveCart();
  alert(`${quickViewProduct.name} added to cart`);
  closeQuickView();
}
function openCart() {
  const modal = document.getElementById("cartModal");
  cart = JSON.parse(localStorage.getItem("cartItems")) || [];
  renderCartItems();
  modal.classList.add("active");
}
function closeCart() {
  document.getElementById("cartModal").classList.remove("active");
}
function renderCartItems() {
  const container = document.getElementById("cartItemsContainer");
  if (!container) return;
  container.innerHTML = "";
  if (cart.length === 0) {
    container.innerHTML = `<p style="text-align:center; color:#666;">Your bag is empty.</p>`;
    return;
  }
  let total = 0;
  cart.forEach((item, index) => {
    const sub = item.price * item.qty;
    total += sub;
    container.innerHTML += `
      <div class="cart-item">
        <img src="${item.img}" alt="${item.name}" class="cart-thumb">
        <div class="cart-item-details">
          <h4>${item.name}</h4>
          ${item.size ? `<p>Size: ${item.size}</p>` : ""}
          <p>₹${item.price} × ${item.qty} = ₹${sub}</p>
          <div class="cart-item-actions">
            <button onclick="changeQty(${index}, -1)">−</button>
            <span>${item.qty}</span>
            <button onclick="changeQty(${index}, 1)">+</button>
            <button class="remove-btn" onclick="removeCartItem(${index})">Remove</button>
          </div>
        </div>
      </div>`;
  });
  container.innerHTML += `<div class="cart-total" style="margin-top:10px; font-weight:600;">Total: ₹${total}</div>`;
}
function changeQty(i, d) {
  cart[i].qty = Math.max(1, cart[i].qty + d);
  saveCart(); renderCartItems();
}
function removeCartItem(i) {
  cart.splice(i, 1); saveCart(); renderCartItems();
}
function clearCart() {
  cart = []; saveCart(); renderCartItems(); closeCart(); window.location.href = "index.html";
}
function proceedToCheckout() {
  if (cart.length === 0) return alert("Your bag is empty.");
  localStorage.setItem("cartItems", JSON.stringify(cart));
  window.location.href = "checkout.html";
}
function showPaymentFields() {
  const selected = document.querySelector('input[name="payment"]:checked').value;
  const box = document.getElementById("paymentFields");

  if (selected === "card") {
    box.innerHTML = `
      <div class="field-row">
        <label>Card Number</label>
        <input type="text" maxlength="16" placeholder="1234 5678 9012 3456">
      </div>
      <div class="field-row">
        <label>Cardholder Name</label>
        <input type="text" placeholder="Full Name on Card">
      </div>
      <div class="field-row grid-2">
        <div>
          <label>Expiry Date</label>
          <input type="text" placeholder="MM/YY" maxlength="5">
        </div>
        <div>
          <label>CVV</label>
          <input type="password" maxlength="3" placeholder="***">
        </div>
      </div>`;
  } 
  else if (selected === "upi") {
    box.innerHTML = `
      <div class="field-row">
        <label>UPI ID</label>
        <input type="text" placeholder="example@upi">
      </div>`;
  } 
  else if (selected === "netbanking") {
    box.innerHTML = `
      <div class="field-row">
        <label>Select Bank</label>
        <select>
          <option>SBI</option>
          <option>HDFC</option>
          <option>ICICI</option>
          <option>Axis</option>
          <option>Kotak</option>
        </select>
      </div>`;
  } 
  else {
    box.innerHTML = `<p class="cod-note">💵 Pay with cash once your order is delivered.</p>`;
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const path = location.pathname;
  if (path.endsWith("index.html") || path.endsWith("/")) initSite();
  else if (path.endsWith("checkout.html")) {
    cart = JSON.parse(localStorage.getItem("cartItems")) || [];
    renderOrderSummaryOnLoad?.();
    updateCartCount();
  } else if (path.endsWith("delivery.html")) initDeliveryPage();
});

/// ====== OTP System (Visible + Random + Auto-Hide) ======
function sendOTP(showDummy = false) {
  const phone = document.getElementById('custPhone')?.value.trim();
  if (!phone || phone.length !== 10) {
    alert('Please enter a valid 10-digit mobile number');
    return;
  }

  // Generate random OTP
  generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
  isOtpVerified = false;

  // Show OTP visually on screen (for demo/testing)
  const otpDisplay = document.getElementById('otpDisplay');
  if (otpDisplay) {
    otpDisplay.innerText = `Your OTP: ${generatedOTP}`;
    otpDisplay.style.display = 'block';
    otpDisplay.style.fontWeight = '600';
    otpDisplay.style.color = '#6d28d9';
    otpDisplay.style.marginTop = '10px';
    otpDisplay.style.transition = 'opacity 0.5s ease';

    // Auto-hide OTP after 10 seconds
    setTimeout(() => {
      otpDisplay.style.opacity = '0';
      setTimeout(() => {
        otpDisplay.style.display = 'none';
        otpDisplay.style.opacity = '1';
      }, 500);
    }, 10000);
  }

  // ✅ Open OTP modal properly
  const modal = document.getElementById('otpModal');
  if (modal) {
    modal.classList.add('active');
    modal.style.display = 'flex';
    modal.style.visibility = 'visible';
    modal.style.opacity = '1';
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // prevent background scroll
  }

  // Reset OTP input boxes
  ['otp1', 'otp2', 'otp3', 'otp4', 'otp5', 'otp6'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });

  // Clear any old status messages
  const statusEl = document.getElementById('otpStatus');
  if (statusEl) statusEl.innerText = '';

  // Focus the first input automatically
  const first = document.getElementById('otp1');
  if (first) first.focus();
}

// ====== Move to next OTP box ======
function moveNext(current, nextId) {
  current.value = current.value.replace(/[^0-9]/g, '').slice(0, 1);
  if (current.value.length === 1 && nextId) {
    const next = document.getElementById(nextId);
    if (next) next.focus();
  }
}

// ====== Verify OTP ======
function verifyOTP() {
  const entered = ['otp1', 'otp2', 'otp3', 'otp4', 'otp5', 'otp6']
    .map(id => (document.getElementById(id)?.value || ''))
    .join('');

  const statusEl = document.getElementById('otpStatus');
  if (!statusEl) return;

  if (entered.length < 6) {
    statusEl.style.color = 'red';
    statusEl.innerText = '❌ Please enter the full 6-digit OTP.';
    return;
  }

  if (entered === generatedOTP) {
    isOtpVerified = true;
    statusEl.style.color = 'green';
    statusEl.innerText = '✅ OTP Verified Successfully!';

    setTimeout(() => {
      const modal = document.getElementById('otpModal');
      if (modal) {
        modal.classList.remove('active');
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = 'auto';
      }
    }, 1000);
  } else {
    isOtpVerified = false;
    statusEl.style.color = 'red';
    statusEl.innerText = '❌ Incorrect OTP. Try again.';
  }
}

// ====== Close OTP Modal (for close button) ======
function closeOtpModal() {
  const modal = document.getElementById('otpModal');
  if (modal) {
    modal.classList.remove('active');
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
  }
  document.body.style.overflow = 'auto';
}

  // ✅ Create an invoice object
  const orderData = {
    id: 'LL' + Math.floor(100000 + Math.random() * 900000),
    date: new Date().toISOString(),
    name,
    address,
    items: cart.map(item => ({
      name: item.name,
      qty: item.qty,
      price: item.price,
      img: item.img
    }))
  };

  // Save for invoice page
  localStorage.setItem('invoiceData', JSON.stringify(orderData));

  // Clear cart after order
  localStorage.removeItem('cartItems');

  alert('🎉 Order placed successfully! Redirecting to invoice...');
  window.location.href = 'invoice.html';

function renderOrderSummaryOnLoad() {
  const box = document.getElementById('orderSummary');
  const totalEl = document.getElementById('summaryTotal');
  if (!box || !cart.length) { box.innerHTML = '<p>Your cart is empty.</p>'; return; }
  let html = '', total = 0;
  cart.forEach(i => { const s = i.price * i.qty; total += s;
    html += `<div class="summary-item"><p>${i.name} (${i.qty})</p><p>₹${s}</p></div>`; });
  box.innerHTML = html; totalEl.innerHTML = `<h4>Total: ₹${total}</h4>`;
}
function initDeliveryPage() {
  const steps = ['step1','step2','step3','step4','step5']; let i = 0;
  const msg = document.getElementById('statusMsg');
  const interval = setInterval(() => {
    if (i < steps.length) {
      document.getElementById(steps[i]).classList.add('active');
      msg.innerText = `Order ${['Placed','Packed','Shipped','Out for Delivery','Delivered'][i]}`;
      i++;
    } else clearInterval(interval);
  }, 2000);
}

/* ====== Auto Init ====== */
document.addEventListener("DOMContentLoaded", () => {
  const path = location.pathname;
  if (path.endsWith("index.html") || path.endsWith("/")) initSite();
  else if (path.endsWith("checkout.html")) {
    cart = JSON.parse(localStorage.getItem("cartItems")) || [];
    renderOrderSummaryOnLoad?.(); updateCartCount();
  } else if (path.endsWith("delivery.html")) initDeliveryPage();
});

/* ===== Enhanced Cart Interactions ===== */
document.addEventListener("click", e => {
  const modal = document.getElementById("cartModal");
  const content = document.querySelector(".cart-modal-content");
  if (modal?.classList.contains("active") && !content.contains(e.target) && !e.target.closest(".bag-btn"))
    closeCart();
});
function closeSizeChart() {
  const box = document.getElementById("sizeChartPanel");
  box.classList.remove("active");
  box.setAttribute("aria-hidden", true);
}
