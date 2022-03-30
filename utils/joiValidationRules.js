const Joi = require('joi');


/**
 * @description Joi validation rules for the user model
 * @type {Joi.ObjectSchema<any>}
 */
const registerSchema = Joi.object().keys({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(30).required()
});
/**
 *
 * @param {Joi.ObjectSchema} schema
 * @returns {(function(*, *, *))|*}
 */
 const schemaError = (schema)=>{
     return (req,res,next)=> {
         schema.validateAsync(req.body)
             .then(()=>{
                 next();
             })
             .catch((err)=>{
                 res.status(400).json(err.details[0].message);
             });
     }
 }

module.exports = {
    registerSchema,
    schemaError
};