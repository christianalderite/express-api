const Joi = require('joi');
const uuid = require('uuid');

const schema = Joi.object({
    transaction_id: Joi.string()
        .min(3)
        .max(30)
        .default(uuid.v4()),
    reference_code: Joi.string()
        .min(3)
        .max(30)
        .required(),
    amount: Joi.number()
        .integer()
        .min(1)
        .max(10000000)
        .required(),
    currency: Joi.string()
        .min(3)
        .max(3)
        .required(),
    status: Joi.string()
        .min(4)
        .max(10)
        .default("PENDING"),
    status_code: Joi.string()
        .min(3)
        .max(10)
        .default("000"),
    error_code: Joi.string()
        .min(3)
        .max(10),
    description: Joi.string()
        .min(3)
        .max(30),
})

module.exports = schema;