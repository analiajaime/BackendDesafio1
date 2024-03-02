const fs = require('fs').promises;

class ProductManager {
    constructor(filePath) {
        this.path = filePath;
        this.products = [];
        this.nextId = 1;
        this.init();
    }

    async init() {
        try {
            const data = await fs.readFile(this.path, 'utf8');
            this.products = JSON.parse(data);
            this.nextId = this.products.reduce((acc, product) => Math.max(acc, product.id), 0) + 1;
        } catch (error) {
            if (error.code === 'ENOENT') {
                console.log('Archivo no encontrado. Creando uno nuevo.');
                await fs.writeFile(this.path, JSON.stringify(this.products));
            } else {
                throw error;
            }
        }
    }

    async addProduct({ title, description, price, thumbnail, code, stock }) {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            throw new Error('Todos los campos son obligatorios');
        }

        if (this.products.some(product => product.code === code)) {
            throw new Error('El código del producto ya existe');
        }

        const newProduct = { id: this.nextId++, title, description, price, thumbnail, code, stock };
        this.products.push(newProduct);
        await fs.writeFile(this.path, JSON.stringify(this.products));
        return newProduct;
    }

    async getProducts() {
        const data = await fs.readFile(this.path, 'utf8');
        return JSON.parse(data);
    }

    async getProductById(id) {
        const products = await this.getProducts();
        const product = products.find(product => product.id === id);
        if (!product) {
            throw new Error('Producto no encontrado');
        }
        return product;
    }

    async updateProduct(id, updatedProduct) {
        let products = await this.getProducts();
        const productIndex = products.findIndex(product => product.id === id);
        if (productIndex === -1) {
            throw new Error('Producto no encontrado');
        }

        // Asegurar que el ID no se modifique
        products[productIndex] = { ...products[productIndex], ...updatedProduct, id };
        await fs.writeFile(this.path, JSON.stringify(products));
        return products[productIndex];
    }

    async deleteProduct(id) {
        let products = await this.getProducts();
        const productIndex = products.findIndex(product => product.id === id);
        if (productIndex === -1) {
            throw new Error('Producto no encontrado');
        }

        products.slice(productIndex, 1);
        await fs.writeFile(this.path, JSON.stringify(products));
    }
}

module.exports = ProductManager;


