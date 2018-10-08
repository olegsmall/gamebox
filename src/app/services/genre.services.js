const Genre = require('../models/genre.model');

// Display list of all Genre.
exports.getGenres = function() {
  // Search for genres
  return Genre.find().sort([['name', 'ascending']]);
};

exports.getGenre = function(id) {
  // Get genre with specified id
  let promise = Genre.findById(id).exec();

  return promise.then((doc) => {
    if(doc === null) { throw Error('Genre not found'); }
    return doc;
  });
};

exports.createGenre = function(req) {
  try {
    // Trim and Save genre in DB and return result
    return new Genre({ name: req.body.name.trim() }).save();

  } catch (e) {
    throw {error: e, message: 'Error on genre creation.'};
  }
};

exports.updateGenre = function(req) {
  try {
    // Trim and update a genre.
    let promise = Genre.findById(req.params.id);

    return promise.then((doc) => {
      if(doc === null) { throw Error('Genre not found'); }
      doc.name = req.body.name.trim();
      return doc.save();
    });
  } catch (e) {
    throw {error: e, message: 'Error on genre update.'};
  }
};

exports.deleteGenre = function(id) {
  try {
    // Delete a genre.
    let promise = Genre.findByIdAndDelete(id);

    return promise.then((doc) => {
      if(doc === null) { throw Error('Genre not found'); }
      return doc;
    });

  } catch (e) {
    throw {error: e, message: 'Error on genre delete.'};
  }
};
