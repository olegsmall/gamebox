/**
 * Created by: Peter Yablochkin
 * Created: 17 Sept 2018
 * Edited: 12 Oct 2018 by Peter Yablochkin
 *
 * @fileoverview Routes for product
 * @module routes/product.route
 */

// Import modules & controllers
import express from 'express';
const router = express.Router();
import ProductController from '../controllers/product.controller';
import multer from 'multer';
import Auth from '../services/auth.services';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/image/products');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {fileSize: 1024 * 1024 * 4,},
  fileFilter: fileFilter
});

router.get('/', ProductController.getProducts); //Get list of all products
router.get('/:id', ProductController.getProduct); // Get specific product
router.post('/', Auth.checkAuth, upload.single('image'), ProductController.createProduct); //Create new product
router.put('/:id', Auth.checkAuth, ProductController.updateProduct); //Update a product
router.delete('/:id', Auth.checkAuth, ProductController.deleteProduct); //Delete product
router.put('/:id/rating', Auth.checkAuth, ProductController.rateProduct); //Rate product
router.put('/:id/comment', Auth.checkAuth, ProductController.addProductComment); //Comment a product

module.exports = router;
