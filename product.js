export class Product {
    constructor(id, title, price, description, image) {
        this.id = id;
        this.name = title;
        this.price = price;
        this.quantity = 1;
        this.description = description;
        this.image = image;
    }

    getInfo() {
        return `Product: ${this.name}, Price: ${this.price}€, Quantity: ${this.quantity}`;
    }
}
