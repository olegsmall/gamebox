/**
 * Created by: Peter Yablochkin
 * Created: 27 Sep 2018
 * Edited: 11 Oct 2018 by Peter Yablochkin
 *
 * @fileoverview Treats received data and executes DataBase CRUD queries for orders.
 * @module services/order.services
 * @requires order.model
 * @requires user.model
 * @requires product.model
 */

// Import models
const Order = require('../models/order.model');
const User = require('../models/user.model');
const Product = require('../models/product.model');

/**
 * Creates and saves an order in DB.
 * To prepare an order, method loops through all products in user's cart,
 * searches products by ids and create order with all needed information.
 *
 * @param req object - request info
 * @returns {Promise<*|Promise<json>>} A promise that returns json with created order if resolved,
 *    otherwise returns json with error message
 */
exports.placeOrder = function (req) {
  // Check chosen payment method
  if(req.body.payment_method !== 'cash' && req.body.payment_method !== 'check' && req.body.payment_method !== 'paypal') {
    throw Error('Unsupported payment method. Accepted payment methods are: PayPal, Cash, Check!');
  }
  try {
    // Create order object
    let order = new Order({
      status: 'pending',
      buyer: req.user._id,
      payment_method: req.body.payment_method,
      opened: Date.now()
    });

    let products = User.findOne({_id: req.user._id}).populate('cart.product');

    return products.then((user, err) => {
      if(err) {throw Error(err);}
      if(user.cart.length < 1) { throw Error('Your cart is empty. Nothing to order!'); }

      let transaction = [],
        total_price = 0,
        total_items = 0;

      // Loop throw product in the cart and gather info for order
      for(let i=0; i < user.cart.length; i++) {
        let pre_order_info = {
          product: user.cart[i].product._id,
          seller: user.cart[i].product.owner,
          deal_type: user.cart[i].deal_type
        };
        // Check deal type to assign right price
        if(user.cart[i].deal_type === 'for rent') {
          pre_order_info.price = user.cart[i].product.price.rent; // rent price
          pre_order_info.rent_duration = user.cart[i].rent_duration; // rent duration
          total_price += pre_order_info.price * pre_order_info.rent_duration; // calculate & add total price for rent

          let date = new Date();
          Product.updateOne({_id: user.cart[i].product}, {$set : {rented_until: date.addDays(Number(user.cart[i].rent_duration))}}).exec();

        } else {
          pre_order_info.price = user.cart[i].product.price.sell; // selling price
          total_price += pre_order_info.price; // add selling price to the total
        }
        total_items++;
        transaction.push(pre_order_info); // push item to transaction object

        // Update product status
        let status = []; // create a buffer for product status
        if(user.cart[i].deal_type === 'for rent') {  // If user chose to rent the product
          status = ['rented']; // change product.status to 'Rented'
        } else { // Otherwise
          status = ['sold']; // change product.status to 'Sold'
        }
        // Execute query for status changes
        Product.updateOne({_id: user.cart[i].product}, {$set : {status: status}}).exec();
      }

      // assigning info fields to the order
      order.transactions = transaction;
      order.total_items = total_items;
      order.total_price = total_price;

      User.updateOne({_id: order.buyer}, {$set: {cart: []}}).exec(); // Empty user cart

      return order.save().then((res) => { //saving and returning order
        // return created order
        return {order: res};
      });
    });
  } catch (e) {
    throw {error: e, message: 'Order creation error'};
  }
};

exports.getOrders = function (req) {
  let query = {}; // mongoose query
  let queryOptions = {}; // Mongoose-paginator query options
  queryOptions.populate = {path: 'buyer', select: 'name firstName lastName email'};
  req.query.page ? queryOptions.page = Number(req.query.page) : 1; //Page option
  req.query.limit ? queryOptions.limit = Number(req.query.limit) : 10; // Limit number of returning objects
  if(req.query.status === 'pending') {query.status = 'pending'}
  try {
    return Order.paginate(query, queryOptions).then((orders) => {
      if(orders === null) { throw Error('No orders found'); }
      return orders;
    });

  } catch (e) {
    throw {error: e, message: 'Error on get orders'};
  }
};

/**
 * Gets all orders of predefined user.
 * Certain filters can be applied to specify search query
 * Accepted filters:
 *     page={page number} - indicate page number
 *     limit={limit} - limit number of objects per page
 *     status={order status} - order status pending/completed
 *
 * @param req object - request info
 * @returns {Promise<*|Promise<json>>} A promise that returns json with order if resolved,
 *    otherwise returns json with error message
 */
exports.getOrders = function (req) {
  let query = {buyer: req.user._id};
  let queryOptions = {}; // Mongoose-paginator query options
  queryOptions.populate = {path: 'buyer', select: 'name firstName lastName email'};
  req.query.page ? queryOptions.page = Number(req.query.page) : 1; //Page option
  req.query.limit ? queryOptions.limit = Number(req.query.limit) : 10; // Limit number of returning objects
  if(req.query.status === 'pending') {query.status = 'pending'}
  if(req.query.status === 'completed') {query.status = 'completed'}
  try {
    return Order.paginate(query, queryOptions).then((orders,err) => {
      if(err) { throw Error(err); }
      if(orders === null) { throw Error('No orders found'); }
      return orders;
    });
  } catch (e) {
    throw {error: e, message: 'Error on get orders'};
  }
};

/**
 * Search specific order by ID.
 *
 * @param req object - request info
 * @returns {Promise<*|Promise<json>>} A promise that returns json with searched order if resolved,
 *    otherwise returns json with error message
 */
exports.getOrder = function (req) {
  try {
    return Order.findOne({_id: req.params.id}).then((order,err) => {
      if(err) { throw Error(err); }
      if(order === null) { throw Error('Order not found'); }
      return order;
    });
  } catch (e) {
    throw {error: e, message: 'Error on get orders'};
  }
};

/**
 * Complete an order.
 * Find an order by Id and change it's status to 'completed'
 * Provides functionality to administrators and superUser to confirm and complete orders.
 *
 * @param id string - order id
 * @returns {Promise<*|Promise<json>>} A promise that returns json with completed order if resolved,
 *    otherwise returns json with error message
 */
exports.completeOrder = function (id) {
  try {
    return Order.findOne({_id: id}).then((order, err) => {
      if(err) {throw Error(err);}
      order.status = 'completed'; // change order status to 'completed'
      return order.save();
    });
  } catch (e) {
    throw Error('Error at Order Complete');
  }
};

/**
 * Calculate date.
 * Summarize actual date with days sent in parameters.
 *
 * @param days int - days to add to date field in DB
 * @returns date string - actual date + number of days in Date format
 */
Date.prototype.addDays = function(days) {
  let date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};