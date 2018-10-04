import express from 'express';
import CartController from '../controllers/cart.controller';

const router = express.Router();

router.get('/', CartController.getCartProducts); //Get cart products
router.post('/:id', CartController.addProductToCart); //Create product
router.delete('/:id', CartController.deleteProductFromCart); //Create product

module.exports = router;


