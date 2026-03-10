import express from "express";
import CartManager from "../cartManager.js";

const cartRouter = express.Router();
const cartManager = new CartManager("./src/data/carts.json");


cartRouter.get("/", async (req, res) => {
  try {
    const carts = await cartManager.getCarts();
    res.status(200).json({ status: "success", carts });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});


cartRouter.post("/", async (req, res) => {
  try {
    const newCart = await cartManager.createCart();
    res.status(201).json({ status: "success", cart: newCart });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});


cartRouter.get("/:cid", async (req, res) => {
  try {
    const cartId = req.params.cid;
    const cart = await cartManager.getCartById(cartId);
    res.status(200).json({ status: "success", cart });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});


cartRouter.post("/:cid/product/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const updatedCart = await cartManager.addProductToCart(cid, pid);
    res.status(200).json({ status: "success", cart: updatedCart });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

export default cartRouter;