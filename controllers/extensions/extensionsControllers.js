const gravatar = require("gravatar");

const { Extensions } = require("../../models/index");

const { ctrlWrapper, HttpError } = require("../../utils/index");

const getAll = async ({ req, res }) => {
  try {
    const result = await Extensions.find();

    res.status(200).json({ result });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addNew = async (req, res) => {
  try {
    const extension = await Extensions.create({
      ...req.body,
    });
    if (!extension) {
      throw HttpError(400, "Unable to save your data");
    }

    res.status(201).json({
      code: 201,
      message: "Success",
      data: { ...extension.toObject()},
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateCover = async (req, res) => {
  const { _id } = req.params;

  const data = req.file.path;

  const result = await Extensions.findOneAndUpdate(
    { _id },
    { coverImage: data }
  );

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(201).json({ data });
};

const removeOne = async (req, res) => {
  const { _id } = req.params;

  const result = await Extensions.findByIdAndDelete(_id);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(204).json({message:`${_id} is removed successfully`}); // No content
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  addNew: ctrlWrapper(addNew),
  removeOne: ctrlWrapper(removeOne),
  updateCover: ctrlWrapper(updateCover),
};
