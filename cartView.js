import { ShoppingCart } from './shoppingCart.js';

const cart = new ShoppingCart();

export const loadCartView = () => {

    //püüan kinni domist divi kuhu sisse hakkan seda laduma ehk põhi div
    const mainBox = document.getElementById("mainBox")
    mainBox.innerHTML = "Ostukorv"; //tühjendab ära mainBoxi
    //fetchin ostukorvi sisu ja see tuleb shoppingCart constructorist
    //forEachiga ehitan üles ühe rea sisuga mida tahan shoppingCartil väljastada
    const cartItemsDiv = document.createElement('div');
    cartItemsDiv.classList.add('cart-items');
    cartItemsDiv.innerHTML = cart.listItems();
    // document.getElementById('total-cost').textContent = `Kogusumma: ${cart.getTotal()}€`;

}