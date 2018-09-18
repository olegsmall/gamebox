import express from 'express';
const passport = require('passport');
const router = express.Router();

// Importing Controller
import UserController from '../controllers/user.controller';


router.post('/register',UserController.createUser);

router.get('/get-users',UserController.getUsers);

router.get('/signin',(req,res) => {
  res.send('<form method="post" action="/user/login">' +
    '<input type="text" value="test" name="username"/>' +
    '<input type="text" value="test" name="password"/>' +
    '<input type="submit" value="test"/>' +
    '</form>');
});

//TODO : Move auth to controller and user.services
router.post('/login',
  passport.authenticate('local', {failureRedirect: '/user/signin'}),
  (req, res) => {
    res.redirect('/user/profile');
  });

router.get('/logout',UserController.logout);

router.get('/profile',
  UserController.checkAuth,
  (req, res) => {
    res.send('profile page');
  });


module.exports = router;
