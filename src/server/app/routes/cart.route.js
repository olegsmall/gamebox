/**
 * Created by: Peter Yablochkin
 * Created: 10 Sept 2018
 * Edited: 12 Oct 2018 by Peter Yablochkin
 *
 * @fileoverview Routes for genres
 * @module routes/genre.route
 */

// Import modules & controllers
import express from 'express';
import CartController from '../controllers/cart.controller';
const router = express.Router();
import Auth from '../services/auth.services';

router.get('/', Auth.checkAuth, CartController.getCartProducts); //Get cart products
router.post('/:id', Auth.checkAuth, CartController.addProductToCart); // Add a product to cart
router.delete('/:id', Auth.checkAuth, CartController.deleteProductFromCart); // Delete a product from cart

module.exports = router;


