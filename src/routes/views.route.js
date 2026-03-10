import express from "express";
import ProductManager from "../productManager.js";
import CartManager from "../cartManager.js";

const viewsRouter = express.Router();
const productManager = new ProductManager("./src/data/products.json");
const cartManager = new CartManager("./src/data/carts.json");

viewsRouter.get("/", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.render("home", { products });
  } catch (error) {
    res.status(500).send("Error al cargar productos");
  }
});

viewsRouter.get("/cart", async (req, res) => {
  try {
    const cart = await cartManager.getCarts();
    res.render("cart", { cart });
  } catch (error) {
    res.status(500).send("Error al cargar carrito");
  }
});


viewsRouter.get("/realtimeproducts", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.render("realTimeProducts", { products });
  } catch (error) {
    res.status(500).send("Error al cargar productos en tiempo real");
  }
});

export default viewsRouter;