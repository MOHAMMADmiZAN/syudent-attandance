/*
- CreatedAt: DateTime
- Status
- TimeLimit
-updatedAt: DateTime
-deletedAt: DateTime
*/
const {model,Schema }= require('mongoose')

const AdminAttendanceSchema = new Schema({
    Status:{
        type:String,
        enum:['RUNNING','COMPLETED'],
        default:'RUNNING'
    },
    TimeLimit:{
        type:Number,
        default:'5'

    }

},{timestamps:true})
 const AdminAttendance = model('AdminAttendance',AdminAttendanceSchema)
 module.exports = AdminAttendance



