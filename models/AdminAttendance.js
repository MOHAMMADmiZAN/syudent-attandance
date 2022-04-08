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
        min:1,
        max:20,
        default:5

    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },

},{timestamps:true})
 const AdminAttendance = model('AdminAttendance',AdminAttendanceSchema)
 module.exports = AdminAttendance



