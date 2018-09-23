const Product = require('../models/product.model');
const Genre = require('../models/genre.model');
const User = require('../models/user.model');


exports.createProduct = function (req) {
  try {
    let promise = Genre.find({_id: {$in: req.body.genres}}, '_id').exec();

    return promise.then((docs) => {
      let product = new Product({
        title: req.body.title,
        description: req.body.description,
        images: req.body.images,
        genres: docs,
        price: req.body.price,
        status: req.body.status,
    });
      return product.save();
    });
  } catch (e) {
    throw {error: e, message: 'Product creation error'};
  }
};

exports.getProducts = function (req) {

  // // Check the existence of the query parameters, If the exists doesn't exists assign a default value
  let page = req.body.page ? req.body.page : 1;
  let limit = req.body.limit ? req.body.limit : 10;

  try {
    return Product.paginate(req.body.query, {page: page, limit: limit, populate: 'genres'});
  } catch (e) {
    throw {error: e, message: 'Error on get products'};
  }
};

exports.getProduct = function (id) {
  try {
    let promise = Product.findById(id).populate('genres').exec();
    return promise.then((doc) => { return doc; });

  } catch (e) {
    throw {error: e, message: 'Error on get product'};
  }
};

exports.updateProduct = async function(req) {
  try {
    let product = new Product({
      title: req.body.title,
      description: req.body.description,
      images: req.body.images,
      genres: req.body.genres,
      price: req.body.price,
      status: req.body.status,
    });

    return Product.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      description: req.body.description,
      images: req.body.images,
      genres: req.body.genres,
      price: req.body.price,
      status: req.body.status,
    }, { new: true });
    // return promise.then((doc) => { return doc; });

  } catch(e){
    throw {error: e, message: 'Error on product update'};
  }
};

exports.deleteProduct = function(id) {
  try {
    // Delete a product.
    let promise = Product.findByIdAndDelete(id).exec();
    return promise.then((doc) => { return doc ;});

  } catch (e) {
    throw {error: e, message: 'Error on product delete.'};
  }
};
