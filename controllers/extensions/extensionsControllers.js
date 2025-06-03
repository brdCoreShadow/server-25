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
  const { pic } = req.body;

  const extension = await Extensions.create({ ...req.body });
  if (!extension) {
    throw HttpError(400, "Unable to save your data");
  }

  const coverUrl = gravatar.url(pic || '', { s: '200', r: 'pg', d: 'mm' });

  res.status(201).json({
    code: 201,
    message: "Success",
    data: { ...extension.toObject(), coverImage: coverUrl },
  });
};

const updateCover = async (req, res) => {
  const { id } = req.body;

  const data = req.file.path;

  const result = await Extensions.findOneAndUpdate(
    { id },
    { coverImage: data }
  );

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(201).json({ data });
};

const removeOne = async (req, res) => {
  const { id } = req.params;

  const result = await Extensions.findByIdAndDelete(id);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(204).send(); // No content
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  addNew: ctrlWrapper(addNew),
  removeOne: ctrlWrapper(removeOne),
  updateCover: ctrlWrapper(updateCover),
};