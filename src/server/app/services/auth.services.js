/**
 * Created by: Peter Yablochkin
 * Created: 10 Oct 2018
 * Edited: 11 Oct 2018 by Peter Yablochkin
 *
 * @fileoverview Contains authentication check methods which are used in route files to check user role/status.
 * @module services/auth.services
 */


/**
 * User authentication check middleware.
 * Checks if user authenticated and user status to let user to pass or block from method usage
 *
 * @param req object - request info
 * @param res object - response methods
 * @param next object - middleware
 * @returns json - if there is an error, otherwise executes next() middleware to continue script execution
 */
exports.checkAuth = function (req, res, next){
  // Check if user is authenticated
  if (req.isAuthenticated()) {
    // Check user status
    if(req.user.status.state === 'deactivated') {
      req.logout();
      return res.status(401).json({status: 400, message: 'Your account is awaiting to be activated by Administrators'});
    } else if (req.user.status.state === 'banned') {
      if(req.user.status.expires > Date.now()) {
        req.logout();
        return res.status(401).json({status: 400, message: 'Sorry your account is temporary banned'});
      }
      return res.status(401).json({status: 400, message: 'Sorry your account is permanently banned'});
    }
    // If user status = activated, continue script
    return next();
  }
  return res.status(401).json({status: 400, message: 'Please log in to access this section'});
};

/**
 * User role check middleware.
 * Checks if user has Administrator/SuperUser role
 *
 * @param req object - request info
 * @param res object - response methods
 * @param next object - middleware
 * @returns json - if there is an error, otherwise executes next() middleware to continue script execution
 */
exports.checkAdminRole = function (req, res, next){
  if (req.user.role === 'Administrator' || req.user.role === 'SuperUser') {
    return next();
  }
  return res.status(401).json({status: 400, message: 'Sorry, only Administrators can access this section'});
};

/**
 * User role check middleware.
 * Checks if user has SuperUser role
 *
 * @param req object - request info
 * @param res object - response methods
 * @param next object - middleware
 * @returns json - if there is an error, otherwise executes next() middleware to continue script execution
 */
exports.checkSuperUserRole = function (req, res, next){
  console.log(req.user.role);
  if (req.user.role === 'SuperUser') {
    return next();
  }
  return res.status(401).json({status: 400, message: 'Sorry, you cannot access this section'});
};