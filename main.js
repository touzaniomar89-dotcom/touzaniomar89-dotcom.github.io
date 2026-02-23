// تحميل السلة من التخزين عند بداية الموقع
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// حفظ السلة
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// تحديث عداد السلة في النافبار
function updateCartCount() {
    const count = document.getElementById("cartCount");
    if (count) {
        count.innerText = cart.reduce((total, item) => total + item.quantity, 0);
    }
}

// إضافة منتج للسلة
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

    alert("تمت إضافة المنتج إلى السلة 🛒");
}

// عرض تفاصيل المنتج
function showDetails(name, img, price) {

    document.getElementById("home").classList.add("hidden");
    document.getElementById("checkoutPage").classList.add("hidden");

    const page = document.getElementById("detailsPage");
    page.classList.remove("hidden");

    page.innerHTML = `
        <img src="${img}">
        <h2>${name}</h2>
        <div class="price">${price} ر.س</div>
        <button class="add" onclick="addToCart('${name}', ${price})">أضف للسلة</button>
        <button class="details" onclick="goHome()">رجوع</button>
    `;
}

// الرجوع للرئيسية
function goHome() {
    document.getElementById("home").classList.remove("hidden");
    document.getElementById("detailsPage").classList.add("hidden");
    document.getElementById("checkoutPage").classList.add("hidden");
}

// عرض صفحة السلة
function showCheckout() {

    document.getElementById("home").classList.add("hidden");
    document.getElementById("detailsPage").classList.add("hidden");

    const page = document.getElementById("checkoutPage");
    page.classList.remove("hidden");

    if (cart.length === 0) {
        page.innerHTML = `
            <h2>السلة فارغة</h2>
            <button onclick="goHome()">رجوع</button>
        `;
        return;
    }

    let total = 0;
    let html = "<h2>السلة</h2>";

    cart.forEach((item, index) => {

        total += item.price * item.quantity;

        html += `
            <div class="checkout-item">
                ${item.name} × ${item.quantity}
                <br>
                ${item.price * item.quantity} ر.س
                <br><br>
                <button onclick="removeItem(${index})">حذف</button>
            </div>
        `;
    });

    html += `
        <div class="total">المجموع: ${total} ر.س</div>
        <br>
        <button onclick="completeOrder()">إتمام الطلب</button>
        <button onclick="goHome()">متابعة التسوق</button>
    `;

    page.innerHTML = html;
}

// حذف عنصر من السلة
function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    showCheckout();
    updateCartCount();
}

// إتمام الطلب
function completeOrder() {

    if (cart.length === 0) return;

    alert("تم إرسال الطلب بنجاح 🎉");

    localStorage.removeItem("cart");
    cart = [];

    updateCartCount();
    goHome();
}

// عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", function () {
    updateCartCount();
});
