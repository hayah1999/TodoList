const Joi = require('joi');

const addSchema = Joi.object({
    username: Joi.string().min(8).required(),
    firstName: Joi.string().min(3).max(15).required(),
    lastName: Joi.string().min(3).max(15).required(),
    password: Joi.string().required()
});

const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
})

const modifySchema = Joi.object({
    title: Joi.string().min(5).max(20),
    status: Joi.string().valid('to-do', 'in progress', 'done'),
    tags: Joi.array().items(Joi.string().max(10))

})
module.exports = { addSchema, loginSchema, modifySchema };