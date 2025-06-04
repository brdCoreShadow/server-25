const express = require("express");

const { validateBody, uploadCloud } = require("../../middleware/index");
const ctrlExtensions = require("../../controllers/extensions/extensionsControllers");

const { schemas } = require("../../models/index");

const extensionsRoutes = express.Router();

extensionsRoutes.get("/", ctrlExtensions.getAll);

extensionsRoutes.post(
  "/",
  validateBody(schemas.extensionsPostSchema),
  ctrlExtensions.addNew
);

extensionsRoutes.patch(
  "/item/:_id",
  uploadCloud.single("coverImage"),
  ctrlExtensions.updateCover
);

extensionsRoutes.patch(
  "/:_id",
  validateBody(schemas.extensionsPostSchema),
  ctrlExtensions.updateProp
);

extensionsRoutes.get("/:_id", ctrlExtensions.removeOne);

module.exports = extensionsRoutes;
