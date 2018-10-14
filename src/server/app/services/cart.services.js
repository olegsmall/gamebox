/**
 * Created by: Peter Yablochkin
 * Created: 5 oct 2018
 * Edited: 12 Oct 2018 by Peter Yablochkin
 *
 * @fileoverview Treats received data and executes DataBase CRUD queries for cart.
 * @module services/cart.services
 * @requires product.model
 * @requires user.model
 * @requires mongoose
 */

// Import modules
const Product = require('../models/product.model');
const User = require('../models/user.model');
const {mongoose} = require('../../config/app.config');
const idvalidator = mongoose.Types.ObjectId.isValid; //Mongoose objectId validator

/**
 * Adds product to user cart.
 *
 * @param req object - request info
 * @returns {Promise<*|Promise<json>>} A promise that returns json with updated cart if resolved,
 *    otherwise returns json with error message
 */
exports.addProductToCart = function (req) {
  // Validating if sent product id has correct format
  if(idvalidator(req.params.id) === false) { throw Error('Wrong product id format'); }

  // Querying for product id in DB
  return Product.findById(req.params.id).exec().then((product, err) => {
    if(err) { throw Error(err); }
    // Checking if product exists in DB
    if(product === null) { throw Error('Product doesn\'t exist'); }
    //Checking product status if it's not already sold or rented
    if(product.status.indexOf('sold') !== -1) { throw Error('Product is already sold'); }
    if(product.status.indexOf('rented') !== -1) { throw Error('Product is already rented'); }
    if(product.status.indexOf(req.body.deal_type) === -1) { throw Error('Product is not available ' + req.body.deal_type); }
  }).then(() => {
    //Querying for user id in DB
    return User.findById(req.user._id).select('cart').exec().then((user, err) => {
      // Checking if product id is already in the cart
      for(let i=0; i < user.cart.length; i++) {
        if(String(user.cart[i].product) === req.params.id) {
          throw Error('Product is already in your cart');
        }
      }
      let pre_order_info = {
        product: req.params.id,
        deal_type: req.body.deal_type
      };
      //Checking pre-order deal_type to verify rent duration
      if(req.body.deal_type === 'for rent') {
        if(isNaN(req.body.rent_duration) || req.body.rent_duration < 1) {
          throw Error('Indicate rent duration');
        }
        pre_order_info.rent_duration = req.body.rent_duration;
      }
      //Pushing object id with pre_order information into user cart
      user.cart.push(pre_order_info);
      //Saving user cart
      return user.save().then(()=> {
        return User.findById(req.user._id).populate('cart.product').then((user, err) => {
          if(err) { throw err; }
          return calcCartTotals(user);
        });
      });
    });
  });
};

/**
 * Gets all product from user cart.
 * Searches a user by id and searches products associated with product ids in user cart.
 *
 * @param req object - request info
 * @returns object - Populated products with calculated total price & total items in user's cart,
 *    otherwise returns json with error message
 */
exports.getCartProducts = function (req) {
  let promise = User.findById(req.user._id).populate('cart.product');
  return promise.then((user, err) => {
    if(err) { throw err; }
    return calcCartTotals(user);
  });
};

/**
 * Search specific article by ID and delete it
 *
 * @param req object - request info
 * @returns {Promise<*|Promise<json>>} A promise that returns json with user cart with its items if resolved,
 *    otherwise returns json with error message
 */
exports.deleteProductFromCart = function (req) {
  let promise = User.findOneAndUpdate(
    {_id: req.user._id},
    {$pull: {cart: {_id: req.params.id}}},
    {new: true, safe: true}).select('cart')
    .populate('cart.product');
  return promise.then((user, err) => {
    if(err) { throw err; }
    return calcCartTotals(user);
  });
};

/**
 * Search specific article by ID and delete it
 *
 * @param user object - user object
 * @returns object containing cart items, total items in the cart & total price of all items in the cart
 */
function calcCartTotals (user) {
  let cart = user.cart; // Define user cart
  let cartTotal = 0; // Total price of items in cart
  let totalItems = 0; // Total items in cart (counter)
  let cartBuffer = []; // Buffer for items to return
  for(let i=0; i < cart.length; i++) {
    cartBuffer.push(cart[i]);
    if(cart[i].deal_type === 'for sale') {
      cartTotal += cart[i].product.price.sell;
    } else {
      cartTotal += cart[i].product.price.rent * cart[i].rent_duration;
    }
    totalItems += 1;
  }
  return {products: cartBuffer, total_items: totalItems, total_price: cartTotal};
}