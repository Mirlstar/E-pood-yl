import { Product } from './product.js';
import { ShoppingCart } from './shoppingCart.js';
import { Inventory } from './inventory.js';

// Create inventory and products
const inventory = new Inventory();
inventory.addProduct(new Product('Arvuti', 1000, 5));
inventory.addProduct(new Product('Telefon', 600, 10));
inventory.addProduct(new Product('Kõrvaklapid', 100, 15));
inventory.addProduct(new Product('Õhufritüür', 200, 5));
inventory.addProduct(new Product('Tahvelarvuti', 50, 20));
inventory.addProduct(new Product('Kõlar', 200, 10));

// Create shopping cart
const cart = new ShoppingCart();

// Render products in the store
function renderProducts() {
    const productContainer = document.getElementById('products');
    productContainer.innerHTML = ''; // Clear the container
    inventory.products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <p>Hind: ${product.price}€</p>
            <p id="${product.name}-stock">Laoseis: ${product.quantity} tk</p>
            <button onclick="addToCart('${product.name}', 1)">Lisa ostukorvi</button>
        `;
        productContainer.appendChild(productDiv);
    });
}

// Add product to the cart
window.addToCart = function (productName, quantity) {
    const product = inventory.getProduct(productName);
    if (inventory.checkStock(productName, quantity)) {
        cart.addItem(product, quantity);
        inventory.reduceStock(productName, quantity);
        updateCartDisplay();
        updateProductStockDisplay(productName);
    } else {
        alert(`Laoseis pole piisav. Saadaval on ainult ${product.quantity} tk.`);
    }
};

// Update product stock display
function updateProductStockDisplay(productName) {
    const product = inventory.getProduct(productName);
    document.getElementById(`${productName}-stock`).textContent = `Laoseis: ${product.quantity} tk`;
}

// Update cart display
function updateCartDisplay() {
    const cartItemsDiv = document.getElementById('cart-items');
    cartItemsDiv.innerHTML = cart.listItems();
    document.getElementById('total-cost').textContent = `Kogusumma: ${cart.getTotal()}€`;
}

// Remove item from the cart
window.removeFromCart = function (productName) {
    const item = cart.items.find(item => item.product.name === productName);
    if (item) {
        cart.removeItem(productName);
        inventory.increaseStock(productName, item.quantity);
        updateCartDisplay();
        updateProductStockDisplay(productName);
    }
};

// Updated function to order more stock for out-of-stock items only
window.orderMoreStock = function () {
    const restockAmount = 5; // Define the amount to restock each out-of-stock product by
    const outOfStockProducts = inventory.products.filter(product => product.quantity === 0);

    if (outOfStockProducts.length > 0) {
        inventory.restockOutOfStockProducts(restockAmount);
        outOfStockProducts.forEach(product => updateProductStockDisplay(product.name));
        alert(`Tellitud ${restockAmount} ühikut juurde ainult otsas olevatele toodetele.`);
    } else {
        alert("Kõik tooted on laos olemas, juurde tellimine pole vajalik.");
    }
};

// Update item quantity in the cart
window.updateCartQuantity = function (productName, quantity) {
    quantity = parseInt(quantity);
    const product = inventory.getProduct(productName);
    const cartItem = cart.items.find(item => item.product.name === productName);
    const difference = quantity - cartItem.quantity;

    if (difference > 0 && inventory.checkStock(productName, difference)) {
        inventory.reduceStock(productName, difference);
        cart.updateQuantity(productName, quantity);
    } else if (difference < 0) {
        inventory.increaseStock(productName, Math.abs(difference));
        cart.updateQuantity(productName, quantity);
    } else {
        alert(`Laoseis pole piisav. Saadaval on ainult ${product.quantity} tk.`);
    }
    updateCartDisplay();
    updateProductStockDisplay(productName);
};

// Clear the cart
window.clearCart = function () {
    cart.items.forEach(item => {
        inventory.increaseStock(item.product.name, item.quantity);
    });
    cart.items = [];
    updateCartDisplay();
    renderProducts();
};

// Initial rendering
renderProducts();
updateCartDisplay();

















//Mooduli näited

// ES6 Module = An external file that contains reusable code
//              that can be imported into other JavaScript files
//              Can contain variables, classes, functions ... and more
//              Introduced as part of ECMAScript 2015 update

//pmst saad teha eraldi koodijupikese ja siis nagu saata ta edasi teise faili kasutamiseks, saad saata mitmesse eri faili korraga
// --------- index.js ---------

/*import {PI, getCircumference, getArea, getVolume} from './mathUtil.js';

console.log(PI);
const circumference = getCircumference(10);
const area = getArea(10);
const volume = getVolume(10);

console.log(`${circumference.toFixed(2)}cm`);
console.log(`${area.toFixed(2)}cm^2`);
console.log(`${volume.toFixed(2)}cm^3`);

// --------- mathutil.js ---------

export const PI = 3.14159;

export function getCircumference(radius){
    return 2 * PI * radius;
}

export function getArea(radius){
    return PI * radius * radius;
}

export function getVolume(radius){
    return 4 * PI * radius * radius;
}*/