/**
 * Created by: Peter Yablochkin
 * Created: 15 Sept 2018
 * Edited: 11 Oct 2018 by Peter Yablochkin
 *
 * @fileoverview Treats received data and executes DataBase CRUD queries for articles.
 * @module services/article.services
 * @requires article.model
 */

// Importing Article model
import Article from '../models/article.model';
// Import buffer to string converter
import BufferToString from './BufferToString';

/**
 * Creates and saves an article in DB.
 * Accepts image uploading.
 *
 * @param req object - request info
 * @returns {Promise<*|Promise<json>>} A promise that returns json with created article if resolved,
 *    otherwise returns json with error message
 */
exports.createArticle = function (req) {

  try {
    // Assign main image for article
    let image = '/image/default/article.jpg';
    if (req.file){
      image = new BufferToString().convert(req.file.mimetype, req.file.buffer);
    }

    // Create article object and assign sent info
    return new Article({
      author: req.user._id,
      title: req.body.title,
      content: req.body.content,
      image: image,
      tags: req.body.tags,
    }).save();
  } catch (e) {
    throw {error: e, message: 'Article creation error'};
  }
};

/**
 * Gets all articles existing in DB.
 * Certain filters can be applied to specify search
 * Accepted filters:
 *     page={page number} - indicate page number
 *     limit={limit} - limit number of objects per page
 *     sort={sort order} - sorting order (asc/desc)
 *     sort_by={date or title} - filter to apply
 *
 * @param req object - request info
 * @returns {Promise<*|Promise<json>>} A promise that returns json with articles if resolved,
 *    otherwise returns json with error message
 */
exports.getArticles = function (req) {

  // Forms query and query options
  let queryOptions = {}; // Mongoose-paginator query options
  let query = {}; // Mongoose query options
  let sort = 'desc'; // Default sorting method -> Descending
  queryOptions.populate = {path: 'author comment.user', select: '_id avatar name firstName lastName e-mail'};   // Populate query fields

  // Check the existence of the query parameters, If the exists doesn't exists assign a default value
  req.query.page ? queryOptions.page = Number(req.query.page) : 1; //Page option
  req.query.limit ? queryOptions.limit = Number(req.query.limit) : 10; // Limit number of returning objects
  //Prepare query filter options
  if(req.query.sort_by === 'title') { queryOptions.sort = { title: sort}; } // Check if sorting by title is chosen
  if(req.query.sort_by === 'date') { queryOptions.sort = { created: sort}; } // Check if sorting by date is chosen
  if(req.query.title) { query.title = new RegExp(req.query.title,'i'); } // Filter for search by title (uses %LIKE%)
  if(req.query.sort === 'asc') { sort = 'asc'; } // Filter for sort filter option (desc/asc)
  if(req.query.tags) { query.tags = new RegExp(req.query.tags ,'i'); } // Filter for search by tags

  try {
    // Execute query
    let promise = Article.paginate(query, queryOptions);
    return promise.then((doc, err) => {
      if(err) { throw Error(err); }
      if(doc === null) { throw Error('No articles found'); }
      // let newDoc = doc.toObject();
      // newDoc.image =
      return doc;
    });
  } catch (e) {
    throw {error: e, message: 'Error on get articles'};
  }
};

/**
 * Search specific article by ID.
 *
 * @param id string - article id
 * @returns {Promise<*|Promise<json>>} A promise that returns json with created article if resolved,
 *    otherwise returns json with error message
 */
exports.getArticle = function (id) {
  try {
    let promise = Article.findOne({_id: id}).populate({path: 'author comment.user', select: 'avatar firstName lastName _id'}).lean();
    return promise.then((doc, err) => {
      if(err) { throw Error(err); }
      if(doc === null) { throw Error('Article not found'); }

      return doc;
    });
  } catch (e) {
    throw {error: e, message: 'Error on get article'};
  }
};

/**
 * Gets all existing articles of a user.
 * UserID taken from user session.
 *
 * Certain filters can be applied to specify search
 * Accepted options:
 *     page={page number} - indicate page number
 *     limit={limit} - limit number of objects per page
 *
 * @param req object - request info
 * @returns {Promise<*|Promise<json>>} A promise that returns json with article if resolved,
 *    otherwise returns json with error message
 */
exports.getUserArticles = async function(req) {
  try {
    let page = req.body.page ? req.body.page : 1;
    let limit = req.body.limit ? req.body.limit : 10;

    let promise = Article.paginate({author: req.params.id}, {page: page, limit: limit, populate: {path: 'author comment.user', select: 'avatar role _id firstName lastName email'}});
    return promise.then((doc) => {
      if(doc === null) { throw Error('No articles found'); }
      return doc;
    });
  } catch (e) {
    throw Error('Error at getUserArticles services');
  }
};

/**
 * Search for specific article by ID and update it with newly info
 *
 * @param req object - request info
 * @returns {Promise<*|Promise<json>>} A promise that returns json with updated article if resolved,
 *    otherwise returns json with error message
 */
exports.updateArticle = function (req) {
  try {
    let promise = Article.findOne({_id: req.params.id});
    return promise.then((doc,err) => {
      if(err) { throw Error(err); }
      if(doc === null) { throw Error('Article not found');}

      if (req.file){
        doc.image = new BufferToString().convert(req.file.mimetype, req.file.buffer);
      }

      doc.title = req.body.title;
      doc.content = req.body.content;
      doc.tags = req.body.tags;
      doc.edited = Date.now();

      return doc.save();
    });
  } catch(e){
    throw {error: e, message: 'Error in article update services'};
  }
};

/**
 * Search specific article by ID and delete it
 *
 * @param id string - article id
 * @returns {Promise<*|Promise<json>>} A promise that returns json with deleted article if resolved,
 *    otherwise returns json with error message
 */
exports.deleteArticle = function (id) {
  try {
    let promise = Article.findByIdAndDelete(id).exec();
    return promise.then((doc, err) => {
      if(err) { throw Error(err); }
      if(doc === null) { throw Error('Article not found'); }
      return doc;
    });
  } catch (e) {
    throw {error: e, message: 'Error on article delete.'};
  }
};

/**
 * Add a comment to an article
 *
 * @param req object - request info
 * @returns {Promise<*|Promise<json>>} A promise that returns json with commented article if resolved,
 *    otherwise returns json with error message
 */
exports.addArticleComment = function (req) {
  try {
    let promise = Article.findOne({_id: req.params.id});
    return promise.then((article,err) => {
      if(err) { throw Error(err); }
      if(article === null) { throw Error('Article not found'); }
      article.comment.push({user: req.user._id, content: req.body.content});
      return article.save();
    });
  } catch(e) {
    throw {error: e, message: 'Error on add article comment'};
  }
};
