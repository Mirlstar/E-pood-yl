export class Product {
    constructor(name, price, quantity) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }

    getInfo() {
        return `Product: ${this.name}, Price: ${this.price}€, Quantity: ${this.quantity}`;
    }
}
