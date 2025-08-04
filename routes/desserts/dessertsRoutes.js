const express = require("express");
const router = express.Router();
const Joi = require("joi");
const dessertsModel = require("../../controllers/desserts_junior/desserts_junior");

// Joi schema for a dessert
const dessertSchema = Joi.object({
  name: Joi.string().max(100).required(),
  category_id: Joi.number().integer().required(),
  price: Joi.number().precision(2).required(),
  description: Joi.string().max(255).allow(null, ""),
  image_url: Joi.string().uri().allow(null, "")
});

// GET /desserts
router.get("/", async (req, res) => {
  try {
    console.log("I'm here");

    const desserts = await dessertsModel.getAllDesserts();
    console.log("GET /desserts route hit", desserts);
    res.json(desserts);
  } catch (err) {
    console.error("Error fetching desserts:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /desserts
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
