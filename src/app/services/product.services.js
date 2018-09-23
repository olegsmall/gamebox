const Product = require('../models/product.model');
const Genre = require('../models/genre.model');
const User = require('../models/user.model');

let async = require('async');

// const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

exports.createProduct = async function(req, res, next) {

  // Sanitazing fields
  sanitizeBody('title').trim().escape(),
  sanitizeBody('description').trim().escape(),
  sanitizeBody('images').trim().escape(),
  sanitizeBody('genre').trim().escape(),
  sanitizeBody('price').trim().escape(),
  sanitizeBody('status').trim().escape(),
  sanitizeBody('sold.*').trim().escape();

  async.parallel({
    // Searching for genres and check genre existance
    genres: (callback) => {
      Genre.find({_id: { $in: req.body.genre }}, '_id').exec(callback);
    }
  }, (err, docs) => {
    if(err) { throw err; }

    req.body.genre = docs.genres;

    let product = new Product({
      title: req.body.title,
      description: req.body.description,
      images: req.body.images,
      genre: req.body.genre,
      price: req.body.price,
      status: req.body.status,
      sold: req.body.sold,
    });
    return product.save();
  });
};

exports.getProducts = function(req) {

  // // Check the existence of the query parameters, If the exists doesn't exists assign a default value
  let page = req.body.page ? req.body.page : 1;
  let limit = req.body.limit ? req.body.limit : 10;

  try{

    return Product.paginate(req.body.query, {page: page, limit: limit, populate: 'genre'});

  } catch (e) {

    throw {message: 'Error on get products'};
  }
};

exports.getProduct = function(req) {

  // // Check the existence of the query parameters, If the exists doesn't exists assign a default value
  // let page = req.body.page ? req.body.page : 1;
  // let limit = req.body.limit ? req.body.limit : 10;

  try{
    // req.params.id - id of product
    return req.params.id;
    // return Product.paginate(req.body.query, {page: page, limit: limit, populate: 'genre'});

  } catch (e) {
    throw {message: 'Error on get product'};
  }
};
