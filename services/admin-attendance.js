const AdminAttendance = require("../models/AdminAttendance");
const {addMinutes, isAfter} = require("date-fns");


const findRunning = async () => {
    return AdminAttendance.findOne({Status: "RUNNING"});


}
const updateStatus = async () => {
    const running = await findRunning();
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