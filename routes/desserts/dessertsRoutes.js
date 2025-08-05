const express = require("express");
const router = express.Router();
const dessertsModel = require("../../controllers/desserts_junior/desserts_junior");
const dessertSchema  = require('../../models/dessert_junior/dessertSchema');

router.get("/", async (req, res) => {
  try {
    const desserts = await dessertsModel.getAllDesserts();
    res.json(desserts);
  } catch (err) {
    console.error("Error fetching desserts:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/name/:value", async (req, res) => {
  try {
    const desserts = await dessertsModel.getDessertsByParam("name", req.params.value);
    res.json(desserts);
  } catch (err) {
    console.error("Error fetching desserts by name:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/category/:value", async (req, res) => {
  try {
    const desserts = await dessertsModel.getDessertsByParam("category", req.params.value);
    res.json(desserts);
  } catch (err) {
    console.error("Error fetching desserts by category:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/id/:value", async (req, res) => {
  try {
    const dessert = await dessertsModel.getDessertsByParam("id", req.params.value);

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

module.exports = router;
