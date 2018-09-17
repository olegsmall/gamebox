const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const passport = require('passport');
const LocalStrategy = require('passport-local');

exports.createUser = async function(user) {

  // Creating a new Mongoose Object by using the new keyword
  let newUser = new User({
    username: user.username,
    email: user.email,
    avatar: user.avatar,
    firstName: user.firstName,
    lastName: user.lastName,
    password: await bcrypt.hash(user.password, 10)
  });


  let userBD = await User.findOne({email: newUser.email});
  if(userBD === null) {
    // Saving the User
    return await newUser.save();
  }
  throw Error('User already exists');
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


exports.authenticate = async function(email, password) {

  passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user || !user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect username or password' });
        }
        return done(null, user);
      });
    }
  ));
};