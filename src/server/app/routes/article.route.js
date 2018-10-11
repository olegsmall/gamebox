import express from 'express';
import ArticleController from '../controllers/article.controller';
import multer from 'multer';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/image/articles');
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



router.get('/', ArticleController.getArticles); //Get list of all articles
router.get('/', ArticleController.getArticles); //Get list of all articles
router.get('/:id', ArticleController.getArticle); // Get One articles
router.post('/', upload.single('image'), ArticleController.createArticle); //Create articles
router.put('/:id', upload.single('image'), ArticleController.updateArticle); //Update articles
router.put('/:id/comment', ArticleController.addArticleComment); //Add a comment to an article
router.delete('/:id', ArticleController.deleteArticle); //Delete articles

module.exports = router;
