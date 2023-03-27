const Joi = require('joi');

const addSchema = Joi.object({
    username: Joi.string().min(8).required(),
    firstName: Joi.string().min(3).max(15).required(),
    lastName: Joi.string().min(3).max(15).required(),
    password: Joi.string().required(),
    dob: Joi.date()
});

const modifySchema = Joi.object({
    username: Joi.string().min(8),
    firstName: Joi.string().min(3).max(15),
    lastName: Joi.string().min(3).max(15),
    password: Joi.string(),
    dob: Joi.date()

});

const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
})

module.exports = { addSchema, modifySchema, loginSchema };