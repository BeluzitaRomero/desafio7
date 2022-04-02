const express = require("express");
const { Router } = express;
const router = new Router();

const Container = require("../../Container");
const container = new Container("products.json");

const Cart = require("../../Cart");
const cart = new Cart("cart.json");

router.get("/", async (req, res) => {
  res.send(await cart.getCart());
});

router.get("/:id/products", async (req, res) => {
  //Me permite listar todos los productos guardados en el carrito
  res.send(await cart.getCartById(req.params.id));
});

router.post("/", async (req, res) => {
  // Crea un carrito y devuelve su id
  res.json(await cart.newCart());
});
router.post("/:id/products", async (req, res) => {
  //Para incorporar productos al carrito por su id de producto
  const time = Date.now();

  const products = await container.getAll();
  const productId = products.find((p) => p.title === req.body.title);

  const product = {
    id: productId.id,
    title: req.body.title,
    price: req.body.price,
    thumbnail: req.body.thumbnail,
    code: req.body.code,
    description: req.body.description,
    timestamp: time,
  };

  await cart.addProduct(product);
  res.send("Producto agregado al carrito");
});

router.delete("/:id", async (req, res) => {
  //Vacía un carrito y lo elimina.
  res.send(await cart.deleteCart(req.params.id));
});
router.delete("/:id/products/:id_prod", async (req, res) => {
  //Eliminar un producto del carrito por su id de carrito y de producto

  res.send(await cart.deleteProdCart(req.params.id, req.params.id_prod));
});

module.exports = router;
