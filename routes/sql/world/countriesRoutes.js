const express = require("express");
const router = express.Router();
const Joi = require("joi");
const countryModel = require("../../../controllers/sql/world/countryCtrl");

// Joi schema
const countrySchema = Joi.object({
  Code: Joi.string().length(3).required(),
  Name: Joi.string().max(52).required(),
  Continent: Joi.string().valid(
    "Asia", "Europe", "North America", "Africa", "Oceania", "Antarctica", "South America"
  ).required(),
  Region: Joi.string().max(26).required(),
  SurfaceArea: Joi.number().precision(2).required(),
  IndepYear: Joi.number().integer().allow(null),
  Population: Joi.number().integer().required(),
  LifeExpectancy: Joi.number().precision(1).allow(null),
  GNP: Joi.number().precision(2).allow(null),
  GNPOld: Joi.number().precision(2).allow(null),
  LocalName: Joi.string().max(45).required(),
  GovernmentForm: Joi.string().max(45).required(),
  HeadOfState: Joi.string().max(60).allow(null),
  Capital: Joi.number().integer().allow(null),
  Code2: Joi.string().length(2).required(),
});

// GET /countries
router.get("/", async (req, res) => {
  const countries = await countryModel.getAllCountries();
   console.log("GET /countries route hit", countries);

});

// GET /countries/:code
router.get("/:code", async (req, res) => {
  const country = await countryModel.getCountryByCode(req.params.code);
  if (!country) return res.status(404).json({ message: "Not found" });
  res.json(country);
});

// POST /countries
router.post("/", async (req, res) => {
  const { error } = countrySchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });

  try {
    await countryModel.createCountry(req.body);
    res.status(201).json({ message: "Country created", country: req.body });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      res.status(409).json({ message: "Country with this code already exists" });
    } else {
      res.status(500).json({ message: err.message });
    }
  }
});

module.exports = router;
