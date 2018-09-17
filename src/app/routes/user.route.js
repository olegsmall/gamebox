import express from 'express';

// Importing Controller
import UserController from '../controllers/user.controller';

const router = express.Router();

router.post('/register',UserController.createUser);

router.post('/login',UserController.authenticate);

router.get('/get-users',UserController.getUsers);


module.exports = router;
