// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
import ResponseException from './ResponseException';


exports.createUser = async function (req) {

  // Validation
  // let result;
  //If user name is already in database.
  const user = await User.findOne({email: req.body.email});
  if (user) {
    throw new ResponseException(409, 'User already exists');
  } else {
    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      password: req.body.password,
    });
    return await newUser.save();
  }
};

exports.getUsers = async function (req) {

  let queryOptions = {}; // Mongoose-paginator query options
  let query = {}; // Mongoose query options

  let sort = 'desc'; // Default sorting method -> Descending
  queryOptions.select = '_id avatar role firstName lastName';
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

      user.firstName = req.body.firstName;
      user.lastName = req.body.lastName;
      user.email = req.body.email;
      user.avatar = req.body.avatar;
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
    throw {error: e, message: 'Error at change user role services'};
  }
};

exports.updateUserStatus = function (req) {
  try {
    let promise = User.findById(req.body.id, {password: 0});

    return promise.then((user) => {
      if(user === null) { throw Error('User nt found'); }

      user.status = req.body.status;

      return user.save();
    }, {new: true});

  } catch (e) {
    throw {error: e, message: 'Error at change user status services'};

  }
};

// exports.authenticate = function (req, res) {
//
// };
