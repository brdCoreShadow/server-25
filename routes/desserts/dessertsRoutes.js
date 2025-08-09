const express = require("express");
const router = express.Router();
const dessertsModel = require("../../controllers/desserts_junior/desserts_junior");
const {
  dessertSchema,
  dessertPatchSchema,
} = require("../../models/dessert_junior/dessertSchema");
const upload = require('../../middleware/uploadMiddleware');

router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const desserts = await dessertsModel.getAllDesserts(page);
    res.json(desserts);
  } catch (err) {
    console.error("Error fetching desserts:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/name/:value", async (req, res) => {
  try {
    const desserts = await dessertsModel.getDessertsByParam(
      "name",
      req.params.value
    );
    res.json(desserts);
  } catch (err) {
    console.error("Error fetching desserts by name:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/category/:value", async (req, res) => {
  try {
    const desserts = await dessertsModel.getDessertsByParam(
      "category",
      req.params.value
    );
    res.json(desserts);
  } catch (err) {
    console.error("Error fetching desserts by category:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/id/:value", async (req, res) => {
  try {
    const dessert = await dessertsModel.getDessertsByParam(
      "id",
      req.params.value
    );

    if (!dessert) {
      return res.status(404).json({ message: "Dessert not found" });
    }

    res.json(dessert);
  } catch (err) {
    console.error("Error fetching dessert by ID:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { error, value } = dessertSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const newDessert = await dessertsModel.createDessert(value);
    res.status(201).json(newDessert);
  } catch (err) {
    console.error("Error adding dessert:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.patch("/:id", upload.single("image"), async (req, res) => {
  try {
    const id = req.params.id;

    // Merge body and file info into one update object
  const updates = {
  ...req.body,
  ...(req.file ? { image_url: req.file.path } : {}),
};

    console.log(req.body);
    console.log("updates: ", updates)
    const { error, value } = dessertPatchSchema.validate(updates);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const success = await dessertsModel.updateDessert(id, value);

    if (!success) {
      return res
        .status(404)
        .json({ message: "Dessert not found or not updated" });
    }

    res.json({ message: "Dessert updated successfully" });
  } catch (err) {
    console.error("Error updating dessert:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const success = await dessertsModel.deleteDessert(id);

    if (!success) {
      return res.status(404).json({ message: "Dessert not found" });
    }

    res.json({ message: "Dessert deleted successfully" });
  } catch (err) {
    console.error("Error deleting dessert:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
