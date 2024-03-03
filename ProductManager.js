// Importar el módulo fs.promises
const fs = require('fs').promises;

class ProductManager {
    constructor(filePath) {
        this.path = filePath;
        this.products = []; // Inicializar productos aquí para evitar el error
    }

    static lastId = 0; // Para generar IDs autoincrementables

    async init() {
        try {
            const data = await fs.readFile(this.path, 'utf8');
            this.products = JSON.parse(data);
            // Actualiza lastId basado en el producto con el ID más alto para mantener la consistencia
            const maxId = this.products.reduce((max, product) => product.id > max ? product.id : max, 0);
            ProductManager.lastId = maxId;
        } catch (error) {
            console.error("Error initializing products:", error);
            this.products = [];
        }
    }

    async addProduct({ title, description, price, thumbnail, code, stock }) {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            throw new Error('Todos los campos son requeridos');
        }

        if (this.products.some(product => product.code === code)) {
            throw new Error('El código del producto ya existe');
        }

        const newProduct = { id: ++ProductManager.lastId, title, description, price, thumbnail, code, stock };
        this.products.push(newProduct);
        await fs.writeFile(this.path, JSON.stringify(this.products, null, 2));
        return newProduct;
    }

    async getProducts() {
        return this.products; // Devuelve los productos en memoria para evitar lectura constante del archivo
    }

    async getProductById(id) {
        const product = this.products.find(product => product.id === id);
        if (!product) {
            throw new Error('Producto no encontrado');
        }
        return product;
    }

    async updateProduct(id, updatedProduct) {
        const productIndex = this.products.findIndex(product => product.id === id);
        if (productIndex === -1) {
            throw new Error('Producto no encontrado');
        }

        // Asegurar que el ID no se modifique
        this.products[productIndex] = { ...this.products[productIndex], ...updatedProduct, id };
        await fs.writeFile(this.path, JSON.stringify(this.products, null, 2));
        return this.products[productIndex];
    }

    async deleteProduct(id) {
        const productIndex = this.products.findIndex(product => product.id === id);
        if (productIndex === -1) {
            throw new Error('Producto no encontrado');
        }

        this.products.splice(productIndex, 1);
        await fs.writeFile(this.path, JSON.stringify(this.products, null, 2));
    }
}

// Función principal async para manejar las operaciones asíncronas correctamente
async function main() {
    const productManager = new ProductManager('./products.json');
    await productManager.init(); // Esperar a que la inicialización se complete

    // Agregar productos
    await productManager.addProduct({
        title: 'Producto 1',
        description: 'Descripción del producto 1',
        price: 100,
        thumbnail: 'https://via.placeholder.com/150',
        code: 'P1',
        stock: 100
    });

    await productManager.addProduct({
        title: 'Producto 2',
        description: 'Descripción del producto 2',
        price: 200,
        thumbnail: 'https://via.placeholder.com/150',
        code: 'P2',
        stock: 200
    });

    await productManager.addProduct({
        title: 'Producto 3',
        description: 'Descripción del producto 3',
        price: 300,
        thumbnail: 'https://via.placeholder.com/150',
        code: 'P3',
        stock: 300
    });

    await productManager.addProduct({
        title: 'Producto 4',
        description: 'Descripción del producto 4',
        price: 400,
        thumbnail: 'https://via.placeholder.com/150',
        code: 'P4',
        stock: 400
    });

    // Obtener y mostrar productos
    console.log(await productManager.getProducts());

    // Obtener y mostrar un producto por ID
    console.log(await productManager.getProductById(2));

    // Actualizar un producto y mostrar el resultado
    await productManager.updateProduct(2, {
        title: 'Producto 2 actualizado',
        description: 'Descripción del producto 2 actualizada',
        price: 250,
        thumbnail: 'https://via.placeholder.com/150',
        code: 'P2',
        stock: 250
    });
    console.log(await productManager.getProducts());

    // Eliminar un producto y mostrar el resultado
    await productManager.deleteProduct(2);
    console.log(await productManager.getProducts());

    // Continuar con las operaciones restantes de manera similar...
}

// Ejecutar la función principal
main().catch(console.error);
