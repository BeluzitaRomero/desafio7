const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
const productsRouter = require("./src/routes/productRouter");
app.use("/api/products", productsRouter);

const cart = require("./src/routes/cartRouter");
app.use("/api/cart", cart);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server escuchando al puerto ${port}`);
});

app.on("error", (error) => console.log(`Error en el servidor ${error}`));
