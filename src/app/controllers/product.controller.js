const ProductService = require('../services/product.services');


exports.createProduct = async function(req, res) {
  try {
    let newProduct = await ProductService.createProduct(req);
    return res.status(201).json({status: 201, data: newProduct, message: 'Product Created Successfully'});

  }catch(e){
    return res.status(400).json({status: 400, message: e.message});
  }
};

exports.getProduct = async function(req, res, next) {

  // Check the existence of the query parameters, If the exists doesn't exists assign a default value
  let page = req.query.page ? req.query.page : 1;
  let limit = req.query.limit ? req.query.limit : 100;

  try {
    let products = await ProductService.getProducts({}, page, limit);
    // Return the products list with the appropriate HTTP Status Code and Message.
    return res.status(200).json({status: 200, data: products, message: 'Successfully Users Received'});

  } catch(e) {
    //Return an Error Response Message with Code and the Error Message.
    return res.status(400).json({status: 400, message: e.message});
  }
};

exports.updateProduct = async function(req, res, next) {

};

exports.deleteProduct = async function(req, res, next) {

};