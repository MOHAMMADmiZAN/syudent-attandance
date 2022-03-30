const {body, validationResult} = require("express-validator");
const errorHandler =require("../utils/error");
const {findUser} = require("../services/user");


/**
 *
 * @param msg
 * @returns {string}
 */
// error message custom format for express-validator
 const errorFormatter = ({msg}) => {
    return `${msg}`
}

const registerRules = [
    body("name").not().trim().isEmpty().withMessage("Name is required"),
    body("email").not().trim().isEmpty().withMessage("Email is required")
        .bail()
        .isEmail().withMessage("Email is invalid")
        .bail()
        .matches(/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,10})$/).withMessage("Email is invalid")
        .custom(async (value) => {
            const user = await findUser('email', value);
            if (user) throw errorHandler('Email already exists', 409);
            return true;
        }),
    body("password").not().trim().isEmpty().withMessage("Password is required")
        .bail()
        .isLength({min: 8}).withMessage("Password must be at least 8 characters long")
        .bail()
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).withMessage("Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"),

]
/**
 *
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
const rulesMessage = (req, res, next) => {
    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.mapped()});
    }
    next();
}

module.exports = {
    registerRules,
    rulesMessage
}