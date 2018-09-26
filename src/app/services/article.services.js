const Article = require('../models/article.model');

exports.createArticle = function (req) {
  try {
    return new Article({
      author: req.user._id,
      title: req.body.title,
      content: req.body.content,
      images: req.body.images,
      video: req.body.video,
      tags: req.body.tags
    }).save();

  } catch (e) {
    throw {error: e, message: 'Article creation error'};
  }
};

exports.getArticles = function (req) {
  // // Check the existence of the query parameters, If the exists doesn't exists assign a default value
  let page = req.body.page ? req.body.page : 1;
  let limit = req.body.limit ? req.body.limit : 10;
  try {
    let promise = Article.paginate(req.body.query, {page: page, limit: limit, populate: {path: 'author', select: 'firstName lastName _id'}});
    return promise.then((doc) => {
      if(doc === null) { throw Error('No articles found'); }
      return doc;
    });

  } catch (e) {
    throw {error: e, message: 'Error on get articles'};
  }
};

exports.getUserArticles = async function(req) {
  try {
    let page = req.body.page ? req.body.page : 1;
    let limit = req.body.limit ? req.body.limit : 10;

    let promise = Article.paginate({author: req.user._id}, {page: page, limit: limit, populate: {path: 'author', select: 'avatar role _id firstName lastName email'}});

    return promise.then((doc) => {
      if(doc === null) { throw Error('No articles found'); }
      return doc;
    });

  } catch (e) {
    throw Error('Error at getUserArticles services');
  }
};

exports.getArticle = function (id) {
  try {
    let promise = Article.findById(id).populate({path: 'author', select: 'firstName lastName _id'});
    return promise.then((doc) => {
      if(doc === null) {
        throw Error('Article not found');
      }
      return doc;
    });

  } catch (e) {
    throw {error: e, message: 'Error on get article'};
  }
};

exports.updateArticle = function (req) {
  try {
    let promise = Article.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      content: req.body.content,
      images: req.body.images,
      video: req.body.video,
      tags: req.body.tags,
      edited: Date.now()
    }, { new: true });

    return promise.then((doc) => {
      if(doc === null) {
        throw Error('Article not found');
      }
      return doc;
    });

  } catch(e){
    throw {error: e, message: 'Error at artcile update services'};
  }
};

exports.deleteArticle = function (id) {
  try {
    // Delete a article.
    let promise = Article.findByIdAndDelete(id).exec();

    return promise.then((doc) => {
      if(doc === null) {
        throw Error('Article not found');
      }
      return doc;
    });

  } catch (e) {
    throw {error: e, message: 'Error on article delete.'};
  }
};
