import ResponseException from '../services/ResponseException';

const UserService = require('../services/user.services');


exports.createUser = async function(req, res, next) {
  try {
    console.log('Creating new User');
    let newUser = await UserService.createUser(req, res, next);
    return res.status(201).json({status: 201, data: newUser, message: 'User Created Successfully'});

  }catch(e){
    // if (e.code === 400)
    //   return res.status(400).json({status: 400, message: e.message});
    if(e instanceof ResponseException && e.code === 409)
      return res.status(409).json({status: 409, message: e.message});

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
  try {
    let user = await UserService.authenticate(req.body.email, req.body.password);

    // Return the users list with the appropriate HTTP Status Code and Message.
    return res.status(200).json({status: 200, data: user, message: 'Authenticate successfully'});

  } catch(e) {

    //Return an Error Response Message with Code and the Error Message.
    return res.status(400).json({status: 400, message: e.message});
  }
};

exports.logout = async function(req, res) {
  req.logout();
  res.redirect('/');
};

exports.checkAuth = function (req, res, next){
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
};
