import express from "express";
import productsRouter from "./routes/products.route.js";
import cartRouter from "./routes/cart.route.js";
import { engine } from "express-handlebars";
import viewsRouter from "./routes/views.route.js";
import { Server } from "socket.io";
import http from "http";
import ProductManager from "./productManager.js";

const app = express();
app.use(express.json());

app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter);
app.use("/", viewsRouter);


app.use(express.static("./public"));


app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");


app.use((req, res) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});


const server = http.createServer(app);
const io = new Server(server);


const productManager = new ProductManager("./src/data/products.json");

io.on("connection", async (socket) => {
  console.log("Cliente conectado");

  const products = await productManager.getProducts();
  socket.emit("product list", { products });

  socket.on("new product", async () => {
    const updated = await productManager.getProducts();
    io.emit("product list", { products: updated });
  });

  
  socket.on("deleteProduct", async (id) => {
    await productManager.deleteProductById(id);
    const updated = await productManager.getProducts();
    io.emit("product list", { products: updated });
  });
});

server.listen(8080, () => {
  console.log("🚀 Servidor iniciado correctamente en http://localhost:8080");
});