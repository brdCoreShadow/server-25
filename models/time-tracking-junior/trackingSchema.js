const Joi = require('joi');

const timeTrackingSchema = Joi.object({
  user_name: Joi.string().max(100).required(),
  activity: Joi.string().max(50).required(),
  timeframe: Joi.string().valid('daily', 'weekly', 'monthly').required(),
  current_hours: Joi.number().integer().required(),
  previous_hours: Joi.number().integer().required(),
});

module.exports = {timeTrackingSchema}

