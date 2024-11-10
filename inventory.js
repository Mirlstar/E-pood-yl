import { Product } from "./product.js";

class Inventory {
    constructor() {

        this.stock = {};
    }

    // Lisa uus toode laoseisu kindla kogusega
    addProduct(product, quantity) {
        if (!(product instanceof Product)) {
            throw new Error("Toode peab olema Product klassi instants.");
            //kontrollib et toode oleks product classis
        }
        this.stock[product.id] = (this.stock[product.id] || 0) + quantity;
    }

    // Kontrolli, kas toode on saadaval antud koguses
    isAvailable(productId, quantity = 1) {
        return (this.stock[productId] || 0) >= quantity;
    }

    // Vähenda laoseisu pärast toote lisamist ostukorvi
    reduceStock(productId, quantity = 1) {
        if (this.isAvailable(productId, quantity)) {
            this.stock[productId] -= quantity;
        } else {
            throw new Error("Laoseis on ebapiisav.");
        }
    }

    //näitab toote laoseisu
    getStock(productId) {
        return this.stock[productId] || 0;
    }
}


const inventoryInstance = new Inventory();
export default inventoryInstance;