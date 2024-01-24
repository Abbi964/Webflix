const router = require('express').Router();
const adminController = require('../controller/admin')

// get admin dashboard
router.get('/dashboard',adminController.getAdminDashboardPage)

module.exports = router;