/**
 * Created by: Peter Yablochkin
 * Created: 12 Sept 2018
 * Edited: 12 Oct 2018 by Peter Yablochkin
 *
 * @fileoverview Treats received data and executes DataBase CRUD queries for genres.
 * @module services/genre.services
 * @requires genre.model
 */

// Import Genre model
const Genre = require('../models/genre.model');


/**
 * Creates and saves a new genre in DB.
 *
 * @param req object - request info
 * @returns {Promise<*|Promise<json>>} A promise that returns json with created genre if resolved,
 *    otherwise returns json with error message
 */
exports.createGenre = function(req) {
  try {
    return new Genre({name: req.body.name.trim()}).save();
  } catch (e) {
    throw Error('Error on genre creation.');
  }
};

/**
 * Search all existing genres in DB.
 *
 * @returns {Promise<*|Promise<json>>} A promise that returns json with created genre if resolved,
 *    otherwise returns json with error message
 */
exports.getGenres = function() {
  // Search for genres
  return Genre.find().sort([['name', 'ascending']]);
};

/**
 * Search specific genre by ID.
 *
 * @param id string - genre id
 * @returns {Promise<*|Promise<json>>} A promise that returns json with created genre if resolved,
 *    otherwise returns json with error message
 */
exports.getGenre = function(id) {
  let promise = Genre.findById(id).exec();
  return promise.then((doc, err) => {
    if(err) { throw Error(err); }
    if(doc === null) { throw Error('Genre not found'); }
    return doc;
  });
};

/**
 * Update a genre with new info
 *
 * @param req object - request info
 * @returns {Promise<*|Promise<json>>} A promise that returns json with created genre if resolved,
 *    otherwise returns json with error message
 */
exports.updateGenre = function(req) {
  try {
    let promise = Genre.findOne({_id: req.params.id});
    return promise.then((doc, err) => {
      if(err) { throw Error(err); }
      if(doc === null) { throw Error('Genre not found'); }
      doc.name = req.body.name.trim();
      return doc.save();
    });
  } catch (e) {
    throw {error: e, message: 'Error on genre update.'};
  }
};

/**
 * Delete a genre
 *
 * @param id string - article id
 * @returns {Promise<*|Promise<json>>} A promise that returns json with created genre if resolved,
 *    otherwise returns json with error message
 */
exports.deleteGenre = function(id) {
  try {
    let promise = Genre.findByIdAndDelete(id);
    return promise.then((doc, err) => {
      if(err) { throw Error(err); }
      if(doc === null) { throw Error('Genre not found'); }
      return doc;
    });
  } catch (e) {
    throw {error: e, message: 'Error on genre delete.'};
  }
};