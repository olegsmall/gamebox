/**
 * Created by: Peter Yablochkin
 * Created: 08 Oct 2018
 * Edited: 12 Oct 2018 by Peter Yablochkin
 *
 * @fileoverview Routes for message
 * @module routes/message.route
 */

// Importing modules & controllers
import express from 'express';
const router = express.Router();
import MessageController from '../controllers/message.controller';
import Auth from '../services/auth.services';

router.post('/', Auth.checkAuth, MessageController.sendMessage); // Send a message
router.get('/:id', Auth.checkAuth, MessageController.getMessage); // Get specific message

module.exports = router;
