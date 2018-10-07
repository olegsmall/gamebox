const Product = require('../models/product.model');
const Genre = require('../models/genre.model');
const User = require('../models/user.model');
const {mongoose} = require('../../config/app.config');
const idvalidator = mongoose.Types.ObjectId.isValid; //Mongoose objectId validator

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
        esrb: req.body.esrb,
        producer: req.body.producer
      });
      return product.save();
    });
  } catch (e) {
    throw {error: e, message: 'Product creation error'};
  }
};

exports.getProducts = function (req) {

  let queryOptions = {}; // Mongoose-paginator query options
  let query = {}; // Mongoose query options

  let sort = 'desc'; // Default sorting method -> Descending
  // Populate query fields
  queryOptions.populate = {path: 'genres owner', select: '_id name firstName lastName e-mail'};
  // Check the existence of the query parameters, If the exists doesn't exists assign a default value
  //Page option
  req.query.page ? queryOptions.page = Number(req.query.page) : 1;
  // Limit number of returning objects
  req.query.limit ? queryOptions.limit = Number(req.query.limit) : 10;
  // Check if sort option is different from default(desc)
  if(req.query.sort === 'asc') { sort = 'asc'; }
  // Check if sorting by title is chosen
  if(req.query.sort_by === 'title') { queryOptions.sort = { title: sort}; }
  // Check if sorting by selling price is chosen
  if(req.query.sort_by === 'sell') { queryOptions.sort = { 'price.sell': sort}; }
  // Check if sorting by rent price is chosen
  if(req.query.sort_by === 'rent') { queryOptions.sort = { 'price.rent': sort}; }
  // Check if sorting by date is chosen
  if(req.query.sort_by === 'date') { queryOptions.sort = { added: sort}; }

  if(req.query.sort_by === 'rating') { queryOptions.sort = { 'average_rating': sort}; }
  if(req.query.rating) { query.average_rating = req.query.rating; }
  if(req.query.sort_by === 'popular') { query.average_rating = {$gte: 4}; }

  // Check if searching by title (uses %LIKE%)
  if(req.query.title) { query.title = new RegExp(req.query.title,'i'); }
  // Check if searching by product status (for rent, for sale, sold, rented)
  if(req.query.status === 'for rent' || req.query.status === 'for sale' || req.query.status === 'rented' || req.query.status === 'sold') {
    query.status = req.query.status;
  }

  try {
    // Search objects with user options
    return Product.paginate(query, queryOptions).then((docs) => {
      if(docs === null) { throw Error('No products found'); }

      return docs;
    });
  } catch (e) {
    throw {error: e, message: 'Error on get products'};
  }
};

exports.getUserProducts = async function(req) {
  try {
    let page = req.query.page ? req.query.page : 1;
    let limit = req.query.limit ? req.query.limit : 10;

    let promise = Product.paginate({owner: req.params.id}, {page: page, limit: limit, populate: {path: 'owner genres', select: 'name avatar role _id firstName lastName email'}});

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
    return Product.findById(id).populate('genres').then((doc) => {
      if(doc === null) { throw Error('Product not found'); }

      return doc;
    });
  } catch (e) {
    throw {error: e, message: 'Error on get product'};
  }
};


exports.updateProduct = async function(req) {
  try {
    let promise = Product.findById(req.params.id);

    return promise.then((product) => {
      if(product === null) { throw Error('Product not found'); }

      product.title= req.body.title;
      product.description= req.body.description;
      product.images= req.body.images;
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

exports.rateProduct = function (req) {
  try {
    let promise = Product.findById(req.params.id);

    return promise.then((product) => {
      if(product === null) { throw Error('Product not found'); }

      // Check if product already voted
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
        // Calculating rating
        for(let i=0; i < marks.length; i++) {
          summ = summ + marks[i].mark;
          count++;
          product.average_rating = (summ / count).toFixed(1);
        }
      }
      return product.save();
    });

  } catch (e) {
    throw {error: e, message: 'Error at rate user services'};

  }
};

exports.addProductComment = function (req) {
  try {
    let promise = Product.findById({_id: req.params.id});

    return promise.then((product, err) => {
      if (product === null || err) { throw Error('Product not found'); }
      product.comment.push({user: req.user._id, content: req.body.content});

      return product.save();
    });
  } catch(e) {
    throw {error: e, message: 'Error on add product comment'};
  }
};
