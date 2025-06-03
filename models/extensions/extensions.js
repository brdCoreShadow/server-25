const { model, Schema } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../../utils");

const schemaProject = Schema(
  {
    techStack: {
      type: Array,
      require: true,
    },
    title: {
      type: String,
      require: true,
    },
    task: {
      type: String,
      require: true,
    },
    liveUrl: {
      type: String,
      require: true,
    },
    coverImage: {
      type: String,
    },
    summary: {
      type: String,
      require: true,
    },
    preview: {
      type: Array,
     
    },
    difficulty: {
      type: String,
      enum: difficulties,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const projectPostSchema = Joi.object({
  techStack: Joi.array().items(Joi.string().min(2)).min(3).required(),
  title: Joi.string().min(3).required(),
  task: Joi.string().min(10).required(),
  liveUrl: Joi.string()
    .uri({ scheme: ["http", "https"] })
    .required(),
  summary: Joi.string().min(10).required(),
  preview: Joi.array().items(Joi.string().uri()),
  difficulty: Joi.string()
    .valid(...difficulties)
    .required(),
});

schemaProject.post("save", handleMongooseError);

const schemas = {
  projectPostSchema,
};

const Projects = model("projects", schemaProject);

module.exports = { Projects, schemas };