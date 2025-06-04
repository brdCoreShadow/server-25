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
    coverImage: String,
  },
  { versionKey: false, timestamps: true }
);

const extensionsPostSchema = Joi.object({
  name: Joi.string().min(3).required(),
  text: Joi.string().min(3).required(),
  String: Joi.string().min(3),
});

schemaExtensions.post("save", handleMongooseError);

const schemas = {
  extensionsPostSchema,
};

const Extensions = model("extensions", schemaExtensions);

module.exports = { Extensions, schemas };
