const Genre = require('../models/genre.model');

// Display list of all Genre.
exports.getGenres = function() {

  // Search for genres
  // let test =  Genre.find().sort([['name', 'ascending']]);
  return Genre.find().sort([['name', 'ascending']]);
};

exports.getGenre = function(req) {
  // Get genre with specified id
  return req.params.id;
};

exports.createGenre = function(req) {

  //Trim data.
  const name = req.body.name.trim();

  //Check data length.
  if(name.length < 3) {
    throw Error('Genre length should be more than 3 letters');
  }

  try {

    // Save genre in DB and return result
    return new Genre({ name: name}).save();

  } catch (e) {
    throw {error: e, message: 'Error on genre creation.'};
  }
};

exports.updateGenre = function(req) {

  try {

    // Modify a genre.
    return Genre.findOneAndUpdate({_id: req.body.id}, {name: req.body.name}, { new: true });

  } catch (e) {
    throw {error: e, message: 'Error on genre update.'};
  }
};

exports.deleteGenre = function(req) {

  try {
    // Delete a genre.
    return Genre.findOneAndDelete({_id: req.body.id});

  } catch (e) {
    throw {error: e, message: 'Error on genre delete.'};
  }
};
