const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

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

  try {
    // Saving the User
    return await newUser.save();
  } catch(e) {
    // return an Error message describing the reason
    throw Error('Error while Creating User');
  }
};
