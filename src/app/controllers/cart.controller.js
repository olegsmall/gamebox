const CartService = require('../services/cart.services');

exports.addProductToCart = async function (req, res) {
  try {
    let cart = await CartService.addProductToCart(req);
    return res.status(201).json({status: 201, cart: cart, message: 'Product added to cart'});
  } catch (e) {
    return res.status(400).json({status: 400, message: e.message});
  }
};

exports.getCartProducts = async function (req, res) {
  try {
    let cart = await CartService.getCartProducts(req);
    return res.status(201).json({status: 201, cart: cart, message: 'Cart products received'});
  } catch (e) {
    return res.status(400).json({status: 400, message: e.message});
  }
};

exports.deleteProductFromCart = async function (req, res) {
  try {
    let cart = await CartService.deleteProductFromCart(req);
    return res.status(201).json({status: 201, cart: cart, message: 'Cart products received'});
  } catch (e) {
    return res.status(400).json({status: 400, message: e.message});
  }
};

