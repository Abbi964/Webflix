const router = require('express').Router();
const listController = require('../controller/list');
const verifyToken = require('../utility/verifyToken')

// Get create-list page
router.get('/create',listController.getCreateListPage)
// Create
router.post('/create',verifyToken,listController.createList);
// Delete
router.delete('/delete/:id',verifyToken,listController.deleteList);
// Get Update List page
router.get('/update',listController.getUpdateListPage)
// Update List
router.put('/update/:id',verifyToken,listController.updateList)
// Get All Lists
router.get('/all',verifyToken,listController.getAllLists);
// Get List
router.get('/find/:id',verifyToken,listController.findList)
// Get Lists
router.get('/',listController.getLists);

module.exports = router;
