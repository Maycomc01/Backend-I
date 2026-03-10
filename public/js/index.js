const socket = io();

// Renderizar lista de productos
socket.on("product list", ({ products }) => {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";

  products.forEach((product) => {
    let card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src=${product.thumbnail}>
      <p>${product.title}</p>
      <p>$${product.price}</p>
      <button onclick="deleteProduct('${product.id}')">Eliminar</button>
    `;
    productList.appendChild(card);
  });
});

// Manejar formulario
const productForm = document.getElementById("product-form");
productForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(productForm);

  const response = await fetch("api/products", {
    method: "POST",
    body: formData
  });

  if (response.ok) {
    productForm.reset();
    socket.emit("new product");
  }
});

// Eliminar producto
function deleteProduct(id) {
  fetch(`api/products/${id}`, { method: "DELETE" })
    .then((res) => {
      if (res.ok) {
        socket.emit("new product");
      }
    });
}