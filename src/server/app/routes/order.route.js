/**
 * Created by: Peter Yablochkin
 * Created: 7 Oct 2018
 * Edited: 12 Oct 2018 by Peter Yablochkin
 *
 * @fileoverview Routes for orders
 * @module routes/order.route
 */

// Import modules & controllers
import express from 'express';
import OrderController from '../controllers/order.controller';
const router = express.Router();
import Auth from '../services/auth.services';

router.post('/', Auth.checkAuth, OrderController.placeOrder); //Create an order
router.patch('/', OrderController.completeOrder); //Create an order
router.get('/', Auth.checkAuth, OrderController.getOrders); //Get list of all orders

module.exports = router;
