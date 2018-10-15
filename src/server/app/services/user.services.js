import BufferToString from "./BufferToString";

/**
 * Created by: Oleg Smolovik
 * Created: 17 Sept 2018
 * Edited: 12 Oct 2018 by Peter Yablochkin
 *
 * @fileoverview Treats received data and executes queries for products.
 * @module services/product.services
 * @requires product.model
 */

// Import models & modules
const User = require('../models/user.model');
const Order = require('../models/order.model');
const Product = require('../models/product.model');
const Article = require('../models/article.model');
import ResponseException from './ResponseException';

/**
 * Creates a new user in DB.
 * Accepts image uploading as profile image.
 *
 * @param req object - request info
 * @returns {Promise<*|Promise<json>>} A promise that returns json with created product if resolved,
 *    otherwise returns json with error message
 */
exports.createUser = async function (req) {
  //If user name is already in database.
  const user = await User.findOne({email: req.body.email});
  if (user) {
    throw new ResponseException(409, 'User already exists');
  } else {
    //user profile image
    let image = '/image/default/default_avatar.png';
    if (req.file){
      image = new BufferToString().convert(req.file.mimetype, req.file.buffer);
    }
    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      avatar: image,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      status: {state: 'deactivated'},
      password: req.body.password
    });
    return await newUser.save();
  }
};

/**
 * Gets all users existing in DB.
 * Certain filters can be applied to specify search
 * Accepted filters:
 *     page={page number} - indicate page number
 *     limit={limit} - limit number of objects per page
 *     sort={sort order} - sorting order (asc/desc)
 *     user={deactivated} - search product by status
 *     firstName={firstName} - search user by first name (uses %LIKE%)
 *     sort_by={param} - filter to apply.
 *
 * @param req object - request info
 * @returns {Promise<*|Promise<json>>} A promise that returns json with user if resolved,
 *    otherwise returns json with error message
 */
exports.getUsers = async function (req) {
  let queryOptions = {}; // Mongoose-paginator query options
  let query = {}; // Mongoose query options
  let sort = 'desc'; // Default sorting method -> Descending

  queryOptions.select = '_id avatar role firstName lastName status email';
  req.query.page ? queryOptions.page = Number(req.query.page) : 1;
  req.query.limit ? queryOptions.limit = Number(req.query.limit) : 10;
  if(req.query.sort === 'asc') { sort = 'asc'; }
  if(req.query.sort_by === 'name') { queryOptions.sort = { firstName: sort }; }
  if(req.query.firstName) { query.firstName = new RegExp(req.query.firstName,'i'); }
  if(req.query.user === 'deactivated') { query.status = {state:'deactivated'} }
  try {
    let users = User.paginate(query, queryOptions);
    // Return the user list that was returned by the mongoose promise
    return users.then((docs) => {
      if(docs === null) { throw Error('No users found'); }
      return docs;
    });
  } catch (e) {
    throw Error('Error at get users services');
  }
};

/**
 * Search specific user by ID.
 * Skips user password on promise return.
 *
 * @param req object - request info
 * @returns {Promise<*|Promise<json>>} A promise that returns json with user if resolved,
 *    otherwise returns json with error message
 */
exports.getUser = async function (req) {
  // Try Catch the awaited promise to handle the error
  try {
    let users = User.findOne({_id: req.params.id}).select('-password');
    // Return the user list that was returned by the mongoose promise
    return users.then((docs) => {
      if(docs === null) { throw Error('No users found'); }
      return docs;
    });
  } catch (e) {
    // return a Error message describing the reason
    throw Error('Error at get users services');
  }
};

/**
 * Update user's profile information.
 * Accepts image uploading as profile image.
 * Does not update user password.
 *
 * @param req object - request info
 * @returns {Promise<*|Promise<json>>} A promise that returns json with updated user info if resolved,
 *    otherwise returns json with error message
 */
exports.updateUserInfo = function (req) {
  try {
    let promise = User.findById(req.user._id, {password: 0}).select('-password');
    return promise.then((user) => {
      if(user === null) { throw Error('User not found'); }
      if (req.file){
        user.avatar = new BufferToString().convert(req.file.mimetype, req.file.buffer);
      }
      user.firstName = req.body.firstName;
      user.lastName = req.body.lastName;
      user.phone = req.body.phone;
      user.address = req.body.address;
      return user.save();
    });
  } catch(e){
    throw {error: e, message: 'Error at change user role services'};
  }
};

/**
 * Update user password.
 *
 * @param req object - request info
 * @returns json with error if promise is not resolved.
 */
exports.updateUserPassword = function (req) {
  try {
    return User.findById(req.user._id, (err, doc) => {
      if (err) throw Error('Error on password update');
      doc.password = req.body.password;
      doc.save();
    });
  } catch(e){
    throw {error: e, message: 'Error at user update services'};
  }
};

