
exports.checkAuth = function (req, res, next){
  if (req.isAuthenticated()) {
    if(req.user.status.state === 'deactivated') {
      req.logout();
      return res.status(401).json({status: 400, message: 'Please log in to access this section'});
    } else if (req.user.status.state === 'banned') {
      req.logout();
      return res.status(401).json({status: 400, message: 'Please log in to access this section'});
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