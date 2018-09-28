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
        esrb: req.body.esrb,
        rating: req.body.rating,
        sold: req.body.sold,
        rented: req.body.rented,
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

  // Check if searching by title (uses %LIKE%)
  if(req.query.title) { query.title = new RegExp(req.query.title,'i'); }
  // Check if searching by product status (for rent, for sale, sold, rented)
  if(req.query.status.toLowerCase() === 'for rent' || req.query.status.toLowerCase() === 'for sale' || req.query.status.toLowerCase() === 'rented' || req.query.status.toLowerCase() === 'sold') {
    query.status = req.query.status.toLowerCase();
  }

  try {
    // Search objects with user options
    let promise = Product.paginate(query, queryOptions);

    return promise.then((doc) => {
      if(doc === null) { throw Error('No products found'); }
      return doc;
    });

  } catch (e) {
    throw {error: e, message: 'Error on get products'};
  }
};

exports.getUserProducts = async function(req) {
  try {
    let page = req.body.page ? req.body.page : 1;
    let limit = req.body.limit ? req.body.limit : 10;

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
      edited: Date.now()
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

