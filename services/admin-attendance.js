const AdminAttendance = require("../models/AdminAttendance");
const {addMinutes, isAfter} = require("date-fns");


const findRunning = async () => {
    return AdminAttendance.findOne({Status: "Running"});


}
const updateStatus = async () => {
    const started = addMinutes(new Date(running.createdAt), running.TimeLimit)
    const finish = isAfter(new Date(), started)
    if (finish) {
        running.Status = "COMPLETED"
        await running.save()
        return true
    }
    return false
}

module.exports = {
    findRunning,
    updateStatus
}