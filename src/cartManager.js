import fs from "fs/promises";


class CartManager{
    constructor(path){
        this.path = path;
    }

    generateId = (carts) =>{
        if(carts.length >0){
            return carts[carts.length -1].id + 1;
        }else{
            return 1;
        }
    }

    async getCarts(){
        try {
            const cartsJson = await fs.readFile(this.path, "utf-8");
            const carts= JSON.parse(cartsJson);
            return carts;
        } catch (error) {
            throw new Error("No se puedo mostrar los carrito :" + error.message)
        }
    }
    async addCart(){
        try {
            const cartsJson = await fs.promises.readFile(this.path, "utf-8");
            const carts = JSON.parse(cartsJson);
            const id= this.generateId(carts);
            carts.push({id,products:[]});
            await fs.promises.writeFile(this.path, JSON.stringify(carts, null,2), "utf-8");
            return carts;
        } catch (error) {
            throw new Error("No se pudo crear el carrito: " + error.message);
        }
        
    }

    async getCartById(cartId){
        try {
            const carts= await this.getCarts();
            const cartFound = carts.find(cart=>cart.id == cartId);
            if(!cartFound) throw new Error("Carrito no encontrado");
            return cartFound;
        } catch (error) {
            throw new Error("Error al obtener el carrito por ID: " + error.message)
        }
    }
    async addProductToCart (cartId, productId){
        try {
            const carts= await this.getCarts()
            const cartIndex= carts.findIndex(cart=>cart.id == cartId);
            if(cartIndex ===-1) throw new Error("Carrito no encontrado");
            const cart= carts[cartIndex];
            const productIndex=cart.products.findIndex(p => p.product === productId);
            if(productIndex !=-1){
                cart.products[productIndex].quantity += 1;
            }else{
                cart.products.push({product: productId, quantity:1});
            }
            carts[cartIndex]= cart;
            await fs.writeFile(this.path,JSON.stringify(carts, null ,2), "utf-8")
            return cart;
        } catch (error) {
            throw new Error("Error al agregar producto al carrito: " + error.message)
        }
    }
}

export default CartManager;