export class ShoppingCart {
    constructor() {
        this.items = [];
    }

    addItem(product, quantity) {
        const existingItem = this.items.find(item => item.product.name === product.name);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({ product, quantity });
        }
    }

    removeItem(productName) {
        this.items = this.items.filter(item => item.product.name !== productName);
    }

    updateQuantity(productName, quantity) {
        const item = this.items.find(item => item.product.name === productName);
        if (item) {
            item.quantity = quantity;
        }
    }

    getTotal() {
        return this.items.reduce((total, item) => total + item.product.price * item.quantity, 0);
    }

    listItems() {
        return this.items.map(item => `
            <div>
                ${item.product.name} - 
                <input type="number" value="${item.quantity}" min="1" onchange="updateCartQuantity('${item.product.name}', this.value)">
                tk
                <button onclick="removeFromCart('${item.product.name}')">Eemalda</button>
            </div>
        `).join('');
    }
}



