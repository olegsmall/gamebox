import BufferToString from "./BufferToString";

/**
 * Created by: Peter Yablochkin
 * Created: 16 Sept 2018
 * Edited: 12 Oct 2018 by Peter Yablochkin
 *
 * @fileoverview Treats received data and executes queries for products.
 * @module services/product.services
 * @requires product.model
 */

// Import models
const Product = require('../models/product.model');
const Genre = require('../models/genre.model');

/**
 * Creates and saves new product in DB.
 * Accepts image uploading.
 *
 * @param req object - request info
 * @returns {Promise<*|Promise<json>>} A promise that returns json with created product if resolved,
 *    otherwise returns json with error message
 */
exports.createProduct = function (req) {
  getBackRentedProducts(); // Change product status if rent date is expired
  try {
    // Verify if genre references
    let promise = Genre.find({_id: {$in: req.body.genres}}, '_id').exec();
    return promise.then((docs) => {
      // Define product image
      let image = [];
      if (req.file){
        image.push(new BufferToString().convert(req.file.mimetype, req.file.buffer));
      } else {
        image.push('/image/default/product.jpg');
      }

      // Define product price
      const price = {};
      if (req.body.sellPrice){
        price.sell = parseFloat(req.body.sellPrice);
      }
      if (req.body.rentPrice){
        price.rent = parseFloat(req.body.rentPrice);
      }
      // Create new product
      let product = new Product({
        title: req.body.title,
        description: req.body.description,
        images: image,
        genres: docs,
        owner: req.user._id,
        price: price,
        status: req.body.status,
        esrb: req.body.esrb,
        producer: req.body.producer
      });
      // Save product in db
      return product.save();
    });
  } catch (e) {
    throw {error: e, message: 'Product creation error'};
  }
};
/**
 * Gets all articles existing in DB.
 * Certain filters can be applied to specify search
 * Accepted filters:
 *     page={page number} - indicate page number
 *     limit={limit} - limit number of objects per page
 *     sort={sort order} - sorting order (asc/desc)
 *     rating={rating} - search by concrete rating
 *     title={title} - search product by it's title. Uses %LIKE% operator
 *     sort_by={param} - filter to apply.
 *        accepted parameters: date,title,rent,sell,rating,status,popular
 *
 * @param req object - request info
 * @returns {Promise<*|Promise<json>>} A promise that returns json with products if resolved,
 *    otherwise returns json with error message
 */
exports.getProducts = function (req) {
  getBackRentedProducts(); // Change product status if rent date is expired
  let queryOptions = {}; // Mongoose-paginator query options
  let query = {}; // Mongoose query options
  query.status = {$in: ['for sale', 'for rent']}; // define product statuses to search
  let sort = 'desc'; // Default sorting method -> Descending
  // Populate query fields
  queryOptions.populate = {path: 'genres owner', select: '_id name firstName lastName email'};
  // Check the existence of the query parameters, If the exists doesn't exists assign a default value
  req.query.page ? queryOptions.page = Number(req.query.page) : 1;
  req.query.limit ? queryOptions.limit = Number(req.query.limit) : 10;
  if(req.query.sort === 'asc') { sort = 'asc'; }
  if(req.query.sort_by === 'title') { queryOptions.sort = { title: sort}; }
  if(req.query.sort_by === 'sell') { queryOptions.sort = { 'price.sell': sort}; }
  if(req.query.sort_by === 'rent') { queryOptions.sort = { 'price.rent': sort}; }
  if(req.query.sort_by === 'date') { queryOptions.sort = { added: sort}; }

  // Check if searching by title (uses %LIKE%)
  if(req.query.title) { query.title = new RegExp(req.query.title,'i'); }
  if(req.query.sort_by === 'rating') { queryOptions.sort = { 'average_rating': sort}; }
  if(req.query.rating) { query.average_rating = req.query.rating; }
  if(req.query.sort_by === 'popular') { query.average_rating = {$gte: 4}; }
  if(req.query.status === 'for rent' || req.query.status === 'for sale' || req.query.status === 'rented' || req.query.status === 'sold') {
    query.status = req.query.status;
  }
  try {
    // Search objects with user options
    return Product.paginate(query, queryOptions).then((docs,err) => {
      if(err) { throw Error(err); }
      if(docs === null) { throw Error('No products found'); }
      return docs;
    });
  } catch (e) {
    throw {error: e, message: 'Error on get products'};
  }
};

/**
 * Search specific product by ID.
 *
 * @param id string - product id
 * @returns {Promise<*|Promise<json>>} A promise that returns json with product if resolved,
 *    otherwise returns json with error message
 */
exports.getProduct = function (id) {
  getBackRentedProducts(); // Change product status if rent date is expired
  try {
    return Product.findOne({_id: id}).populate('genres owner', 'name firstName lastName').then((doc,err) => {
      if(err) { throw Error(err); }
      if(doc === null) { throw Error('Product not found'); }
      return doc;
    });
  } catch (e) {
    throw {error: e, message: 'Error on get product'};
  }
};

