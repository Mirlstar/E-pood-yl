//impordin vajalikud funktsioonid
import { fetchCategories, fetchProducts } from "./api.js";
import { loadCategoryView } from "./categoryView.js";
import { navigate } from "./router.js";
import inventoryInstance from "./inventory.js"
import { Product } from "./product.js";

async function initializeInventory() {
    //laadin tooted api kaudu
    const products = await fetchProducts();
    products.forEach((productData) => {
        const product = new Product(
            productData.id,
            productData.title,
            productData.price,
            productData.description,
            productData.image
        );
        //teen juhusliku laoseisu, et igal tootel oleks erinev lajääk
        const randomStock = Math.floor(Math.random() * (20 - 5) + 5);
        inventoryInstance.addProduct(product, randomStock);
    });
}


initializeInventory();

const initApp = async () => {
    const categories = await fetchCategories();
    //otsin kategooriaid
    const categoryMenu = document.getElementById("category-menu");

    categories.forEach((category) => {
        const categoryElement = document.createElement("li");
        categoryElement.textContent = category;
        //navigeerin kategooriasse
        categoryElement.onclick = () => navigate("category", category);
        categoryMenu.appendChild(categoryElement);
    });

    // Laen viimase kategooria nimekirjas 
    loadCategoryView(categories[3]);


    // teeb ostukorvi nupu funktsioneerivaks
    const cartButton = document.getElementById("go-to-cart");
    cartButton.onclick = () => navigate("cart");

};

document.addEventListener("DOMContentLoaded", initApp);