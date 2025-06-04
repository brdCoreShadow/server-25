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
    state: {
      type: String,
      enum: ["active", "inactive"],
    },
  },
  { versionKey: false, timestamps: true }
);

const extensionsPostSchema = Joi.object({
  name: Joi.string().min(3).required(),
  text: Joi.string().min(3).required(),
  coverImage: Joi.string().min(3),
  state: Joi.string().valid("active", "inactive"),
});

schemaExtensions.post("save", handleMongooseError);

const schemas = {
  extensionsPostSchema,
};

const Extensions = model("extensions", schemaExtensions);

module.exports = { Extensions, schemas };
