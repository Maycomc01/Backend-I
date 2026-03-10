import express from "express";
import ProductManager from "../productManager.js";
import uploaderMulter from "../utils/multer.config.js";

const productsRouter = express.Router();
const productManager = new ProductManager("./src/data/products.json");

productsRouter.get("/", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.status(200).json({ status: "success", products });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

productsRouter.get("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await productManager.getProductById(productId);
    res.status(200).json({ status: "success", product });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

productsRouter.post("/", uploaderMulter.single("file0"), async (req, res) => {
  try {
    const pathImage = "/img/" + req.file.filename;
    const newProduct = {
      ...req.body,
      price: Number(req.body.price),
      stock: Number(req.body.stock),
      thumbnail: pathImage
    };
    const product = await productManager.addProduct(newProduct);
    res.status(201).json({ status: "success", product });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

productsRouter.delete("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    await productManager.deleteProductById(productId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

productsRouter.put("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const updates = req.body;
    const product = await productManager.updateProductById(productId, updates);
    res.status(200).json({ status: "success", product });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

export default productsRouter;