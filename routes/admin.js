const router = require('express').Router();
const adminController = require('../controller/admin')
const verifyToken = require('../utility/verifyToken')

// get admin dashboard
router.get('/dashboard',adminController.getAdminDashboardPage)

// verify admin
router.get('/verify',verifyToken,adminController.verify)

module.exports = router;