import express from 'express';
import OrderController from '../controllers/order.controller';

const router = express.Router();

router.post('/', OrderController.placeOrder); //Create an order
// TODO: Change to POST & readapt all routes
router.patch('/', OrderController.completeOrder); //Create an order
// router.get('/:id/payment', OrderController.paymentExecute); //Create an order

// router.get('/', OrderController.pay); //Create an order
// router.get('/', OrderController.paymentCheck); //Create an order

router.get('/', OrderController.getOrders); //Get list of all orders
// router.get('/:id', OrderController.getOrder); //Get one specific order

module.exports = router;
