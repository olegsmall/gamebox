import express from 'express';
const router = express.Router();

// Importing Controller
import GenreController from '../controllers/genre.controller';

router.post('/', GenreController.createGenre); // Create one genre
router.get('/', GenreController.getGenres); // Get all genres
router.get('/:id', GenreController.getGenre); // Get one genre
router.put('/:id', GenreController.updateGenre); // Update one genre
router.delete('/:id', GenreController.deleteGenre); // Delete one genre

module.exports = router;
