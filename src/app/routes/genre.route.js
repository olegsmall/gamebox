import express from 'express';
const router = express.Router();

// Importing Controller
import GenreController from '../controllers/genre.controller';

// Get all genres
router.get('/', GenreController.getGenres);
// Create one genre
router.post('/', GenreController.createGenre);
// Get one genre
router.get('/:id', GenreController.getGenre);
// Update one genre
router.put('/:id', GenreController.updateGenre);
// Delete one genre
router.delete('/:id', GenreController.deleteGenre);

module.exports = router;
