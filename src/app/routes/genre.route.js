import express from 'express';
const router = express.Router;

// Importing Controller
import GenreController from '../controllers/genre.controller';


router.get('/', GenreController.listGenres());
router.post('/create', GenreController.createGenre());


module.exports = router;