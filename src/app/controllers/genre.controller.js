/**
 * Created by: Peter Yablochkin
 * Created: 12 Sept 2018
 * Edited: 11 Oct 2018 by Peter Yablochkin
 *
 * @fileoverview Manages requests for genre CRUD queries.
 * @module controllers/genre.controller
 * @requires GenreService
 */

// Connecting Genre services
const GenreService = require('../services/genre.services');

/**
 * Manages genre creation feature
 *
 * @param req object - request info
 * @param res object - response info
 * @returns {Promise<*|Promise<json>>} A promise that returns json if resolved, otherwise json with error
 */
exports.createGenre = async function(req, res) {
  try {
    // Execute create genre method.
    let newGenre = await GenreService.createGenre(req);
    // Return the created genre with appropriate HTTP Status Code and Message.
    return res.status(201).json({status: 201, genres: newGenre, message: 'Genre created successfully'});
  } catch(e){
    //Return Error Message with HTTP Status Code.
    return res.status(409).json({status: 409, message: e.message});
  }
};

/**
 * Manages search feature of all genres
 * Accepts query filters to precise search
 *
 * @param req object - request info
 * @param res object - response info
 * @returns {Promise<*|Promise<json>>} A promise that returns json if resolved, otherwise json with error
 */
exports.getGenres = async function(req, res) {
  try {
    // Execute genre search method.
    let genres = await GenreService.getGenres(req);
    // Return genres list with appropriate HTTP Status Code and Message.
    return res.status(201).json({status: 201, genres: genres, message: 'Genres list'});
  } catch(e){
    //Return Error Message with HTTP Status Code.
    return res.status(409).json({status: 409, message: e.message});
  }
};

/**
 * Manages search feature of one concrete article
 *
 * @param req object - request info
 * @param res object - response info
 * @returns {Promise<*|Promise<json>>} A promise that returns json if resolved, otherwise json with error
 */
exports.getGenre = async function(req, res) {
  try {
    // Execute genre search method.
    let genre = await GenreService.getGenre(req.params.id);
    // Return genre with appropriate HTTP Status Code and Message.
    return res.status(201).json({status: 201, genres: genre, message: 'One genre'});
  } catch(e){
    //Return Error Message with HTTP Status Code.
    return res.status(409).json({status: 409, message: e.message});
  }
};

/**
 * Manages genre update feature
 *
 * @param req object - request info
 * @param res object - response info
 * @returns {Promise<*|Promise<json>>} A promise that returns json if resolved, otherwise json with error
 */
exports.updateGenre = async function(req, res) {
  try {
    // Execute genre update method.
    let genre = await GenreService.updateGenre(req);
    // Return updated genre with appropriate HTTP Status Code and Message.
    return res.status(201).json({status: 201, genres: genre, message: 'Genre updated successfully'});
  } catch(e){
    //Return Error Message with HTTP Status Code.
    return res.status(409).json({status: 409, message: e.message});
  }
};

/**
 * Manages genre delete feature
 *
 * @param req object - request info
 * @param res object - response info
 * @returns {Promise<*|Promise<json>>} A promise that returns json if resolved, otherwise json with error
 */
exports.deleteGenre = async function(req, res) {
  try {
    // Execute genre delete method.
    let genre = await GenreService.deleteGenre(req.params.id);
    // Return deleted genre with appropriate HTTP Status Code and Message.
    return res.status(201).json({status: 201, genres: genre, message: 'Genre removed successfully'});
  } catch(e){
    //Return Error Message with HTTP Status Code.
    return res.status(409).json({status: 409, message: e.message});
  }
};
