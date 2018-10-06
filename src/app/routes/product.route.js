import express from 'express';
const router = express.Router();

// Importing Controller
import ProductController from '../controllers/product.controller';
import UserController from "../controllers/user.controller";

import multer from 'multer';

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
router.get('/:id', ProductController.getProduct); // Get One product
router.post('/', upload.single('image'), ProductController.createProduct); //Create product
router.put('/:id', ProductController.updateProduct); //Update product
router.delete('/:id', ProductController.deleteProduct); //Delete product

router.get('/:id/rating', ProductController.getProductRating); //Get product rating
router.put('/:id/rating', ProductController.rateProduct); //Rate product

router.put('/:id/comment', ProductController.addProductComment); //Comment a product



module.exports = router;
