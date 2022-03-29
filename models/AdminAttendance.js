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
        enum:['Pending','Approved','Rejected'],
        default:'Pending'
    },
    TimeLimit:{
        type:String,
        default:'00:00'

    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    updatedAt:{
        type:Date,
        default:Date.now()
    },
    deletedAt:{
        type:Date,
        default:null
    }
})
 const AdminAttendance = model('AdminAttendance',AdminAttendanceSchema)
 module.exports = AdminAttendance



