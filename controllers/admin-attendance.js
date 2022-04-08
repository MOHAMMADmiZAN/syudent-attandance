const AdminAttendance = require("../models/AdminAttendance");
const {findRunning, disableWhenTimeOut, disableWhenCall} = require("../services/admin-attendance");


/**
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
const enableAttendance = async (req, res, next) => {
    try {
        const running = await findRunning();
        if (running) {
            return res.status(400).json({
                message: "Attendance is already running"
            });

        }
        const adminAttendance = new AdminAttendance({})
        await adminAttendance.save()

        return res.status(200).json({
            status: 200, message: "Attendance enabled successfully", data: adminAttendance
        })


    } catch (e) {
        next(e);
    }
}
const disableAttendance = async (req, res, next) => {
    try {
        const completed = await disableWhenCall()
        if (!completed) {
            return res.status(400).json({
                message: "Attendance Already Completed"
            });
        } else {
            return res.status(200).json({
                status: 200, message: "Attendance Complete  successfully"
            })
        }


    } catch (e) {
        next(e);
    }
}


const isAttendanceRunning = async (req, res, next) => {
    try {
        const running = await findRunning()
        if (!running) {
            res.status(404).json({
                status: 404, message: "No running attendance found"
            })
        }
        await disableWhenTimeOut()

        return res.status(200).json({
            status: 200, message: "Attendance is running", data: running
        })
    } catch (e) {
        next(e);
    }
}
module.exports = {
    enableAttendance, disableAttendance, isAttendanceRunning
}