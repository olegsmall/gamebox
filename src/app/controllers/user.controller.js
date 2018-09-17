const UserService = require('../services/user.services');
const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;

exports.createUser = async function(req, res) {

  let user = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    avatar: req.body.avatar
  };

  try {

    let newUser = await UserService.createUser(user);
    return res.status(201).json({status: 201, data: newUser, message: 'User Created Successfully'});

  }catch(e){
    return res.status(400).json({status: 400, message: e.message});
  }
};


exports.getUsers = async function(req, res, next) {

  // Check the existence of the query parameters, If the exists doesn't exists assign a default value
  let page = req.query.page ? req.query.page : 1;
  let limit = req.query.limit ? req.query.limit : 10;

  try {

    let users = await UserService.getUsers({}, page, limit);

    // Return the users list with the appropriate HTTP Status Code and Message.
    return res.status(200).json({status: 200, data: users, message: 'Successfully Users Received'});

  } catch(e) {

    //Return an Error Response Message with Code and the Error Message.
    return res.status(400).json({status: 400, message: e.message});

  }
};

exports.authenticate = async function(req, res, next) {

  passport.authenticate('local')(req, res, function () {
    res.redirect('/');
  });

  // try {
  //
  //   let user = await UserService.authenticate(req.body.email, req.body.password);
  //
  //   // Return the users list with the appropriate HTTP Status Code and Message.
  //   return res.status(200).json({status: 200, data: user, message: 'Authenticate successfully'});
  //
  // } catch(e) {
  //
  //   //Return an Error Response Message with Code and the Error Message.
  //   return res.status(400).json({status: 400, message: e.message});
  //
  // }


};

module.exports.logout = function(req, res) {
  req.logout();
  res.redirect('/');
};

exports.checkAuth = function (req, res, next){
  req.isAuthenticated()
    ? next()
    : res.redirect('/');
};