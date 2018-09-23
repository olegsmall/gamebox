const Genre = require('../models/genre.model');

// Display list of all Genre.
exports.getGenres = function() {
  // Search for genres
  return Genre.find().sort([['name', 'ascending']]);
};

exports.getGenre = function(id) {
  // Get genre with specified id
  return Genre.findById(id);
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
    return Genre.findByIdAndUpdate(req.body.id, { name: req.body.name.trim() }, { new: true });

  } catch (e) {
    throw {error: e, message: 'Error on genre update.'};
  }
};

exports.deleteGenre = function(id) {
  try {
    // Delete a genre.
    return Genre.findByIdAndDelete(id);

  } catch (e) {
    throw {error: e, message: 'Error on genre delete.'};
  }
};
