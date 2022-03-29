/*- Name
- Email
- Password
- Roles
- AccountStatus
-createdAt
-updatedAt
-deletedAt
*/
const {Schema,model} = require('mongoose');

const UserSchema = new Schema({
    name:{
        type:String,
        required:[true,'Name is required'],
        trim:true


    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:{
            validator:function(v){
                return /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,10})$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    password:{
        type:String,
        required:true
    },
    roles:{
        type:[String],
        required:true,
        default:['USER']
    },
    accountStatus:{
        type:String,
        enum:['Pending','Approved','Rejected'],
        default:'Pending'
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    },
    deletedAt:{
        type:Date,
        default:null
    }
});
const User = model('User',UserSchema);
module.exports = User