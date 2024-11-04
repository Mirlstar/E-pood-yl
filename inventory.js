export class Inventory {
    constructor() {
        this.products = [];
    }

    addProduct(product) {
        this.products.push(product);
    }

    getProduct(name) {
        return this.products.find(product => product.name === name);
    }

    // Check stock availability
    checkStock(productName, quantity) {
        const product = this.getProduct(productName);
        return product && product.quantity >= quantity;
    }

    // Reduce stock
    reduceStock(productName, quantity) {
        const product = this.getProduct(productName);
        if (this.checkStock(productName, quantity)) {
            product.quantity -= quantity;
        }
    }

    // Increase stock (when removing from cart)
    increaseStock(productName, quantity) {
        const product = this.getProduct(productName);
        product.quantity += quantity;
    }

    //  Restock method to only add stock to products with zero quantity
    restockOutOfStockProducts(amount) {
        this.products.forEach(product => {
            if (product.quantity === 0) {
                product.quantity += amount;
            }
        });
    }
}
