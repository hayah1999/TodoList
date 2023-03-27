const Joi = require('joi');

const addSchema = Joi.object({
    title: Joi.string().min(5).max(20).required(),
    status: Joi.string().valid('to-do', 'in progress', 'done').default('to-do'),
    tags: Joi.array().items(Joi.string().max(10))

})

const modifySchema = Joi.object({
    title: Joi.string().min(5).max(20),
    status: Joi.string().valid('to-do', 'in progress', 'done'),
    tags: Joi.array().items(Joi.string().max(10))

})

module.exports = {addSchema , modifySchema};