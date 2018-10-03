import express from 'express';

const router = express.Router();
const passport = require('passport');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/image/avatars');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  console.log(file.mimetype)
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
import multer from 'multer';

const upload = multer({
    storage: storage,
    limits: {fileSize: 1024 * 1024 * 4,},
  fileFilter: fileFilter
  })
;

// Importing Controller
import UserController from '../controllers/user.controller';
import ProductController from '../controllers/product.controller';
import ArticleController from '../controllers/article.controller';

router.post('/', upload.single('avatar'), UserController.createUser);
router.post('/login', passport.authenticate('local'), UserController.authenticate);
router.get('/', UserController.getUsers); // Get list of all users
router.get('/session', UserController.getSessionUser); // Get user from session
router.get('/:id', UserController.getUser); // Get user by it's id

router.get('/:id/rating', UserController.getUserRating); // Get user rating by it's id

router.get('/:id/articles', ArticleController.getUserArticles); //Get articles list of a user
router.get('/:id/products', ProductController.getUserProducts); //Get products list of a user

router.put('/', UserController.updateUserInfo); //Update user data without password
router.put('/password', UserController.updateUserPassword); //Change user password
router.put('/role', UserController.updateUserRole); //Change user role
router.put('/:id/status', UserController.updateUserStatus); //Change user status
router.put('/:id/rating', UserController.rateUser); //Rate user


router.post('/logout', (req, res) => {
  if (req.user) {
    req.logout();
    res.send({msg: 'logging out'});
  } else {
    res.send({msg: 'no user to log out'});
  }
});

// router.get('/logout',UserController.logout);

router.get('/profile',
  UserController.checkAuth,
  (req, res) => {
    res.send('profile page');
  });


module.exports = router;
