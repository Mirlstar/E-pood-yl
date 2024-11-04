import { fetchProductById } from "./api.js";
import { Product } from "./product.js";
import { addToCart } from "./shoppingCart.js";
import { navigate } from "./router.js";

export const displayProduct = async (productId) => {
    const productData = await fetchProductById(productId)
    // fetchin tooted kategooriate järgi
    // püüan kinni domist divi kuhu sisse hakkan asju laduma
    const mainBox = document.getElementById("mainBox")
    mainBox.innerHTML = ""; //tühjendab ära mainBoxi
    //loon järgmise forEachi sisse ühe kategooria kaardi mida ma lisan eelnevalt kinni püütud domi konteinerisse
    const product = new Product(
        productData.id,
        productData.title,
        productData.price,
        productData.description,
        productData.image
    );
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');
    productDiv.innerHTML = `
        <h3>${product.name}</h3>
        <p>Hind: ${product.price}€</p>
        <p id="${product.name}-stock">Laoseis: ${product.quantity} tk</p>
    `;
    const button = document.createElement("button");
    button.classList.add("addToCart");
    button.innerHTML = "Lisa ostukorvi"
    button.onclick = (e) => { e.stopPropagation(); addToCart(product.name, 1) }
    productDiv.append(button);

    productDiv.onclick = () => navigate("product", product.id)
    mainBox.append(productDiv);
    //
}

