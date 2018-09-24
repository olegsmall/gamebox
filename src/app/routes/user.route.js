import express from 'express';
const router = express.Router();
const passport = require('passport');

// Importing Controller
import UserController from '../controllers/user.controller';

router.post('/',UserController.createUser);

router.post('/login', passport.authenticate('local'), UserController.authenticate);

router.get('/', (req, res, next) => {
  if (req.user) {
    res.json({ user: req.user });
  } else {
    res.json({ user: null });
  }
});

router.post('/logout', (req, res) => {
  if (req.user) {
    req.logout();
    res.send({ msg: 'logging out' });
  } else {
    res.send({ msg: 'no user to log out' });
  }
});
// router.post('/register',UserController.createUser);

router.get('/get-users',UserController.getUsers);

router.get('/signin',(req,res) => {
  res.send('<form method="post" action="/user/login">' +
    '<input type="text" value="test" name="username"/>' +
    '<input type="text" value="test" name="password"/>' +
    '<input type="submit" value="test"/>' +
    '</form>');
});

//TODO : Move auth to controller and user.services
// router.post('/login',
//   passport.authenticate('local', {failureRedirect: '/user/signin'}),
//   (req, res) => {
//     res.redirect('/user/profile');
//   });

// router.get('/logout',UserController.logout);

router.get('/profile',
  UserController.checkAuth,
  (req, res) => {
    res.send('profile page');
  });


module.exports = router;
