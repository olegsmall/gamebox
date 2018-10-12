/**
 * Created by: Peter Yablochkin
 * Created: 3 Oct 2018
 * Edited: 11 Oct 2018 by Peter Yablochkin
 *
 * @fileoverview Manages requests for cart operations.
 * @module controllers/cart.controller
 * @requires CartService
 */

// Importing Cart services
const CartService = require('../services/cart.services');

/**
 * Manages add product to cart feature
 *
 * @param req object - request info
 * @param res object - response info
 * @returns {Promise<*|Promise<json>>} A promise that returns json if resolved, otherwise json with error
 */
exports.addProductToCart = async function (req, res) {
  try {
    // Execute add product to cart method.
    let cart = await CartService.addProductToCart(req);
    // Return user's cart with appropriate HTTP Status Code and Message.
    return res.status(201).json({status: 201, cart: cart, message: 'Product added to cart'});
  } catch (e) {
    //Return Error Message with HTTP Status Code.
    return res.status(400).json({status: 400, message: e.message});
  }
};

/**
 * Returns products from user's cart feature of all articles
 * Accepts query filters to precise search
 *
 * @param req object - request info
 * @param res object - response info
 * @returns {Promise<*|Promise<json>>} A promise that returns json if resolved, otherwise json with error
 */
exports.getCartProducts = async function (req, res) {
  try {
    // Execute search of product in cart.
    let cart = await CartService.getCartProducts(req);
    // Return products list from the cart with appropriate HTTP Status Code and Message.
    return res.status(201).json({status: 201, cart: cart, message: 'Cart products received'});
  } catch (e) {
    return res.status(400).json({status: 400, message: e.message});
  }
};

/**
 * Manages product removal from cart feature
 *
 * @param req object - request info
 * @param res object - response info
 * @returns {Promise<*|Promise<json>>} A promise that returns json if resolved, otherwise json with error
 */
exports.deleteProductFromCart = async function (req, res) {
  try {
    // Execute product delete method.
    let cart = await CartService.deleteProductFromCart(req);
    // Return user's cart with appropriate HTTP Status Code and Message.
    return res.status(201).json({status: 201, cart: cart, message: 'Product successfully deleted from your cart'});
  } catch (e) {
    //Return Error Message with HTTP Status Code.
    return res.status(400).json({status: 400, message: e.message});
  }
};

