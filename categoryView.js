import { fetchProductsByCategory } from "./api.js";
import { addToCart } from "./cart.js";
import { navigate } from "./router.js"; // Lisa navigeerimiseks
import { Product } from "./product.js";

export const loadCategoryView = async (category) => {
    // fetchin tooted kategooriate järgi
    // püüan kinni domist divi kuhu sisse hakkan asju laduma
    const products = await fetchProductsByCategory(category);
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";  //tühjendab ära mainboxi



    //loon järgmise forEachi sisse ühe kategooria kaardi mida ma lisan eelnevalt kinni püütud domi konteinerisse
    products.forEach((productData) => {
        const product = new Product(
            productData.id,
            productData.title,
            productData.price,
            productData.description,
            productData.image
        );
        //kuvab toodet
        const productElement = document.createElement("div");
        productElement.classList.add("product-item");
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>${product.price}€</p>
            <button id="add-to-cart-${product.id}">Lisa ostukorvi</button>
        `;

        //tootele vajutades viib tootevaatesse
        productElement.onclick = () => navigate("product", product.id);

        productList.appendChild(productElement);
        //lisab toote ostukorvi
        document.getElementById(`add-to-cart-${product.id}`).onclick = (e) => {
            e.stopPropagation();
            addToCart(product);
        };
    });
};

