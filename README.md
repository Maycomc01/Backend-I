API desarrollada en **Node.js + Express** para gestionar productos y carritos de compra de la tienda *JuanitaLibreria*, especializada en artículos escolares.

## 🚀 Funcionalidades

### Productos (`/api/products`)
- **GET /** → Listar todos los productos
- **GET /:pid** → Obtener producto por ID
- **POST /** → Crear un nuevo producto
- **PUT /:pid** → Actualizar producto por ID
- **DELETE /:pid** → Eliminar producto por ID

### Carritos (`/api/carts`)
- **POST /** → Crear un nuevo carrito
- **GET /:cid** → Obtener productos de un carrito por ID
- **POST /:cid/product/:pid** → Agregar producto a un carrito (incrementa cantidad si ya existe)

## 📂 Persistencia
Los datos se guardan en archivos JSON:
- `products.json` → Productos
- `carts.json` → Carritos
