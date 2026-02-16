import express from "express";
import ProductManager from "./productManager.js";
import CartManager from "./cartManager.js";

const app= express();
app.use(express.json());


const productManager = new ProductManager("./src/data/products.json");
const cartManager= new CartManager("./src/data/carts.json");

app.get("/api/products",async(req, res)=>{
    try {
        const products = await productManager.getProducts();
        res.status(200).json({status:"success", products});
    } catch (error) {
        res.status(500).json({status:"error", message: error.message});
    }
});
app.get("/api/products/:productId", async(req, res)=>{
    try {
        const productId=req.params.productId;
        const product = await productManager.getProductById(productId);
        res.status(200).json({status:"success",product});
    } catch (error) {
        res.status(500).json({status:"error", message: error.message})
    }
});
app.post("/api/products", async (req, res)=>{
    try {
        const newProduct = req.body;
        const product = await productManager.addProduct (newProduct);
        res.status(200).json({status:"success",product});
    
    } catch (error) {
        res.status(500).json({status:"error", message: error.message});
    }
});

app.put("/api/products/:productId", async(req, res)=>{
    try {
        const productId = req.params.productId;
        const updates = req.body;
        const product= await productManager.updateProductById(productId,updates)
        res.status(200).json({status:"success", product})
    } catch (error) {
        res.status(500).json({status:"error", message: error.message})
    }
})

app.delete("/api/products/:productId", async(req, res)=>{
    try {
        const productId= req.params.productId;
        await productManager.deleteProductById(productId);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({status:"error", message: error.message})
    }
})

app.post("/api/carts", async(req, res)=>{
    try {
         const carts= await cartManager.addCart();
         res.status(201).json({carts, message: "Nuevo carrito creado"})
    } catch (error) {
        res.status(500).json({status:"error", message: error.message})
    }
   

});

app.get("/api/carts/:cid", async(req, res)=>{
    try {
        const cartId = req.params.cid;
        const cart = await cartManager.getCartById(cartId);
        res.status(200).json({status: "success", products: cart.products})
    } catch (error) {
        res.status(500).json({status: "error", message: error.message});
    }
});

app.post("/api/carts/:cid/product/:pid", async (req, res)=>{
    try {
        const cartId =req.params.cid;
        const productId= req.params.pid;
        const cart =await cartManager.addProductToCart(cartId, productId);
        res.status(200).json({status: "success", cart});
        } catch (error) {
        res.status(500).json({status: "error", message: error.message});
    }
});
// ruta no encontrada
app.use((req, res)=>{
    res.status(404).json({message: "Ruta no encontrada"})
})

app.listen(8080,()=>{
    console.log("Servidor iniciado correctamente en http://localhost:8080")
});