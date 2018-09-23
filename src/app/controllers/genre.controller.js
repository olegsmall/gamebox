const GenreService = require('../services/genre.services');

exports.getGenres = async function(req, res) {
  try {
    let genres = await GenreService.getGenres(req);
    return res.status(201).json({status: 201, data: genres, message: 'Genres list'});

  } catch(e){
    return res.status(409).json({status: 409, message: e.message});
  }
};

exports.getGenre = async function(req, res) {
  try {
    let genre = await GenreService.getGenre(req.params.id);
    return res.status(201).json({status: 201, data: genre, message: 'One genre'});

  } catch(e){
    return res.status(409).json({status: 409, message: e.message});
  }
};

exports.createGenre = async function(req, res) {
  try {
    let newGenre = await GenreService.createGenre(req);
    return res.status(201).json({status: 201, data: newGenre, message: 'Genre created successfully'});

  } catch(e){
    return res.status(409).json({status: 409, message: e.message});
  }
};

exports.updateGenre = async function(req, res) {
  try {
    let genre = await GenreService.updateGenre(req);
    return res.status(201).json({status: 201, data: genre, message: 'Genre updated successfully'});

  } catch(e){
    return res.status(409).json({status: 409, message: e.message});
  }
};


exports.deleteGenre = async function(req, res) {
  try {
    let genre = await GenreService.deleteGenre(req.params.id);
    return res.status(201).json({status: 201, data: genre, message: 'Genre removed successfully'});

  } catch(e){
    return res.status(409).json({status: 409, message: e.message});
  }
};
