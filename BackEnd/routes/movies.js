const router = require('express').Router();
const movieController = require('../controller/movie');
const verifyToken = require('../utility/verifyToken')

// Create
router.post('/create',verifyToken,movieController.createMovie);
// Update
router.put('/update/:id',verifyToken,movieController.updateMovie);
// Delete
router.delete('/delete/:id',verifyToken,movieController.deleteMovie);
// Find
router.get('/find/:id',verifyToken,movieController.findMovie);
// Find random movie
router.get('/random',verifyToken,movieController.findRandomMovie);
// Get all movies
router.get('/findAll',verifyToken,movieController.findAllMovies);

module.exports = router;
