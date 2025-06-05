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
      data: { ...extension.toObject() },
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateElement = async (req, res) => {
  try {
    const { _id } = req.params;
    const { newState } = req.body || "active";
    const data = req.file?.path;

    let result;

console.log(newState);


    if (data) {
      result = await Extensions.findOneAndUpdate(
        { _id },
        { coverImage: data },
        { new: true }
      );
    } else {
      result = await Extensions.findOneAndUpdate(
        { _id },
        { state: newState },
        { new: true }
      );
    }

    if (!result) {
      throw HttpError(404, "Not found");
    }

    res.status(200).json({ result });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateProp = async (req, res) => {
  try {
    const { _id } = req.params;
    const {state} = req.body;

    const result = await Extensions.findOneAndUpdate({ _id }, { state });

    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json({ state });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }

  
};

const removeOne = async (req, res) => {
  const { _id } = req.params;

  const result = await Extensions.findByIdAndDelete(_id);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(204).json({ message: `${_id} is removed successfully` }); 
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  addNew: ctrlWrapper(addNew),
  removeOne: ctrlWrapper(removeOne),
  updateElement: ctrlWrapper(updateElement),
  updateProp: ctrlWrapper(updateProp),
};
