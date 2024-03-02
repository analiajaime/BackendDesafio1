//DESAFÍO ENTREGABLE NRO 1 - CLASE 2 - BACKEND CODERHOUSE


class ProductManager {
    constructor() {
        this.products = [];
        this.nextId = 1; // Inicializador para el ID autoincrementable
    }

    addProduct({ title, description, price, thumbnail, code, stock }) {
        // Validar que todos los campos sean proporcionados
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            throw new Error('Todos los campos son obligatorios');
        }

        // Validar que el código del producto no se repita
        if (this.products.some(product => product.code === code)) {
            throw new Error('El código del producto ya existe');
        }

        // Agregar el producto al arreglo con un ID autoincrementable
        const newProduct = { id: this.nextId++, title, description, price, thumbnail, code, stock };
        this.products.push(newProduct);
        return newProduct; 
    }

    getProducts() {
        // Devolver el arreglo con todos los productos
        return this.products;
    }

    getProductById(id) {
        // Buscar el producto por su ID
        const product = this.products.find(product => product.id === id);
        if (!product) {
            console.error('Not found'); 
        }
        return product;
    }
}

// TESTING DEL DESAFÍO ENTREGABLE
const manager = new ProductManager();

console.log(manager.getProducts()); 

try {
    manager.addProduct({
        title: "producto de prueba 1",
        description: "Este es un producto de prueba",
        price: 2525200,
        thumbnail: "Sin imagen, por ahora",
        code: "abc123",
        stock: 25
    });
    console.log(manager.getProducts()); 
} catch (error) {
    console.error(error.message);
}

try {
    manager.addProduct({
        title: "producto prueba 2",
        description: "Este es otro producto prueba",
        price: 300,
        thumbnail: "Sin imagen",
        code: "abc123",
        stock: 30
    });
} catch (error) {
    console.error(error.message); 
}

console.log(manager.getProductById(1)); 
console.log(manager.getProductById(999));
