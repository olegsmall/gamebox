const ArticleService = require('../services/article.services');

exports.createArticle = async function(req, res) {
  try {
    if (req.user){
      let newArticle = await ArticleService.createArticle(req);
      return res.status(201).json({status: 201, article: newArticle, message: 'Article created successfully'});
    } else {
      return res.status(403.21).json({status: 403.21, message: 'Source access denied'});
    }
  }catch(e){
    return res.status(400).json({status: 400, error: e.message, message: 'Article was not created'});
  }
};

exports.getArticles = async function(req, res) {
  try {
    let articles = await ArticleService.getArticles(req);
    // Return the articles list with the appropriate HTTP Status Code and Message.
    return res.status(200).json({status: 200, articles: articles, message: 'Articles received'});

  } catch(e) {
    //Return an Error Response Message with Code and the Error Message.
    return res.status(400).json({status: 400, message: e.message});
  }
};

exports.getUserArticles = async function(req, res) {
  try {
    let articles = await ArticleService.getUserArticles(req);
    return res.status(201).json({status: 201, articles: articles, message: 'User articles received'});

  } catch (e) {
    return res.status(400).json({status: 400, error: e.message, message: 'Cant get user articles'});
  }
};

exports.getArticle = async function(req, res) {
  try {
    const article = await ArticleService.getArticle(req.params.id);
    // Return the articles list with the appropriate HTTP Status Code and Message.
    return res.status(200).json({status: 200, article: article, message: 'Article received'});

  }catch (e) {
    //Return an Error Response Message with Code and the Error Message.
    return res.status(400).json({status: 400, message: e.message});
  }
};

exports.updateArticle = async function(req, res) {
  try {
    let article = await ArticleService.updateArticle(req);
    return res.status(201).json({status: 201, article: article, message: 'Article updated successfully'});

  } catch(e){
    return res.status(409).json({status: 409, message: e.message});
  }
};

exports.deleteArticle = async function(req, res) {
  try {
    let article = await ArticleService.deleteArticle(req.params.id);
    return res.status(201).json({status: 201, article: article, message: 'Article deleted successfully'});

  } catch(e){
    return res.status(409).json({status: 409, message: e.message});
  }
};
