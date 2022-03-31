const Joi = require('joi');


/**
 * @description Joi validation rules for the user model
 * @type {Joi.ObjectSchema<any>}
 */
const registerSchema = Joi.object().keys({
    name: Joi.string()
        .trim()
        .alphanum()
        .min(3)
        .max(30).required(),
    email: Joi.string()
        .trim()
        .email({minDomainSegments: 2, tlds: {allow: ['com', 'net', 'org']}})
        .normalize()
        .regex(/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,10})$/)
        .required(),
    password: Joi.string()
        .trim()
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/)
        .required().messages(
            {
                'string.pattern.base':'Password must contain at least one lowercase letter, one uppercase letter, one number and one special character minimum 8 characters long'
            }
        )
});
/**
 *
 * @param {Joi.ObjectSchema} schema
 * @returns {(function(*, *, *))|*}
 */
const schemaError = (schema) => {
    return (req, res, next) => {
        schema.validateAsync(req.body)
            .then(() => {
                next();
            })
            .catch((err) => {
                let filterMessage = err.details[0].message.replace(/\"/g, '');
                res.status(400).json({
                    message:  filterMessage,
                });

            });
    }
}

module.exports = {
    registerSchema,
    schemaError
};