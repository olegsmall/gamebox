/**
 * Created by: Peter Yablochkin
 * Created: 12 Sept 2018
 * Edited: 12 Oct 2018 by Peter Yablochkin
 *
 * @fileoverview Routes for articles
 * @module routes/articles.route
 */

// Import modules & controllers
import express from 'express';
const router = express.Router();
import ArticleController from '../controllers/article.controller';
import Auth from '../services/auth.services';
import imageUploader from '../services/memoryStorageUploader';


router.get('/', ArticleController.getArticles); //Get list of all articles
router.get('/:id', ArticleController.getArticle); // Get One articles
router.post('/', Auth.checkAuth, imageUploader.single('image'), ArticleController.createArticle); //Create articles
router.put('/:id', Auth.checkAuth, imageUploader.single('image'), ArticleController.updateArticle); //Update articles
router.put('/:id/comment', Auth.checkAuth, ArticleController.addArticleComment); //Add a comment to an article
router.delete('/:id', Auth.checkAuth, ArticleController.deleteArticle); //Delete articles

module.exports = router;
