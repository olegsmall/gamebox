import express from 'express';

// Importin Controller
import UserController from '../controllers/user.controller';

const router = express.Router();

router.get('/signeup', UserController.createUser);




module.exports = router;
