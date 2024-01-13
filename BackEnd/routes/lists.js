const router = require('express').Router();
const listController = require('../controller/list');
const verifyToken = require('../utility/verifyToken')

// Create
router.post('/create',verifyToken,listController.createList);
// Delete
router.delete('/delete/:id',verifyToken,listController.deleteList);
// Get Lists
router.get('/',listController.getLists);

module.exports = router;
