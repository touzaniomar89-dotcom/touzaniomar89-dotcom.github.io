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
// عرض السلة في صفحة checkout
// ==========================
function displayCheckout() {

  const container = document.getElementById("cartContainer");
  if (!container) return; // لو مو في صفحة checkout

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

  const name = document.getElementById("customerName").value;
  const phone = document.getElementById("customerPhone").value;
  const address = document.getElementById("customerAddress").value;

  if (cart.length === 0) {
    alert("السلة فارغة!");
    return;
  }

  const order = {
    customer: { name, phone, address },
    items: cart,
    date: new Date()
  };

  console.log("Order Submitted:", order);

  // تفريغ السلة
  localStorage.removeItem("cart");

  // الانتقال لصفحة الشكر
  window.location.href = "thankyou.html";
}

// ==========================
// تشغيل العرض عند تحميل الصفحة
// ==========================
displayCheckout();
