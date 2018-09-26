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
    return Article.paginate(req.body.query, {page: page, limit: limit, populate: {path: 'author', select: 'firstName lastName _id'}});
  } catch (e) {
    throw {error: e, message: 'Error on get articles'};
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
    throw {error: e, message: 'Error on product update'};
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
