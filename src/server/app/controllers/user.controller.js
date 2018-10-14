/**
 * Created by: Oleg Smolovik
 * Created: 10 Sept 2018
 * Edited: 11 Oct 2018 by Peter Yablochkin
 *
 * @fileoverview Manages user methods operations.
 * @module controllers/user.controller
 * @requires ResponseException
 * @requires UserService
 */

// Import ResponseException
import ResponseException from '../services/ResponseException';
// Import User services
import UserService from '../services/user.services';
// Import Passport
import passport from 'passport';

/**
 * Manages user creation feature
 *
 * @param req object - request info
 * @param res object - response info
 * @param next function - middleware function
 * @returns {Promise<*|Promise<json>>} A promise that returns json if resolved, otherwise json with error
 */
exports.createUser = async function (req, res, next) {
  try {
    // Execute user create method.
    let newUser = await UserService.createUser(req, res, next);
    // Return created user info, appropriate HTTP Status Code and Message.
    return res.status(201).json({status: 201, data: newUser, message: 'User Created Successfully'});
  } catch (e) {
    //Return Error Message with HTTP Status Code.
    if (e instanceof ResponseException && e.code === 409)
      return res.status(409).json({status: 409, message: e.message});
    return res.status(400).json({status: 400, message: e.message});
  }
};

/**
 * Manages search of existing users
 * Accepts query filters to precise search
 *
 * @param req object - request info
 * @param res object - response info
 * @returns {Promise<*|Promise<json>>} A promise that returns json if resolved, otherwise json with error
 */
exports.getUsers = async function (req, res) {
  try {
    // Execute user search method.
    let users = await UserService.getUsers(req);
    // Return users list, appropriate HTTP Status Code and Message.
    return res.status(200).json({status: 200, users: users, message: 'List of users received'});
  } catch (e) {
    //Return Error Message with HTTP Status Code.
    return res.status(400).json({status: 400, message: e.message});
  }
};

/**
 * Manages user authentication functionality
 *
 * @param req object - request info
 * @param res object - response info
 * @returns {Promise<*|Promise<json>>} A promise that returns json if resolved, otherwise json with error
 */
exports.authenticate = function (req, res, next) {
  // Return user, appropriate HTTP Status Code and Message.
  return res.status(200).json({status: 200, user: req.user, message: 'Authenticate successfully'});
};

exports.passportAuthenticate = function (req, res, next) {

  passport.authenticate('local', function (err, user, info) {
    if (err) {
      return res.status(500).json({status: 500, message: err});
    }
    if (!user) {
      return res.status(400).json({status: 400, message: 'User not found or password is incorrect'});
    }
    req.logIn(user, function (err) {
      if (err) {
        return res.status(500).json({status: 500, message: err});
      }
      return next();
    });
  })(req, res, next);

};


/**
 * Manages info of authenticated user authentication functionality
 *
 * @param req object - request info
 * @param res object - response info
 * @returns {Promise<*|Promise<json>>} A promise that returns json if resolved, otherwise json with error
 */
exports.getSessionUser = function (req, res) {
  try {
    // Return user, appropriate HTTP Status Code and Message.
    if (req.user) {
      res.status(200).json({status: 200, user: req.user, message: 'Authenticated successfully '});
    } else {
      res.status(200).json({status: 200, user: null, message: 'Session not found'});
    }
  } catch (e) {
    //Return Error Message with HTTP Status Code.
    return res.status(400).json({status: 400, message: e.message});
  }
};

exports.getUser = function (req, res) {
  //TODO: change this method
  try {
    if (req.user) {
      const user = {
        id: req.user._id,
        email: req.user.email,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        phone: req.user.phone,
        address: req.user.address,
        avatar: req.user.avatar,
        role: req.user.role,
      };
      res.status(200).json({status: 200, user: user, message: 'Authenticate granted'});
    } else {
      return res.status(403.21).json({status: 403.21, message: 'Source access denied'});
    }
  } catch (e) {
    //Return an Error Response Message with Code and the Error Message.
    return res.status(400).json({status: 400, message: e.message});
  }
};

