const router = require('express').Router();
const adminAttendanceController = require('../controllers/admin-attendance');


router.get('/enable',adminAttendanceController.enableAttendance);
router.get('/disable',adminAttendanceController.disableAttendance);
router.get('/running',adminAttendanceController.isAttendanceRunning);

module.exports = router;