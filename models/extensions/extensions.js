const { model, Schema } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../../utils");

const schemaExtensions = Schema(
  {
    name: {
      type: String,
      require: true,
    },
    text: {
      type: String,
      require: true,
    },
    pic: {
      type: String,
      require: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const extensionsPostSchema = Joi.object({
  name: Joi.string().min(3).required(),
  text: Joi.string().min(10).required(),
  pic: Joi.string()
    .uri({ scheme: ["http", "https"] })
    .required(),
});

schemaExtensions.post("save", handleMongooseError);

const schemas = {
  extensionsPostSchema,
};

const Extensions = model("extensions", schemaExtensions);

module.exports = { Extensions, schemas };