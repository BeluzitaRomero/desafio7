const express = require("express");
const { Router } = express;
const router = new Router();

const Container = require("../../Container");
const container = new Container("products.json");

let admin = true;

if (admin) {
  router.post("/", async (req, res) => {
    res.send(await container.save(req.body));
  });

  router.put("/:id", async (req, res) => {
    let product = await container.getById(req.params.id);

    product.title = req.body.title;
    product.price = req.body.price;
    product.thumbnail = req.body.thumbnail;
    product.code = req.body.code;
    product.description = req.body.description;

    res.json(await container.updateProduct(product, req.params.id));
  });

  router.delete("/:id", async (req, res) => {
    res.json(await container.deleteById(req.params.id));
  });
}

router.get("/:id?", async (req, res) => {
  req.params.id
    ? res.json(await container.getById(req.params.id))
    : res.json(await container.getAll());
});

module.exports = router;