/**
 * Update user role.
 * Password field is skipped on return
 *
 * @param req object - request info
 * @returns {Promise<*|Promise<json>>} A promise that returns json with updated user info if resolved,
 *    otherwise returns json with error message
 */
exports.updateUserRole = function (req) {
  try {
    let promise = User.findById(req.body.id, {password: 0});
    return promise.then((user) => {
      if(user === null) {
        throw Error('User not found');
      }
      user.role = req.body.role;
      return user.save();
    });
  } catch(e){
    throw {error: e, message: 'Error at update user role services'};
  }
};

/**
 * Update user status.
 * Password field is skipped on return
 *
 * @param req object - request info
 * @returns {Promise<*|Promise<json>>} A promise that returns json with updated user info if resolved,
 *    otherwise returns json with error message
 */
exports.updateUserStatus = function (req) {
  try {
    let promise = User.findById(req.params.id, {password: 0});
    return promise.then((user) => {
      if(user === null) { throw Error('User not found'); }
      user.status.state = req.body.status;
      if(req.body.expires) {
        let date = new Date();
        user.status.expires = date.addDays(Number(req.body.expires));
      }
      return user.save();
    });
  } catch (e) {
    throw {error: e, message: 'Error at update user status services'};

  }
};

/**
 * Rate user.
 * Adds a mark to user profile and calculates rating average
 * Password field is skipped on return
 *
 * @param req object - request info
 * @returns {Promise<*|Promise<json>>} A promise that returns json with updated user info if resolved,
 *    otherwise returns json with error message
 */
exports.rateUser = function (req) {
  try {
    let promise = User.findById(req.params.id, {password: 0});
    return promise.then((user) => {
      if(user === null) { throw Error('User not found'); }
      // Check if user already voted
      let votes = user.rating;
      for(let i = 0; i < votes.length; i++) {
        if(String(votes[i].rated_by) === String(req.user._id) || String(req.user._id) === String(req.params.id)) {
          throw Error('You have already voted');
        }
      }
      //Add new rating
      user.rating.push({mark: req.body.mark, rated_by: req.user._id});
      // Calculate average rating
      let summ = 0,
        count = 0;
      let marks = user.rating;
      // Check if product was rated
      if(marks.length > 0) {
        // Calculating rating
        for(let i=0; i < marks.length; i++) {
          summ = summ + marks[i].mark;
          count++;
          user.average_rating = (summ / count).toFixed(1);
        }
      }
      return user.save();
    });
  } catch (e) {
    throw {error: e, message: 'Error at rate user services'};

  }
};


/**
 * User statistics.
 * Gathers statistics based on user activities.
 * Searched activities:
 *    products added,
 *    how many products added by user were sold
 *    how many products added by user were rented
 *    how many orders user made
 *    how many articles user has posted
 *    how many articles user has commented
 *    how many products user has commented
 *
 * @param req object - request info
 * @returns {Promise<*|Promise<json>>} A promise that returns json with user statistics if resolved,
 *    otherwise returns json with error message
 */
exports.userStatistics = async function (req) {
  let statistics = {};
  try {
    await Product.find({owner: req.user._id}).then((products, err) => {
      if(err) {throw Error(err);} // Show error in case
      statistics.products_added = products.length;
    });

    await Product.find({owner: req.user._id, status: 'sold'}).then((products, err) => {
      if(err) {throw Error(err);} // Show error in case
      statistics.sold = products.length;
    });

    await Product.find({owner: req.user._id, status: 'rented'}).then((products, err) => {
      if(err) {throw Error(err);} // Show error in case
      statistics.rented = products.length;
    });

    await Order.find({buyer: req.user._id}).then((products, err) => {
      if(err) {throw Error(err);} // Show error in case
      statistics.ordered = products.length;
    });

    await Article.find({author: req.user._id}).then((articles, err) => {
      if(err) {throw Error(err);} // Show error in case
      statistics.posted_articles = articles.length;
    });

    await Article.find({'comment.user': req.user._id}).then((articles, err) => {
      if(err) {throw Error(err);} // Show error in case
      statistics.commented_articles = articles.length;
    });

    await Product.find({'comment.user': req.user._id}).then((products, err) => {
      if(err) {throw Error(err);} // Show error in case
      statistics.commented_products = products.length;
    });

    return statistics;

  } catch (e) {
    throw Error('Error at Order Statistics');
  }
};

/**
 * Calculate date.
 * Summarize actual date with days sent in parameters.
 *
 * @param days int - days to add to date field in DB
 * @returns date string - actual date + number of days in Date format
 */
Date.prototype.addDays = function(days) {
  let date = new Date(this.valueOf());
  date.setDate(date.getDate() + Number(days));
  return date;
};
