const Joi = require("joi");

const dessertSchema = Joi.object({
  name: Joi.string().max(100).required(),
  category_id: Joi.number().integer().required(),
  price: Joi.number().precision(2).required(),
  description: Joi.string().max(255).allow(null, ""),
  image_url: Joi.string().uri().optional().allow(null, "")
});

const dessertPatchSchema = Joi.object({
  name: Joi.string().max(100),
  category_id: Joi.number().integer(),
  price: Joi.number().precision(2),
  description: Joi.string().max(255).allow(null, ""),
  image_url: Joi.string().uri().optional().allow(null, "")
}).min(1);

module.exports = { dessertSchema, dessertPatchSchema };
