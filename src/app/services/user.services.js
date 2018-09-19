// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
import ResponseException from './ResponseException';
// const passport = require('passport');

// var LocalStrategy = require('passport-local').Strategy;

// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

//TODO : Return an error when user was not registerd

exports.createUser = async function (req) {

  // Validation
  // let result;
  //Is user name is already in database.
  const user = await User.findOne({email: req.body.email});
  if (user) throw new ResponseException(409, 'User already exists');
  else {
    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      password: req.body.password,
    });
    const savedUser = await newUser.save();
    return savedUser;

  }
};

exports.getUsers = async function (query, page, limit) {

  // Options setup for the mongoose paginate
  let options = {
    page,
    limit
  };

  // Try Catch the awaited promise to handle the error
  try {
    let users = await User.paginate(query, options);
    // Return the user list that was returned by the mongoose promise
    return users;
  } catch (e) {
    // return a Error message describing the reason
    throw Error('Error while Paginating Users');
  }
};


// exports.authenticate = async function (req, res, next) {
//
// };
