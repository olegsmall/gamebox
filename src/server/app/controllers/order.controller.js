/**
 * Created by: Peter Yablochkin
 * Created: 7 Oct 2018
 * Edited: 11 Oct 2018 by Peter Yablochkin
 *
 * @fileoverview Manages CRUD operations for orders.
 * @module controllers/order.controller
 * @requires OrderService
 */

// Import Order services
const OrderService = require('../services/order.services');

/**
 * Manages order creation and placement feature
 *
 * @param req object - request info
 * @param res object - response info
 * @returns {Promise<*|Promise<json>>} A promise that returns json if resolved, otherwise json with error
 */
exports.placeOrder = async function(req, res) {
  try {
    // Execute order creation and placement method.
    let order = await OrderService.placeOrder(req);
    // Return order details, appropriate HTTP Status Code and Message.
    return res.status(200).json({status: 200, order: order.order, message: 'Order is placed and waiting to be approved!'});
  }catch(e){
    //Return Error Message with HTTP Status Code.
    return res.status(400).json({status: 400, error: e.message, message: 'Order was not created'});
  }
};

/**
 * Manages search feature of all orders
 * Accepts query filters to precise search
 *
 * @param req object - request info
 * @param res object - response info
 * @returns {Promise<*|Promise<json>>} A promise that returns json if resolved, otherwise json with error
 */
exports.getOrders = async function(req, res) {
  try {
    // Execute order search method.
    let orders = await OrderService.getOrders(req);
    // Return orders list, appropriate HTTP Status Code and Message.
    return res.status(200).json({status: 200, orders: orders, message: 'Orders received'});
  } catch(e) {
    //Return Error Message with HTTP Status Code.
    return res.status(400).json({status: 400, message: e.message});
  }
};

/**
 * Manages search feature of one concrete order
 *
 * @param req object - request info
 * @param res object - response info
 * @returns {Promise<*|Promise<json>>} A promise that returns json if resolved, otherwise json with error
 */
exports.getOrder = async function(req, res) {
  try {
    // Execute order search method.
    let order = await OrderService.getOrder(req);
    // Return order, appropriate HTTP Status Code and Message.
    return res.status(200).json({status: 200, order: order, message: 'Order received'});
  } catch(e) {
    //Return an Error Response Message with Code and the Error Message.
    return res.status(400).json({status: 400, message: e.message});
  }
};

/**
 * Manages search feature of user's orders
 * Accepts query filter options to precise search
 *
 * @param req object - request info
 * @param res object - response info
 * @returns {Promise<*|Promise<json>>} A promise that returns json if resolved, otherwise json with error
 */
exports.getUserOrders = async function(req, res) {
  try {
    // Execute order search method.
    let orders = await OrderService.getOrders(req);
    // Return user's orders, appropriate HTTP Status Code and Message.
    return res.status(200).json({status: 200, orders: orders, message: 'Orders received'});
  } catch(e) {
    //Return Error Message with HTTP Status Code.
    return res.status(400).json({status: 400, message: e.message});
  }
};

/**
 * Manages order complete operation.
 * Executed on payment confirmation to complete order
 *
 * @param req object - request info
 * @param res object - response info
 * @returns {Promise<*|Promise<json>>} A promise that returns json if resolved, otherwise json with error
 */
exports.completeOrder = async function(req, res) {
  try {
    // Execute order completion method.
    let order = await OrderService.completeOrder(req.body.id);
    // Return updated order, appropriate HTTP Status Code and Message.
    return res.status(200).json({status: 200, order: order, message: 'Order completed'});
  } catch(e) {
    //Return Error Message with HTTP Status Code.
    return res.status(400).json({status: 400, message: e.message});
  }
};

