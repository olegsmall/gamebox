import express from 'express';
const router = express.Router();

// Importing Controller
import ProductController from '../controllers/product.controller';

//Get list of all products
router.get('/', ProductController.getProducts);
//Create product
router.post('/', ProductController.createProduct);
//Get one product
router.get('/:id', ProductController.getProduct);
//Update product
router.put('/:id', ProductController.updateProduct);
//Delete product
router.delete('/:id', ProductController.deleteProduct);


module.exports = router;
