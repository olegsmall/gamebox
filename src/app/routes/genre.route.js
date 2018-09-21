import express from 'express';
const router = express.Router();

// Importing Controller
import GenreController from '../controllers/genre.controller';


router.get('/', GenreController.getGenres);
router.post('/create', GenreController.createGenre);
router.put('/update', GenreController.updateGenre);
router.delete('/remove', GenreController.deleteGenre);

module.exports = router;