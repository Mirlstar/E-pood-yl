//siia tulevad kõik funkt millega fetchin erinevaid tooteid
// kõik tooted
//tooted category järgi
// ühe toote andmed
//kategooriad ainult


export async function fetchProducts() {
    try {
        let response = await fetch('https://fakestoreapi.com/products');
        let data = response.json();
        return data
    } catch (error) {
        console.error(error);
    }
}




export async function fetchProductByCategory(category) {
    try {
        let response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
        let data = response.json();
        return data
    } catch (error) {
        console.error(error);
    }
}




export async function fetchProductById(productId) {
    try {
        let response = await fetch(`https://fakestoreapi.com/products/${productId}`);
        let data = response.json();
        return data
    } catch (error) {
        console.error(error);
    }
}




export async function fetchCategories() {
    try {
        let response = await fetch('https://fakestoreapi.com/products/categories');
        let data = response.json();
        return data
    } catch (error) {
        console.error(error);
    }
}


