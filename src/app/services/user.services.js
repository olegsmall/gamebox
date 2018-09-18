// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const passport = require('passport');

var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//TODO : Return an error when user was not registerd

exports.createUser = async function(req) {
  let newUser = await User.register(new User({
    username : req.body.username,
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    avatar: req.body.avatar,
  }),req.body.password, (err, user) => {
    if (err) {
      console.log(err);
      throw Error(err);
    }
  });
  console.log('show user', newUser);

  if(newUser) {
    return newUser;
  }
  throw Error('User already exists');

  // passport.authenticate('local', {failureRedirect: '/user/home'});

};

exports.getUsers = async function(query, page, limit) {

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


exports.authenticate = async function(req, res, next) {

};