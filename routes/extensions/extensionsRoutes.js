const express = require("express");

const {
  validateBody,
  uploadCloud,
} = require("../../middleware/index");
const ctrlExtensions = require("../../controllers/extensions/extensionsControllers");

const { schemas } = require("../../models/index");

const extensionsRoutes = express.Router();

extensionsRoutes.get("/", ctrlExtensions.getAll);

extensionsRoutes.post(
  "/extensions",
  validateBody(schemas.extensionsPostSchema),
  ctrlExtensions.addNew
);

extensionsRoutes.patch(
  "/projects/cover",
  uploadCloud.single("coverImage"),
  ctrlExtensions.updateCover
);

extensionsRoutes.get("/:id", ctrlExtensions.removeOne);



module.exports = extensionsRoutes;