const router = require('express').Router();
const movieController = require('../controller/movie');
const verifyToken = require('../utility/verifyToken');
const multerLocalUpload = require('../utility/multerLocalUpload');

// Get Home page
router.get('/home',movieController.getHomePage);
// get Create movie Page
router.get('/create',movieController.getCreateMoviePage)
// Create
router.post('/create',verifyToken,movieController.createMovie);
// Get Update Movie Page
router.get('/update/',movieController.getUpdateMoviePage)
// Update
router.put('/update/:id',verifyToken,movieController.updateMovie);
// Delete
router.delete('/delete/:id',verifyToken,movieController.deleteMovie);
// Find
router.get('/find/:id',verifyToken,movieController.findMovie);
// Find random movie
router.get('/random',verifyToken,movieController.findRandomMovies);
// Get all movies
router.get('/findAll',verifyToken,movieController.findAllMovies);
// upload Movie
router.post('/upload',verifyToken,multerLocalUpload.single('file'),movieController.uploadMovie)
// view movie
router.get('/view/:id',movieController.getViewMoviePage);

module.exports = router;
