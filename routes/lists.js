const router = require('express').Router();
const listController = require('../controller/list');
const verifyToken = require('../utility/verifyToken')

// Get create-list page
router.get('/create',listController.getCreateListPage)
// Create
router.post('/create',verifyToken,listController.createList);
// Delete
router.delete('/delete/:id',verifyToken,listController.deleteList);
// Get All Lists
router.get('/all',verifyToken,listController.getAllLists);
// Get Lists
router.get('/',listController.getLists);

module.exports = router;
