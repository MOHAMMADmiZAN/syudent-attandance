const {getAttendanceStatus, studentAttendance} = require("../controllers/student-attendance");
const router = require('express').Router();

router.get('/status', getAttendanceStatus);
router.get('/:id', studentAttendance);

module.exports = router;