const {body,validationResult} = require('express-validator');


// error messages for validator

/**
 * @param req
 * @returns {any}
 */
const rulesMessage = (req)=>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        return error.array()[0].msg;
    }
}
// Validate rules
// registerBodyRules


const registerRules = [
    body('name').trim().isEmpty().withMessage('Name is required').isString().withMessage('Name must be a string'),
    body('email').isEmpty().withMessage('email is required').normalizeEmail({all_lowercase:true}).isEmail().withMessage('Email not valid'),
    body('password').isEmpty().withMessage('Password is required').isLength({min:6}).withMessage('Password must be at least 6 characters long').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/).withMessage('Password must Be Valid'),
];



module.exports = {
    rulesMessage,
    registerRules
}
