/**
 * Created by: Peter Yablochkin
 * Created: 15 Sept 2018
 * Edited: 11 Oct 2018 by Peter Yablochkin
 *
 * @fileoverview Manages requests for article CRUD queries.
 * @module controllers/article.controller
 * @requires ArticleService
 */

// Connecting Article services
const ArticleService = require('../services/article.services');

/**
 * Manages article creation feature
 *
 * @param req object - request info
 * @param res object - response info
 * @returns {Promise<*|Promise<json>>} A promise that returns json if resolved, otherwise json with error
 */
exports.createArticle = async function(req, res) {
  try {
    // Execute create article method.
    let newArticle = await ArticleService.createArticle(req);
    // Return created article with appropriate HTTP Status Code and Message.
    return res.status(201).json({status: 201, article: newArticle, message: 'Article created successfully'});
  }catch(e){
    //Return Error Message with HTTP Status Code.
    return res.status(400).json({status: 400, error: e.message, message: 'Article creation error'});
  }
};

/**
 * Manages search feature of all articles
 * Accepts query filters to precise search
 *
 * @param req object - request info
 * @param res object - response info
 * @returns {Promise<*|Promise<json>>} A promise that returns json if resolved, otherwise json with error
 */
exports.getArticles = async function(req, res) {
  try {
    // Execute article search method.
    let articles = await ArticleService.getArticles(req);
    // Return articles list with appropriate HTTP Status Code and Message.
    return res.status(200).json({status: 200, articles: articles, message: 'Articles received'});
  } catch(e) {
    //Return Error Message with HTTP Status Code.
    return res.status(400).json({status: 400, message: e.message});
  }
};

/**
 * Manages search feature of one concrete article
 *
 * @param req object - request info
 * @param res object - response info
 * @returns {Promise<*|Promise<json>>} A promise that returns json if resolved, otherwise json with error
 */
exports.getArticle = async function(req, res) {
  try {
    // Execute article search method.
    const article = await ArticleService.getArticle(req.params.id);
    // Return article with appropriate HTTP Status Code and Message.
    return res.status(200).json({status: 200, article: article, message: 'Article received'});
  }catch (e) {
    //Return Error Message with HTTP Status Code.
    return res.status(400).json({status: 400, message: e.message});
  }
};

/**
 * Manages search feature of user's articles
 * Accepts query filter options to precise search
 *
 * @param req object - request info
 * @param res object - response info
 * @returns {Promise<*|Promise<json>>} A promise that returns json if resolved, otherwise json with error
 */
exports.getUserArticles = async function(req, res) {
  try {
    // Execute user's article search method.
    let articles = await ArticleService.getUserArticles(req);
    // Return articles list with appropriate HTTP Status Code and Message.
    return res.status(201).json({status: 201, articles: articles, message: 'User articles received'});
  } catch (e) {
    //Return Error Message with HTTP Status Code.
    return res.status(400).json({status: 400, error: e.message, message: 'Cant get user articles'});
  }
};

/**
 * Manages article update feature
 *
 * @param req object - request info
 * @param res object - response info
 * @returns {Promise<*|Promise<json>>} A promise that returns json if resolved, otherwise json with error
 */
exports.updateArticle = async function(req, res) {
  try {
    // Execute article update method.
    let article = await ArticleService.updateArticle(req);
    // Return updated article with appropriate HTTP Status Code and Message.
    return res.status(201).json({status: 201, article: article, message: 'Article updated successfully'});
  } catch(e){
    //Return Error Message with HTTP Status Code.
    return res.status(409).json({status: 409, message: e.message});
  }
};

/**
 * Manages article delete feature
 *
 * @param req object - request info
 * @param res object - response info
 * @returns {Promise<*|Promise<json>>} A promise that returns json if resolved, otherwise json with error
 */
exports.deleteArticle = async function(req, res) {
  try {
    // Execute article delete method.
    let article = await ArticleService.deleteArticle(req.params.id);
    // Return deleted article with appropriate HTTP Status Code and Message.
    return res.status(201).json({status: 201, article: article, message: 'Article deleted successfully'});
  } catch(e){
    //Return Error Message with HTTP Status Code.
    return res.status(409).json({status: 409, message: e.message});
  }
};

/**
 * Manages article adding comment feature
 *
 * @param req object - request info
 * @param res object - response info
 * @returns {Promise<*|Promise<json>>} A promise that returns json if resolved, otherwise json with error
 */
exports.addArticleComment = async function (req, res) {
  try {
    // Execute add article comment method.
    let article = await ArticleService.addArticleComment(req);
    // Return added comment with appropriate HTTP Status Code and Message.
    return res.status(201).json({status: 201, article: article, message: 'Article comment added'});
  } catch (e) {
    //Return Error Message with HTTP Status Code.
    return res.status(400).json({status: 400, message: e.message});
  }
};