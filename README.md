# BackendDesafio1
 
 
// Crear una clase llamada ProductManager que permita agregar productos al arreglo de productos, obtener todos los productos y buscar un producto por su ID.
// La clase ProductManager debe tener un arreglo de productos y un ID autoincrementable.
// Cada producto debe tener un ID, título, descripción, precio, thumbnail (URL de la imagen) y código de producto.
// El código del producto debe ser único.
// La clase debe tener los métodos:
// addProduct(product): Agrega un producto al arreglo de productos y devuelve el producto con el ID asignado.
// getProducts(): Devuelve el arreglo de productos.
// getProductById(id): Busca un producto por su ID y lo devuelve. Si no lo encuentra, devuelve null.
// Se incluye un test.

# BackendDesafio2
El archivo ProductManager.js contiene una implementación en Node.js para la gestión de productos, diseñada para manejar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre un conjunto de productos almacenados en un archivo JSON. A continuación, se describe la funcionalidad proporcionada por ProductManager.js y cómo utilizarlo en tu proyecto.

Características
Almacenamiento Basado en Archivos: Los productos se almacenan en un archivo JSON, lo que facilita la persistencia de datos sin necesidad de una base de datos compleja.
Asincronía: Todas las operaciones de lectura y escritura en el archivo son asíncronas, lo que mejora el rendimiento y la escalabilidad de la aplicación.
IDs Autoincrementables: Los productos se identifican mediante un ID único que se autoincrementa automáticamente cada vez que se agrega un nuevo producto, asegurando la unicidad de los identificadores.
Validación de Entrada: Antes de agregar un nuevo producto, se valida la presencia de todos los campos requeridos para evitar la inserción de datos incompletos.
Métodos
Constructor: Recibe la ruta al archivo JSON donde se almacenarán los productos y lo inicializa.
init: Carga los productos existentes desde el archivo JSON y actualiza el ID máximo para continuar el autoincremento desde el último valor.
addProduct: Agrega un nuevo producto al archivo JSON, asegurándose de que todos los campos requeridos estén presentes y que el código del producto no se duplique.
getProducts: Devuelve una lista de todos los productos almacenados.
getProductById: Obtiene un producto específico por su ID.
updateProduct: Actualiza los detalles de un producto existente por su ID.
deleteProduct: Elimina un producto por su ID.
Uso
Inicialización: Crea una instancia de ProductManager proporcionando la ruta al archivo JSON de productos.
Cargar Productos: Llama al método init para cargar los productos existentes.
Gestionar Productos: Utiliza los métodos addProduct, getProducts, getProductById, updateProduct, y deleteProduct para gestionar los productos según sea necesario.
