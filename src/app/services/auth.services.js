
exports.checkAuth = function (req, res, next){
  if (req.isAuthenticated()) {
    if(req.user.status.state === 'deactivated') {
      req.logout();
      return res.status(401).json({status: 400, message: 'Your account is awaiting to be activated by Administrators'});
    } else if (req.user.status.state === 'banned') {
      if(req.user.status.expires > Date.now()) {
        req.logout();
        return res.status(401).json({status: 400, message: 'Sorry but your account is banned'});
      }
      return next();
    }
    return next();
  }
  return res.status(401).json({status: 400, message: 'Please log in to access this section'});
};

exports.checkAdminRole = function (req, res, next){
  console.log(req.user.role);
  if (req.user.role === 'Administrator' || req.user.role === 'SuperUser') {
    return next();
  }
  return res.status(401).json({status: 400, message: 'Sorry, only Administrators can access this section'});
};

exports.checkSuperUserRole = function (req, res, next){
  console.log(req.user.role);
  if (req.user.role === 'SuperUser') {
    return next();
  }
  return res.status(401).json({status: 400, message: 'Sorry, you cannot access this section'});
};