/**
 * Manages user information update feature
 *
 * @param req object - request info
 * @param res object - response info
 * @returns {Promise<*|Promise<json>>} A promise that returns json if resolved, otherwise json with error
 */
exports.updateUserInfo = async function (req, res) {
  try {
    // Execute user info update method.
    let user = await UserService.updateUserInfo(req);
    // Return user with updated info, appropriate HTTP Status Code and Message.
    return res.status(201).json({status: 201, user: user, message: 'User updated successfully'});
  } catch (e) {
    //Return Error Message with HTTP Status Code.
    return res.status(409).json({status: 409, message: e.message});
  }
};

/**
 * Manages user password update feature
 *
 * @param req object - request info
 * @param res object - response info
 * @returns {Promise<*|Promise<json>>} A promise that returns json if resolved, otherwise json with error
 */
exports.updateUserPassword = async function (req, res) {
  try {
    // Execute user password update method.
    UserService.updateUserPassword(req);
    // Return appropriate HTTP Status Code and Message.
    return res.status(200).json({status: 200, message: 'Password updated successfully'});
  } catch (e) {
    //Return Error Message with HTTP Status Code.
    return res.status(409).json({status: 409, message: e.message});
  }
};

/**
 * Manages user role update feature
 *
 * @param req object - request info
 * @param res object - response info
 * @returns {Promise<*|Promise<json>>} A promise that returns json if resolved, otherwise json with error
 */
exports.updateUserRole = async function (req, res) {
  try {
    // Execute user role update method.
    let user = await UserService.updateUserRole(req);
    // Return user info, appropriate HTTP Status Code and Message.
    return res.status(201).json({status: 201, user: user, message: 'User role was successfully changed'});
  } catch (e) {
    //Return Error Message with HTTP Status Code.
    return res.status(400).json({status: 400, message: e.message});
  }
};

/**
 * Manages user status update feature
 *
 * @param req object - request info
 * @param res object - response info
 * @returns {Promise<*|Promise<json>>} A promise that returns json if resolved, otherwise json with error
 */
exports.updateUserStatus = async function (req, res) {
  try {
    // Execute user status update method.
    let user = await UserService.updateUserStatus(req);
    // Return user info, appropriate HTTP Status Code and Message.
    return res.status(201).json({status: 201, user: user, message: 'User status was successfully changed'});
  } catch (e) {
    //Return Error Message with HTTP Status Code.
    return res.status(400).json({status: 400, message: e.message});
  }
};

/**
 * Manages user rate feature
 *
 * @param req object - request info
 * @param res object - response info
 * @returns {Promise<*|Promise<json>>} A promise that returns json if resolved, otherwise json with error
 */
exports.rateUser = async function (req, res) {
  try {
    // Execute user rate method.
    let user = await UserService.rateUser(req);
    // Return user, ratings and appropriate HTTP Status Code and Message.
    return res.status(201).json({status: 201, user: user, message: 'User was successfully rated'});
  } catch (e) {
    //Return Error Message with HTTP Status Code.
    return res.status(400).json({status: 400, message: e.message});
  }
};

/**
 * Manages user statistics feature request
 *
 * @param req object - request info
 * @param res object - response info
 * @returns {Promise<*|Promise<json>>} A promise that returns json if resolved, otherwise json with error
 */
exports.userStatistics = async function (req, res) {
  try {
    // Execute statistics method.
    let statistics = await UserService.userStatistics(req);
    // Return user statistic info, appropriate HTTP Status Code and Message.
    return res.status(201).json({status: 201, statistics: statistics, message: 'Statistics received'});
  } catch (e) {
    //Return Error Message with HTTP Status Code.
    return res.status(400).json({status: 400, message: e.message});
  }
};


/**
 * Manages user logout request
 *
 * @param req object - request info
 * @param res object - response info
 * @returns {Promise<*|Promise<json>>} A promise that returns json if resolved, otherwise json with error
 */
exports.logout = async function (req, res) {
  try {
    req.session.destroy();
    //Return Error Message with HTTP Status Code.
    return res.status(201).json({status: 201, message: 'User successfully logged out'});
  } catch (e) {
    //Return Error Message with HTTP Status Code.
    return res.status(400).json({status: 400, message: e.message});
  }
};
