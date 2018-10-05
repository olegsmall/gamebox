const Article = require('../models/article.model');

exports.createArticle = function (req) {
  try {
    let image;
    if (req.file){
      image = '/image/articles/' + req.file.filename;
    } else {
      image = '/image/default/article.jpg';
    }

    return new Article({
      author: req.user._id,
      title: req.body.title,
      content: req.body.content,
      image: image,
      tags: req.body.tags
    }).save();

  } catch (e) {
    throw {error: e, message: 'Article creation error'};
  }
};

exports.getArticles = function (req) {

  let queryOptions = {}; // Mongoose-paginator query options
  let query = {}; // Mongoose query options

  let sort = 'desc'; // Default sorting method -> Descending
  // Populate query fields
  queryOptions.populate = {path: 'author', select: '_id name firstName lastName e-mail'};
  // Check the existence of the query parameters, If the exists doesn't exists assign a default value
  //Page option
  req.query.page ? queryOptions.page = Number(req.query.page) : 1;
  // Limit number of returning objects
  req.query.limit ? queryOptions.limit = Number(req.query.limit) : 10;
  // Check if sort option is different from default(desc)
  if(req.query.sort === 'asc') { sort = 'asc'; }
  // Check if sorting by title is chosen
  if(req.query.sort_by === 'title') { queryOptions.sort = { title: sort}; }
  // Check if sorting by date is chosen
  if(req.query.sort_by === 'date') { queryOptions.sort = { created: sort}; }

  // Check if searching by title (uses %LIKE%)
  if(req.query.title) { query.title = new RegExp(req.query.title,'i'); }
  if(req.query.tags) { query.tags = new RegExp(req.query.tags ,'i'); }

  try {
    let promise = Article.paginate(query, queryOptions);
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

    let promise = Article.paginate({author: req.params.id}, {page: page, limit: limit, populate: {path: 'author', select: 'avatar role _id firstName lastName email'}});

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

exports.addArticleComment = function (req) {
  try {
    let promise = Article.findById({_id: req.params.id});

    return promise.then((article, err) => {
      if(article === null || err) { throw Error('Article not found'); }

      article.comment.push({user: req.user._id, content: req.body.content});

      return article.save();
    }, {new: true})
  } catch(e) {
    throw {error: e, message: 'Error on add article comment'};
  }
};
