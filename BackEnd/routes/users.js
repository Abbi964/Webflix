const router = require('express').Router();
const userController = require('../controller/user')
const verifyToken = require('../utility/verifyToken');

// Update
router.put('/:id',verifyToken,userController.updateUser)
// Delete
router.delete('/:id',verifyToken,userController.deleteUser)
// Get User
// Get All User
// Get User Stats

module.exports = router;