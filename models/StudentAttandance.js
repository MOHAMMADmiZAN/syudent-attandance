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
        ref:'User',
        required:true
    },

    Admin:{
        type:Schema.Types.ObjectId,
        ref:'AdminAttendance',
        required:true
    }

},{timestamps:true})
const StudentAttendance = model('StudentAttendance',StudentAttendanceSchema);
module.exports = StudentAttendance;