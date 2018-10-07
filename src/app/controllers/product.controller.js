const ProductService = require('../services/product.services');


exports.createProduct = async function(req, res) {
  try {
    let newProduct = await ProductService.createProduct(req);
    return res.status(201).json({status: 201, product: newProduct, message: 'Product created successfully'});

  }catch(e){
    return res.status(400).json({status: 400, error: e.message, message: 'Product was not created'});
  }
};

exports.getUserProducts = async function(req, res) {
  try {
    let products = await ProductService.getUserProducts(req);
    return res.status(201).json({status: 201, products: products, message: 'User products received'});

  } catch (e) {
    return res.status(400).json({status: 400, error: e.message, message: 'Cant get user products'});
  }
};

exports.getProducts = async function(req, res) {
  try {
    let products = await ProductService.getProducts(req);
    // Return the products list with the appropriate HTTP Status Code and Message.
    return res.status(200).json({status: 200, products: products, message: 'Products received'});

  } catch(e) {
    //Return an Error Response Message with Code and the Error Message.
    return res.status(400).json({status: 400, message: e.message});
  }
};

exports.getProduct = async function(req, res) {
  try {
    const product = await ProductService.getProduct(req.params.id);
    // Return the products list with the appropriate HTTP Status Code and Message.
    return res.status(200).json({status: 200, product: product, message: 'Product received'});

  }catch (e) {
    //Return an Error Response Message with Code and the Error Message.
    return res.status(400).json({status: 400, message: e.message});
  }
};

exports.updateProduct = async function(req, res) {
  try {
    let product = await ProductService.updateProduct(req);
    return res.status(201).json({status: 201, product: product, message: 'Product updated successfully'});

  } catch(e){
    return res.status(409).json({status: 409, message: e.message});
  }
};

exports.deleteProduct = async function(req, res) {
  try {
    let product = await ProductService.deleteProduct(req.params.id);
    return res.status(201).json({status: 201, product: product, message: 'Product deleted successfully'});

  } catch(e){
    return res.status(409).json({status: 409, message: e.message});
  }
};

exports.rateProduct = async function (req, res) {
  try {
    let product = await ProductService.rateProduct(req);
    return res.status(201).json({status: 201, product: product, message: 'Product was successfully rated'});
  } catch (e) {
    return res.status(400).json({status: 400, message: e.message});
  }
};

exports.addProductComment = async function (req, res) {
  try {
    let product = await ProductService.addProductComment(req);
    return res.status(201).json({status: 201, product: product, message: 'Product comment added'});
  } catch (e) {
    return res.status(400).json({status: 400, message: e.message});
  }
};