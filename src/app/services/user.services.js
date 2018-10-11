// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const Order = require('../models/order.model');
const Product = require('../models/product.model');
const Article = require('../models/article.model');

import ResponseException from './ResponseException';


exports.createUser = async function (req) {

  // Validation
  // let result;
  //If user name is already in database.
  const user = await User.findOne({email: req.body.email});
  if (user) {
    throw new ResponseException(409, 'User already exists');
  } else {

    let avatarFilePath;
    if (req.file){
      avatarFilePath = '/image/avatars/' + req.file.filename;
    } else {
      avatarFilePath = '/image/default/default_avatar.png';
    }

    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      avatar: avatarFilePath,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      status: {state: 'deactivated'},
      password: req.body.password
    });
    return await newUser.save();
  }
};

exports.getUsers = async function (req) {

  let queryOptions = {}; // Mongoose-paginator query options
  let query = {}; // Mongoose query options

  let sort = 'desc'; // Default sorting method -> Descending
  queryOptions.select = '_id avatar role firstName lastName status email';
  // Check the existence of the query parameters, If the exists doesn't exists assign a default value
  //Page option
  req.query.page ? queryOptions.page = Number(req.query.page) : 1;
  // Limit number of returning objects
  req.query.limit ? queryOptions.limit = Number(req.query.limit) : 10;
  // Check if sort option is different from default(desc)
  if(req.query.sort === 'asc') { sort = 'asc'; }
  // Check if sorting by title is chosen
  if(req.query.sort_by === 'name') { queryOptions.sort = { firstName: sort }; }

  // Search by firstname query
  if(req.query.firstName) { query.firstName = new RegExp(req.query.firstName,'i'); }

  if(req.query.user === 'deactivated') { query.status = {state:'deactivated'} }

  // Try Catch the awaited promise to handle the error
  try {
    let users = User.paginate(query, queryOptions);
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

exports.updateUserInfo = function (req) {
  try {
    let promise = User.findById(req.user._id, {password: 0});

    return promise.then((user) => {
      if(user === null) { throw Error('User not found'); }

      if (req.file){
        user.avatar = '/image/avatars/' + req.file.filename;
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

Date.prototype.addDays = function(days) {
  console.log('datys',days);
  let date = new Date(this.valueOf());
  date.setDate(date.getDate() + Number(days));
  return date;
};



exports.userStatistics = async function (req) {
  let statistics = {};
  try {
    await Product.find({owner: req.params.id}).then((products, err) => {
      if(err) {throw Error(err);} // Show error in case
      statistics.products_added = products.length;
    });

    await Product.find({owner: req.params.id, status: 'sold'}).then((products, err) => {
      if(err) {throw Error(err);} // Show error in case
      statistics.sold = products.length;
    });

    await Product.find({owner: req.params.id, status: 'rented'}).then((products, err) => {
      if(err) {throw Error(err);} // Show error in case
      statistics.rented = products.length;
    });

    await Order.find({buyer: req.params.id}).then((products, err) => {
      if(err) {throw Error(err);} // Show error in case
      statistics.ordered = products.length;
    });

    await Article.find({author: req.params.id}).then((articles, err) => {
      if(err) {throw Error(err);} // Show error in case
      statistics.posted_articles = articles.length;
    });

    await Article.find({'comment.user': req.params.id}).then((articles, err) => {
      if(err) {throw Error(err);} // Show error in case
      statistics.commented_articles = articles.length;
    });

    await Product.find({'comment.user': req.params.id}).then((products, err) => {
      if(err) {throw Error(err);} // Show error in case
      statistics.commented_products = products.length;
    });

    return statistics;

  } catch (e) {
    throw Error('Error at Order Statistics');
  }
};