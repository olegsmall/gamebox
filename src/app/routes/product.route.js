import express from 'express';
const router = express.Router();

// Importing Controller
import ProductController from '../controllers/product.controller';


router.post('/', ProductController.getProducts);
router.post('/create', ProductController.createProduct);
router.put('/update', ProductController.updateProduct);
router.delete('/remove', ProductController.deleteProduct);

module.exports = router;