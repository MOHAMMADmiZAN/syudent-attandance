/*- Name
- Email
- Password
- Roles
- AccountStatus
-createdAt
-updatedAt
-deletedAt
*/
const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    name: {
        type: String, required: [true, 'Name is required'], trim: true


    }, email: {
        type: String, required: true, unique: true, validate: {
            validator: function (v) {
                return /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,10})$/.test(v);
            }, message: props => `${props.value} is not a valid email!`
        }
    }, password: {
        type: String, minlength: [6, 'Password must be at least 6 characters'], required: true
    }, roles: {
        type: [String],

        default: ['USER']
    }, accountStatus: {
        type: String, enum: ['PENDING', 'APPROVED', 'REJECTED'], default: 'PENDING'
    },

}, {timestamps: true});
const User = model('User', UserSchema);
module.exports = User