import { v4 as newId } from "uuid";
import fs from "fs/promises"
import { error } from "console";

class ProductManager{
    constructor(path){
        this.path= path;
    }
    verifyCode(code,product){
        return product.some((product)=>product.code ===code);
    }

    async getProducts(){
        try {
            const productJson= await fs.readFile(this.path, "utf-8");
            const products =JSON.parse(productJson);
            return products;
        } catch (error) {
            throw new Error("No se puede mostrar los productos" + error.message);
        }
    }

    async addProduct(product){
        try {
            const products = await this.getProducts();
            const codeUsed = this.verifyCode(product.code, products);
            if(codeUsed)throw new Error("El codigo ya existe");
            const id=newId();
            const newProduct = {id, ...product};
            products.push(newProduct);
            await fs.writeFile(this.path,JSON.stringify(products, null,2), "utf-8");
            return newProduct;
        } catch (error) {
            throw new Error("No se pudo agregar el producto: " + error.message);
        }
    }
    async getProductById(productId){
        try {
            const product=await this.getProducts();
            const productFound= product.find((product)=> product.id ===productId);
            if(!productFound) throw new Error("Producto no encontrado");
            return productFound;
        } catch (error) {
            throw new Error("Error al encontrar producto por su ID" + error.message);
        }
    }

    async deleteProductById(productId){
        try {
            const product =await this.getProducts();
            const filteredProducts= product.filter((product)=> product.id !==productId);
            await fs.writeFile(this.path,JSON.stringify(filteredProducts,null,2), "utf-8");
            return null;
        } catch (error) {
            throw new Error("Error al eliminar el producto por su ID" + error.message);
        }      
    }

    async updateProductById(productId, updates){
        try {
            const products= await this.getProducts();
            const indexProduct=products.findIndex((product)=>product.id === productId);
            if(indexProduct===-1)throw new Error("Producto no encontrado");
            products[indexProduct]= {...products[indexProduct], ...updates};
            await fs.writeFile(this.path, JSON.stringify(products, null, 2), "utf-8");
            return products[indexProduct];
        } catch (error) {
            throw new Error("Error al editar un producto por su ID" + error.message);
        }
    }
};

export default ProductManager;