const UserService = require('../services/user.services');

exports.createUser = async function(req, res) {

  let user = {
    email: req.body.email,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  };

  try {

    let newUser = await UserService.createUser(user);
    return res.status(201).json({status: 201, data: newUser, message: 'User Created Successfully'});

  }catch(e){

    return res.status(400).json({status: 400, message: 'User was not created'});

  }
};
