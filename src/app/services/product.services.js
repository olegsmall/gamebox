const Product = require('../models/product.model');
const Genre = require('../models/genre.model');


exports.createProduct = function (req) {
  try {
    let promise = Genre.find({_id: {$in: req.body.genres}}, '_id').exec();

    return promise.then((docs) => {
      let product = new Product({
        title: req.body.title,
        description: req.body.description,
        images: req.body.images,
        genres: docs,
        owner: req.user._id,
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

exports.getUserProducts = async function(req) {
  try {
    let page = req.body.page ? req.body.page : 1;
    let limit = req.body.limit ? req.body.limit : 10;

    let promise = Product.paginate({owner: req.user._id}, {page: page, limit: limit, populate: {path: 'owner genres', select: 'name avatar role _id firstName lastName email'}});

    return promise.then((doc) => {
      if(doc === null) { throw Error('No products found'); }
      return doc;
    });

  } catch (e) {
    throw Error('Error at getUserProduct services');
  }
};

exports.getProduct = function (id) {
  try {
    let promise = Product.findById(id).populate('genres').exec();

    return promise.then((doc) => {
      if(doc === null) { throw Error('Product not found'); }
      return doc;
    });

  } catch (e) {
    throw {error: e, message: 'Error on get product'};
  }
};

exports.updateProduct = async function(req) {
  try {
    let promise = Product.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      description: req.body.description,
      images: req.body.images,
      genres: req.body.genres,
      price: req.body.price,
      status: req.body.status,
    }, { new: true });

    return promise.then((doc) => {
      if(doc === null) { throw Error('Product not found'); }
      return doc;
    });
  } catch(e){
    throw {error: e, message: 'Error on product update'};
  }
};

exports.deleteProduct = function(id) {
  try {
    // Delete a product.
    let promise = Product.findByIdAndDelete(id).exec();

    return promise.then((doc) => {
      if(doc === null) { throw Error('Product not found'); }
      return doc;
    });
  } catch (e) {
    throw {error: e, message: 'Error on product delete.'};
  }
};