/**
 * Gets product created by specific user.
 * Certain filters can be applied to specify search
 * Accepted filters:
 *     page={page number} - indicate page number
 *     limit={limit} - limit number of objects per page
 *
 * @param req object - request info
 * @returns {Promise<*|Promise<json>>} A promise that returns json with products if resolved,
 *    otherwise returns json with error message
 */
exports.getUserProducts = async function(req) {
  getBackRentedProducts(); // Change product status if rent date is expired
  try {
    let page = req.query.page ? req.query.page : 1;
    let limit = req.query.limit ? req.query.limit : 10;
    let promise = Product.paginate({owner: req.params.id}, {page: page, limit: limit, populate: {path: 'owner genres', select: 'name avatar role _id firstName lastName email'}});
    return promise.then((doc,err) => {
      if(err) { throw Error(err); }
      if(doc === null) { throw Error('No products found'); }
      return doc;
    });
  } catch (e) {
    throw Error('Error at getUserProduct services');
  }
};

/**
 * Update a product with new info.
 *
 * @param req object - request info
 * @returns {Promise<*|Promise<json>>} A promise that returns json with updated product if resolved,
 *    otherwise returns json with error message
 */
exports.updateProduct = async function(req) {
  try {
    let promise = Product.findOne({_id: req.params.id});
    return promise.then((product,err) => {
      if(product === null) { throw Error('Product not found'); }

      let image = [];
      if (req.file){
        image.push(new BufferToString().convert(req.file.mimetype, req.file.buffer));
        product.images= image;
      }

      product.title= req.body.title;
      product.description= req.body.description;
      product.genres= req.body.genres;
      product.price= req.body.price;
      product.status= req.body.status;
      product.edited= Date.now();
      product.producer= req.body.producer;
      product.esrb= req.body.esrb;

      return product.save();
    });
  } catch(e){
    throw {error: e, message: 'Error on product update'};
  }
};

/**
 * Delete a product from DB
 *
 * @param id string - article id
 * @returns {Promise<*|Promise<json>>} A promise that returns json with deleted product if resolved,
 *    otherwise returns json with error message
 */
exports.deleteProduct = function(id) {
  try {
    let promise = Product.findByIdAndDelete(id).exec();
    return promise.then((doc,err) => {
      if(err) { throw Error(err); }
      if(doc === null) { throw Error('Product not found'); }
      return doc;
    });
  } catch (e) {
    throw {error: e, message: 'Error on product delete.'};
  }
};

/**
 * Rate a product.
 * Adds a mark in product rating field and calculates rating average.
 *
 * @param req object - request info
 * @returns {Promise<*|Promise<json>>} A promise that returns json with updated product if resolved,
 *    otherwise returns json with error message
 */
exports.rateProduct = function (req) {
  try {
    let promise = Product.findById(req.params.id);
    return promise.then((product) => {
      if(product === null) { throw Error('Product not found'); }

      // Check if user already voted
      let votes = product.rating;
      for(let i = 0; i < votes.length; i++) {
        if(String(votes[i].rated_by) === String(req.user._id)) {
          throw Error('You have already voted');
        }
      }
      //Add new rating
      product.rating.push({mark: req.body.mark, rated_by: req.user._id});

      // Calculate average rating
      let summ = 0,
        count = 0;
      let marks = product.rating;

      // Check if product was rated
      if(marks.length > 0) {
        // Calculating average rating
        for(let i=0; i < marks.length; i++) {
          summ = summ + marks[i].mark;
          count++;
          product.average_rating = (summ / count).toFixed(1);
        }
      }
      return product.save();
    });
  } catch (e) {
    throw {error: e, message: 'Error at rate product services'};
  }
};

/**
 * Add a comment to product
 *
 * @param req object - request info
 * @returns {Promise<*|Promise<json>>} A promise that returns json with commented product if resolved,
 *    otherwise returns json with error message
 */
exports.addProductComment = function (req) {
  try {
    let promise = Product.findOne({_id: req.params.id});
    return promise.then((product, err) => {
      if (product === null || err) { throw Error('Product not found'); }
      product.comment.push({user: req.user._id, content: req.body.content});
      return product.save();
    });
  } catch(e) {
    throw {error: e, message: 'Error on add product comment'};
  }
};


/**
 * Searches product with 'rented' status that rent day is expired
 * and changes back product status.
 */
function getBackRentedProducts() {
  Product.find({rented_until: {$lte: Date.now()}}).then((product, err) => {
    if(err) {throw Error(err);}
    product.forEach(function(item) {
      Product.updateOne({_id: item._id}, {$set: {status: ['for rent']}, $unset: {rented_until: ''}}).exec();
    });
  });
}
