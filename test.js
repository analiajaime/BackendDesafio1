const ProductManager = require('./ProductManager'); 
const manager = new ProductManager('./products.json'); 

async function addNewProduct() {
    try {
        const newProduct = await manager.addProduct({
            title: "Producto de Ejemplo2",
            description: "Descripción del producto de ejemplo2",
            price: 100,
            thumbnail: "url/a/la/imagen/del/producto2.jpg",
            code: "codigo1243",
            stock: 10
        });
        console.log('Producto agregado:', newProduct);
    } catch (error) {
        console.error('Error al agregar el producto:', error);
    }
}

addNewProduct();
