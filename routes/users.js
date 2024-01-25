const router = require('express').Router();
const userController = require('../controller/user')
const verifyToken = require('../utility/verifyToken');

// Get user update Page
router.get('/update',userController.getUserUpdatePage)
// Update
router.put('/update/:id',verifyToken,userController.updateUser)
// Delete
router.delete('/delete/:id',verifyToken,userController.deleteUser)
// Get User
router.get('/find/:id',userController.findUser)
// Get All User
router.get('/findAll',verifyToken,userController.findAllUsers)
// Get User Stats
router.get('/stats',userController.getUserStat)

module.exports = router;