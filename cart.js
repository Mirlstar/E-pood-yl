import { Product } from "./product.js";
import inventoryInstance from "./inventory.js";
import { loadCartView } from "./cartView.js";

let cart = [];

export const getCart = () => {
    return cart;
};
//lisab toote ostukorvi
export const addToCart = (product) => {
    //kontrollib toote laoseisu
    if (inventoryInstance.isAvailable(product.id)) {
        const existingProduct = cart.find((item) => item.id === product.id);
        if (existingProduct) {
            //kui toode juba olemas siis suurendab kogust
            existingProduct.quantity++;
        } else {
            //kui toodet pole lisame uue
            cart.push({ ...product, quantity: 1 });
        }
        inventoryInstance.reduceStock(product.id);
        //vähendab laoseisu
    } else {
        //kui toodet pole ss error message
        alert("Toode ei ole laos saadaval!");
    }
};
//eemaldab toote
export const removeFromCart = (product) => {

    cart = cart.filter((item) => item.id !== product.id);

    const productInstance = new Product(
        product.id,
        product.title,
        product.price,
        product.description,
        product.image
    );
    //lisab toote tagasi laoseisu
    inventoryInstance.addProduct(productInstance, product.quantity);
    loadCartView();
};

// uuendab ostukorvi kogust
export const updateCartItemQuantity = (productId, newQuantity) => {
    const product = cart.find((item) => item.id === productId);
    if (product) {
        product.quantity = newQuantity > 0 ? newQuantity : 1; // Vähemalt 1 toode

        loadCartView();
    }
};

export const updateCartView = () => {
    const cartItemsContainer = document.getElementById("cart-items");
    cartItemsContainer.innerHTML = "";
    cart.forEach((item) => {
        const cartItem = document.createElement("div");
        //kuvab toote nime hinna laoseisu
        cartItem.innerHTML = `
      <h3>${item.title}</h3>
      <p>Hind: ${item.price} €</p>
      <p>Laos: ${inventoryInstance.getStock(item.id)} ühikut</p>
    `;

        //koguse sisestamine
        const quantityContainer = document.createElement("div");
        quantityContainer.className = "quantity-container";
        //koguse vähendamine
        const decreaseButton = document.createElement("button");
        decreaseButton.textContent = "-";
        decreaseButton.onclick = () =>
            updateCartItemQuantity(item.id, item.quantity - 1);
        //koguse sisestamise väli 
        const quantityInput = document.createElement("input");
        quantityInput.type = "number";
        quantityInput.value = item.quantity;
        quantityInput.min = 1;
        quantityInput.onchange = (e) =>
            updateCartItemQuantity(item.id, parseInt(e.target.value));
        //koguse suurendamine
        const increaseButton = document.createElement("button");
        increaseButton.textContent = "+";
        increaseButton.onclick = () =>
            updateCartItemQuantity(item.id, item.quantity + 1);

        quantityContainer.appendChild(decreaseButton);
        quantityContainer.appendChild(quantityInput);
        quantityContainer.appendChild(increaseButton);

        cartItem.appendChild(quantityContainer);

        // Eemaldamisnupp toote ostukorvist eemaldamiseks
        const removeButton = document.createElement("button");
        removeButton.textContent = "Eemalda";
        removeButton.onclick = () => removeFromCart(item);

        cartItem.appendChild(removeButton);
        cartItemsContainer.appendChild(cartItem);
    });
};
//arvutab ostukorvi kogusumma
export const getTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
};



//export const addToCart = function (product) {
// console.log("add to cart")
//if (inventory.checkStock(product.name, 1)) {
//cart.addItem(product);
//inventory.reduceStock(productName, 1);
//updateCartDisplay();
// updateProductStockDisplay(productName);
//} else {
//showAlert(`Laoseis pole piisav. Saadaval on ainult ${product.quantity} tk.`);
//}
//};



