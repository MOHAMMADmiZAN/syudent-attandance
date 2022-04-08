const AdminAttendance = require("../models/AdminAttendance");
const {addMinutes, isAfter} = require("date-fns");


const findRunning = async () => {
    return AdminAttendance.findOne({Status: "RUNNING"});


}
const disableWhenCall = async () => {
    const running = await findRunning();
   if (!running){
       return false;
   }
    running.Status = "COMPLETED"
    return running.save()
}
const disableWhenTimeOut = async () => {
    const running = await findRunning();
    const started = addMinutes(new Date(running.createdAt), running.TimeLimit)
    const finish = isAfter(new Date(), started)
    if (finish) {
        await disableWhenCall()
    }
    return false
}


module.exports = {
    findRunning,
    disableWhenTimeOut,
    disableWhenCall
}