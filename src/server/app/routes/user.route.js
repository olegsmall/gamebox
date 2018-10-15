/**
 * Created by: Oleg Smolovik
 * Created: 15 Sept 2018
 * Edited: 11 Oct 2018 by Peter Yablochkin
 *
 * @fileoverview Routes for user actions
 * @module routes/user.route
 */

import express from 'express';
const router = express.Router();
// Importing Controller
import UserController from '../controllers/user.controller';
import ProductController from '../controllers/product.controller';
import ArticleController from '../controllers/article.controller';
import OrderController from '../controllers/order.controller';
import MessageController from '../controllers/message.controller';
import Auth from '../services/auth.services';
import imageUploader from '../services/memoryStorageUploader';

router.get('/new_messages', Auth.checkAuth, MessageController.getNewMessages); // Get new messages
router.get('/order', Auth.checkAuth, OrderController.getUserOrders); //Get user orders
router.get('/statistics', Auth.checkAuth, UserController.userStatistics); // Get user statistics
router.get('/inbox', Auth.checkAuth, MessageController.getInboxMessages); // Get inbox messages
router.get('/outbox', Auth.checkAuth, MessageController.getOutboxMessages); // Get outbox messages
router.post('/', imageUploader.single('avatar'), UserController.createUser); // Create new user
router.post('/login', UserController.passportAuthenticate, Auth.checkAuth, UserController.authenticate); // Login
router.post('/logout', UserController.logout); // Logout
router.get('/', Auth.checkAuth, Auth.checkAdminRole, UserController.getUsers); // Get list of all users
router.get('/session', UserController.getSessionUser); // Get user from session
router.get('/:id', Auth.checkAuth, UserController.getUser); // Get specific user
router.get('/:id/articles', ArticleController.getUserArticles); //Get articles created by user
router.get('/:id/products', ProductController.getUserProducts); //Get products created by user
router.put('/', Auth.checkAuth, imageUploader.single('avatar'), UserController.updateUserInfo); //Update user data without password
router.put('/password', Auth.checkAuth, UserController.updateUserPassword); // Change user password
router.put('/role', Auth.checkAuth, Auth.checkSuperUserRole, UserController.updateUserRole); //Change user role
router.put('/:id/status', Auth.checkAuth, Auth.checkAdminRole, UserController.updateUserStatus); //Change user status
router.put('/:id/rating', Auth.checkAuth, UserController.rateUser); //Rate user
router.delete('/:id/message', Auth.checkAuth, MessageController.deleteMessage); // Delete message from user messages

module.exports = router;
