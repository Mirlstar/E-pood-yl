import { getCart, getTotal, updateCartView } from "./cart.js";
import { navigate } from "./router.js";
import { loadCategoryView } from "./categoryView.js";

//laeb ostukoorvii vaate
export const loadCartView = () => {
    const cart = getCart();
    const mainContent = document.getElementById("product-list");
    mainContent.innerHTML = "";

    const cartSection = document.createElement("div");
    cartSection.innerHTML = "<h2>Ostukorv</h2>";// ostukorvi tekst
    const cartItemsContainer = document.createElement("div");
    cartItemsContainer.id = "cart-items";
    cartSection.appendChild(cartItemsContainer);
    mainContent.appendChild(cartSection);

    //kontrolli kas ostukorv tühi
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Ostukorv on tühi.</p>";
        return;
    }

    //arvuta ostukorvi kogusumma
    const total = getTotal();
    mainContent.innerHTML += `<p>Kogusumma: ${total} €</p>`;
    updateCartView();

    //tagasi minemise nupp
    const backButton = document.createElement("button");
    backButton.textContent = "Tagasi";
    backButton.onclick = () => {
        loadCategoryView("default"); //lae kategooria vaade
        navigate("category");
    };
    mainContent.appendChild(backButton);
};