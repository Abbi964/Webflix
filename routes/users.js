const router = require('express').Router();
const userController = require('../controller/user')
const verifyToken = require('../utility/verifyToken');

// Update
router.put('/:id',verifyToken,userController.updateUser)
// Delete
router.delete('/:id',verifyToken,userController.deleteUser)
// Get User
router.get('/find/:id',userController.findUser)
// Get All User
router.get('/findAll',verifyToken,userController.findAllUsers)
// Get User Stats
router.get('/stats',userController.getUserStat)

module.exports = router;