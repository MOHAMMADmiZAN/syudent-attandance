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
        .email({minDomainSegments: 2, tlds: {allow: ['com', 'net','org']}})
        .regex(/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,10})$/)
        .required(),
    password: Joi.string()
        .trim()
        .min(8)
        .max(30)
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/)
        .required()
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
                res.status(400).json({
                    message: err.details[0].context.key + err.details[0].message.split('\"')[2],

                });
            });
    }
}

module.exports = {
    registerSchema,
    schemaError
};