import express from 'express';
const router = express.Router();

// Importing Controller
import ProductController from '../controllers/product.controller';
import UserController from "../controllers/user.controller";


router.get('/', ProductController.getProducts); //Get list of all products
router.get('/:id', ProductController.getProduct); // Get One product
router.post('/', ProductController.createProduct); //Create product
router.put('/:id', ProductController.updateProduct); //Update product
router.delete('/:id', ProductController.deleteProduct); //Delete product

router.put('/:id/rating', ProductController.rateProduct); //Rate product

router.put('/:id/comment', ProductController.addProductComment); //Comment a product



module.exports = router;
