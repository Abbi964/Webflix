const router = require('express').Router();
const movieController = require('../controller/movie');
const verifyToken = require('../utility/verifyToken')

// Create
router.post('/create',verifyToken,movieController.createMovie);
// Update
router.put('/update/:id',verifyToken,movieController.updateMovie)

module.exports = router;
