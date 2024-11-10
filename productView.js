import { fetchProductById } from "./api.js";
import { addToCart } from "./cart.js";
import { navigate } from "./router.js";
import inventoryInstance from "./inventory.js";
import { Product } from "./product.js";

export const loadProductView = async (productId) => {
    const productData = await fetchProductById(productId);
    // fetchin tooted kategooriate järgi

    //loon järgmise forEachi sisse ühe kategooria kaardi mida ma lisan eelnevalt kinni püütud domi konteinerisse
    const product = new Product(
        productData.id,
        productData.title,
        productData.price,
        productData.description,
        productData.image
    );

    const productList = document.getElementById("product-list");
    productList.innerHTML = ""; // eemaldab teised tooted, et ainult õoge oleks alles

    //näitab toote andmeid
    const productDetailElement = document.createElement("div");
    productDetailElement.classList.add("product-detail");
    productDetailElement.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <h2>${product.title}</h2>
        <p>${product.description}</p>
        <p>Hind: ${product.price}€</p>
         <p>Laos: ${inventoryInstance.getStock(product.id)} ühikut</p>
        <button id="add-to-cart-${product.id}">Lisa ostukorvi</button>
        <button id="back-to-category">Tagasi kategooriasse</button>
    `;
    -productList.appendChild(productDetailElement);
    //võimaldab toote lisamist ostukorvi
    document.getElementById(`add-to-cart-${product.id}`).onclick = () => {
        addToCart(product);
        loadProductView(product.id);
    };

    // tagasi mineku nupp
    document.getElementById("back-to-category").onclick = () =>
        navigate("category");
};

