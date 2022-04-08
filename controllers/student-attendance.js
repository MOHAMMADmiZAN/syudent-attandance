const StudentAttendance = require("../models/StudentAttandance");
const AdminAttendance = require("../models/AdminAttendance");
const {disableWhenTimeOut} = require("../services/admin-attendance");


const getAttendanceStatus = async (req, res, next) => {
    try {
        await disableWhenTimeOut()
        const runningAttendance = await AdminAttendance.findOne({

            Status: "RUNNING"
        });
        if (runningAttendance) {

            return res.status(200).json({
                status: 200, data: runningAttendance
            })
        } else {
            return res.status(404).json({
                status: 404, message: "No running attendance found"
            })
        }
    } catch (e) {
        next(e)
    }
}
const studentAttendance = async (req, res, next) => {
    try {
        const studentId = req.user.id
        const {id} = req.params
        const running = await AdminAttendance.findOne({_id: id, Status: "RUNNING"})
        console.log(running)
        if (!running) {
            res.status(404).json({
                status: 404, message: "No running attendance found"
            })
        }
        const attended = await StudentAttendance.findOne({
            studentId, adminAttendanceId: id
        })
        if (attended) {
            return res.status(400).json({
                status: 400, message: "You have already attended this session"
            })
        }
        const callAttendance = StudentAttendance.create({
            studentId, adminAttendanceId: id
        })
        return res.status(201).json({
            status: 201, data: await callAttendance
        })


    } catch (e) {
        next(e)
    }
}


module.exports = {
    getAttendanceStatus, studentAttendance
}