const AdminAttendance = require("../models/AdminAttendance");
const {addMinutes, isAfter} = require("date-fns");

/**
 *
 * @returns {Promise<Query<any, any, {}, any>>}
 */
const findRunning = async () => {
    return AdminAttendance.findOne({Status: "RUNNING"});


}
/**
 *
 * @returns {Promise<boolean|*>}
 */
const disableWhenCall = async () => {
    const running = await findRunning();
    if (!running) {
        return false;
    }
    running.Status = "COMPLETED"
    return running.save()
}
/**
 *
 * @returns {Promise<boolean>}
 */
const disableWhenTimeOut = async () => {
    const running = await findRunning();
    if (running) {
        const started = addMinutes(new Date(running.createdAt), running.TimeLimit)
        const finish = isAfter(new Date(), started)
        if (finish) {
            await disableWhenCall()
        }
    }
    return false
}


module.exports = {
    findRunning,
    disableWhenTimeOut,
    disableWhenCall
}