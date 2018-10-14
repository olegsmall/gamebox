/**
 * Created by: Peter Yablochkin
 * Created: 10 Sept 2018
 * Edited: 12 Oct 2018 by Peter Yablochkin
 *
 * @fileoverview Routes for genres
 * @module routes/genre.route
 */

// Import modules & controllers
import express from 'express';
const router = express.Router();
import GenreController from '../controllers/genre.controller';
import Auth from '../services/auth.services';

router.get('/', GenreController.getGenres); // Get all genres
router.get('/:id', GenreController.getGenre); // Get one genre
router.post('/', Auth.checkAuth, Auth.checkAdminRole, GenreController.createGenre); // Create one genre
router.put('/:id', Auth.checkAuth, Auth.checkAdminRole, GenreController.updateGenre); // Update one genre
router.delete('/:id', Auth.checkAuth, Auth.checkAdminRole, GenreController.deleteGenre); // Delete one genre

module.exports = router;
