/*- UserId
- CreatedAt: DateTime
- AdminAttendanceID
-CreatedAt
- UpdatedAt
- DeletedAt*/

const {model,Schema }= require('mongoose');

const StudentAttendanceSchema = new Schema({
    User:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },

    Admin:{
        type:Schema.Types.ObjectId,
        ref:'AdminAttendance'
    },
    CreatedAt:{
        type:Date,
        default:Date.now
    },
    UpdatedAt:{
        type:Date,
        default:Date.now
    },
    DeletedAt:{
        type:Date,
        default:null
    }
});
const StudentAttendance = model('StudentAttendance',StudentAttendanceSchema);
module.exports = StudentAttendance;