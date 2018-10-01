import express from 'express';
import ArticleController from '../controllers/article.controller';

const router = express.Router();

router.get('/', ArticleController.getArticles); //Get list of all articles
router.get('/', ArticleController.getArticles); //Get list of all articles
router.get('/:id', ArticleController.getArticle); // Get One articles
router.post('/', ArticleController.createArticle); //Create articles
router.put('/:id', ArticleController.updateArticle); //Update articles
router.put('/:id/comment', ArticleController.addArticleComment); //Add a comment to an article
router.delete('/:id', ArticleController.deleteArticle); //Delete articles

module.exports = router;
