// ==========================
// تحميل السلة من التخزين
// ==========================
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ==========================
// حفظ السلة
// ==========================
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// ==========================
// إضافة منتج للسلة
// ==========================
function addToCart(name, price) {

  let existing = cart.find(item => item.name === name);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({
      name: name,
      price: price,
      quantity: 1
    });
  }

  saveCart();
  updateCartCount();
  alert("تمت إضافة المنتج للسلة");
}

// ==========================
// تحديث رقم السلة في الهيدر
// ==========================
function updateCartCount() {
  const countElement = document.getElementById("cartCount");
  if (!countElement) return;

  let totalQuantity = 0;
  cart.forEach(item => totalQuantity += item.quantity);

  countElement.textContent = totalQuantity;
}

// ==========================
// الانتقال لصفحة checkout
// ==========================
function goToCheckout() {
  window.location.href = "checkout.html";
}

// ==========================
// عرض التفاصيل (مؤقت)
// ==========================
function showDetails(name, image, price) {
  alert(name + " - السعر: " + price + " ريال");
}

// ==========================
// عرض السلة في صفحة checkout
// ==========================
function displayCheckout() {

  const container = document.getElementById("cartContainer");
  if (!container) return;

  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = "<p>السلة فارغة</p>";
    return;
  }

  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;

    container.innerHTML += `
      <div class="checkout-item">
        <p>${item.name}</p>
        <p>الكمية: ${item.quantity}</p>
        <p>السعر: ${item.price * item.quantity} ريال</p>
      </div>
    `;
  });

  container.innerHTML += `
    <div class="total">
      المجموع الكلي: ${total} ريال
    </div>
  `;
}

// ==========================
// تأكيد الطلب
// ==========================
function submitOrder(event) {
  event.preventDefault();

  if (cart.length === 0) {
    alert("السلة فارغة!");
    return;
  }

  localStorage.removeItem("cart");
  window.location.href = "thankyou.html";
}

// ==========================
// تشغيل عند تحميل الصفحة
// ==========================
updateCartCount();
displayCheckout();
