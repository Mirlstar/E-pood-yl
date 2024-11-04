import { fetchCategories } from "./api.js";
import { displayAllProducts } from "./categoryView.js";
import { navigate } from "./router.js";


async function appInitializer() {
    const categories = await fetchCategories()
    const categoryMenu = document.getElementById("categoryMenu");

    categories.forEach(category => {
        const categorySection = document.createElement("li");
        categorySection.className = "categoryList";
        categorySection.innerHTML = category;
        categorySection.onclick = () => navigate("category", category)

        categoryMenu.appendChild(categorySection);
    });





    displayAllProducts(categories[0])


    const cartButton = document.getElementById("cartButton")
    cartButton.onclick = () => navigate("cart")
};

document.addEventListener("DOMContentLoaded", appInitializer);