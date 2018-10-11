import express from 'express';
const router = express.Router();

// Importing Controller
import MessageController from '../controllers/message.controller';

router.post('/', MessageController.sendMessage); // Send a message
router.get('/:id', MessageController.getMessage); // Get specific message

module.exports = router;
