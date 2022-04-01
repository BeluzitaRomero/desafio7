const { urlToHttpOptions } = require("url");

const fs = require("fs").promises;

class Cart {
  constructor(file) {
    this.file = file;
  }

  async getCart() {
    try {
      const allCarts = await fs.readFile(this.file, "utf-8");
      return JSON.parse(allCarts);
    } catch (err) {
      console.log("No hay carritos");
      return null;
    }
  }

  async newCart() {
    const arrayCarts = await this.getCart();
    let cart = {};
    let time = Date.now();

    if (!arrayCarts) {
      await fs.writeFile(this.file, "[]");
    }

    if (arrayCarts.length === 0) {
      cart.id = 1;
      cart.timestamp = time;
      cart.product = [];
      arrayCarts.push(cart);
      await fs.writeFile(this.file, JSON.stringify(arrayCarts));
      console.log("carrito 1");
      return cart.id;
    }

    let id = arrayCarts.map((p) => p.id);
    let maxId = Math.max(...id);
    const newCart = { ...cart, id: maxId + 1, timestamp: time, product: [] };

    await arrayCarts.push(newCart);
    await fs.writeFile(this.file, JSON.stringify(arrayCarts));
    console.log("carrito 2");
    return newCart.id;
  }

  async addProduct(product) {
    const carts = await this.getCart();

    const cartId = carts.find((x) => x.id);
    cartId.product.push(product);

    await fs.writeFile(this.file, JSON.stringify(carts));
    console.log(cartId, "carrito nuevo");
  }

  async getCartById(number) {
    const carts = await this.getCart();

    const findById = carts.find((cart) => cart.id == number);
    if (!findById) {
      return "El carrito al que quiere acceder no existe";
    }
    console.log(findById);
    return findById.product;
  }

  async deleteCart(id) {
    const carts = await this.getCart();
    const deleteCart = carts.filter((cart) => cart.id !== Number(id));
    await fs.writeFile(this.file, JSON.stringify(deleteCart));
    return "Carrito borrado";
  }

  async deleteProdCart(id, id_prod) {
    const carts = await this.getCart();

    const cart = carts.find((p) => p.id === Number(id));
    const deleteProd = cart.product.filter((p) => p.id !== Number(id_prod));
    cart.product = deleteProd;
    await fs.writeFile(this.file, JSON.stringify(carts));
    return "Producto eliminado";
  }
}

module.exports = Cart;
