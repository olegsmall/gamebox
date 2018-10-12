/**
 * Created by: Peter Yablochkin
 * Created: 17 Sept 2018
 * Edited: 11 Oct 2018 by Peter Yablochkin
 *
 * @fileoverview Manages requests for product CRUD queries.
 * @module controllers/product.controller
 * @requires ProductService
 */

// Connecting Product services
const ProductService = require('../services/product.services');

/**
 * Manages product creation feature
 *
 * @param req object - request info
 * @param res object - response info
 * @returns {Promise<*|Promise<json>>} A promise that returns json if resolved, otherwise json with error
 */
exports.createProduct = async function(req, res) {
  try {
    // Execute create product method.
    let newProduct = await ProductService.createProduct(req);
    // Return created product, appropriate HTTP Status Code and Message.
    return res.status(201).json({status: 201, product: newProduct, message: 'Product created successfully'});
  }catch(e){
    //Return Error Message with HTTP Status Code.
    return res.status(400).json({status: 400, error: e.message, message: 'Product was not created'});
  }
};

/**
 * Manages search feature of all products
 * Accepts query filters to precise search
 *
 * @param req object - request info
 * @param res object - response info
 * @returns {Promise<*|Promise<json>>} A promise that returns json if resolved, otherwise json with error
 */
exports.getProducts = async function(req, res) {
  try {
    // Execute product search method.
    let products = await ProductService.getProducts(req);
    // Return products list, appropriate HTTP Status Code and Message.
    return res.status(200).json({status: 200, products: products, message: 'Products received'});
  } catch(e) {
    //Return Error Message with HTTP Status Code.
    return res.status(400).json({status: 400, message: e.message});
  }
};

/**
 * Manages search feature of one concrete product
 *
 * @param req object - request info
 * @param res object - response info
 * @returns {Promise<*|Promise<json>>} A promise that returns json if resolved, otherwise json with error
 */
exports.getProduct = async function(req, res) {
  try {
    // Execute product search method.
    const product = await ProductService.getProduct(req.params.id);
    // Return product, appropriate HTTP Status Code and Message.
    return res.status(200).json({status: 200, product: product, message: 'Product received'});
  }catch (e) {
    //Return Error Message with HTTP Status Code.
    return res.status(400).json({status: 400, message: e.message});
  }
};

/**
 * Manages search feature of user's articles
 * Accepts query filter options to precise search
 *
 * @param req object - request info
 * @param res object - response info
 * @returns {Promise<*|Promise<json>>} A promise that returns json if resolved, otherwise json with error
 */
exports.getUserProducts = async function(req, res) {
  try {
    // Execute user's product search method.
    let products = await ProductService.getUserProducts(req);
    // Return products list with appropriate HTTP Status Code and Message.
    return res.status(201).json({status: 201, products: products, message: 'User products received'});
  } catch (e) {
    //Return Error Message with HTTP Status Code.
    return res.status(400).json({status: 400, error: e.message, message: 'Cant get user products'});
  }
};

/**
 * Manages product update feature
 *
 * @param req object - request info
 * @param res object - response info
 * @returns {Promise<*|Promise<json>>} A promise that returns json if resolved, otherwise json with error
 */
exports.updateProduct = async function(req, res) {
  try {
    // Execute product update method.
    let product = await ProductService.updateProduct(req);
    // Return updated product, appropriate HTTP Status Code and Message.
    return res.status(201).json({status: 201, product: product, message: 'Product updated successfully'});
  } catch(e){
    //Return Error Message with HTTP Status Code.
    return res.status(409).json({status: 409, message: e.message});
  }
};

/**
 * Manages product delete feature
 *
 * @param req object - request info
 * @param res object - response info
 * @returns {Promise<*|Promise<json>>} A promise that returns json if resolved, otherwise json with error
 */
exports.deleteProduct = async function(req, res) {
  try {
    // Execute product delete method.
    let product = await ProductService.deleteProduct(req.params.id);
    // Return deleted product with appropriate HTTP Status Code and Message.
    return res.status(201).json({status: 201, product: product, message: 'Product deleted successfully'});
  } catch(e){
    //Return Error Message with HTTP Status Code.
    return res.status(409).json({status: 409, message: e.message});
  }
};

/**
 * Manages product rate feature
 *
 * @param req object - request info
 * @param res object - response info
 * @returns {Promise<*|Promise<json>>} A promise that returns json if resolved, otherwise json with error
 */
exports.rateProduct = async function (req, res) {
  try {
    // Execute product rate method.
    let product = await ProductService.rateProduct(req);
    // Return product, ratings and appropriate HTTP Status Code and Message.
    return res.status(201).json({status: 201, product: product, message: 'Product was successfully rated'});
  } catch (e) {
    //Return Error Message with HTTP Status Code.
    return res.status(400).json({status: 400, message: e.message});
  }
};

/**
 * Manages product adding comment feature
 *
 * @param req object - request info
 * @param res object - response info
 * @returns {Promise<*|Promise<json>>} A promise that returns json if resolved, otherwise json with error
 */
exports.addProductComment = async function (req, res) {
  try {
    // Execute add product comment method.
    let product = await ProductService.addProductComment(req);
    // Return added comment with appropriate HTTP Status Code and Message.
    return res.status(201).json({status: 201, product: product, message: 'Product comment added'});
  } catch (e) {
    //Return Error Message with HTTP Status Code.
    return res.status(400).json({status: 400, message: e.message});
  }
};
