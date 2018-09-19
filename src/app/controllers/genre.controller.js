var Genre = require('../models/genre.model');
var ProductModel = require('../models/product.model');
// var async = require('async');

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Display list of all Genre.
exports.listGenres = function(req, res, next) {

  Genre.find()
    .sort([['name', 'ascending']])
    .exec(function (err, list_genres) {
      if (err) { return next(err); }
      // Successful, so render.
      res.send({title: 'Genre List', list_genres:  list_genres});
    });

};

exports.createGenre = function(req, res, next) {

  body('name', 'Genre name required').isLength({ min: 1 }).trim();

  // Sanitize (trim and escape) the name field.
  sanitizeBody('name').trim().escape();

  // Extract the validation errors from a request.
  const errors = validationResult(req);

  // Create a genre object with escaped and trimmed data.
  let genre = new Genre(
    { name: req.body.name }
  );

  if (!errors.isEmpty()) {
    // There are errors. Render the form again with sanitized values/error messages.
    res.send({ title: 'Create Genre', genre: genre, errors: errors.array()});
  } else {
    // Data from form is valid.
    // Check if Genre with same name already exists.
    Genre.findOne({ 'name': req.body.name })
      .exec( function(err, found_genre) {
        if (err) { return next(err); }

        if (found_genre) {
          // Genre exists, redirect to its detail page.
          res.redirect(found_genre.url);
        }
        else {

          genre.save(function (err) {
            if (err) { return next(err); }
            // Genre saved. Redirect to genre detail page.
            res.redirect(genre.url);
          });
        }
      });
  }

};