const joi = require("joi");

module.exports.lilaschema = joi.object({
    lila: joi.object({
        country: joi.string().required(),
        title: joi.string().required(),
        price: joi.number().min(0).max(500000),
        location: joi.string().required(),
        description: joi.string().required(),
        image: joi.string().allow("",null),
    }).required()
})

module.exports.reviewschema = joi.object({
    rating: joi.object({
        comment: joi.string().required(),
        rating: joi.number().required().min(0).max(5)
    }).required()
})
