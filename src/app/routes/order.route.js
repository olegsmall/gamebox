import express from 'express';
import OrderController from '../controllers/order.controller';

const router = express.Router();

router.post('/', OrderController.createOrder); //Create an order

router.get('/', OrderController.getOrders); //Get list of all orders
router.get('/:id', OrderController.getOrder); //Get one specific order

// router.get('/', OrderController.getOrder); //Get list of all articles
// router.get('/:id', OrderController.getOrder); // Get One articles
// router.put('/:id', OrderController.updateOrder); //Update articles

module.exports = router;
