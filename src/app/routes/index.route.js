import express from 'express';

// Importin Controller
import IndexController from '../controllers/index.controller';

const router = express.Router();

router.get('/', IndexController.index);




module.exports = router;
