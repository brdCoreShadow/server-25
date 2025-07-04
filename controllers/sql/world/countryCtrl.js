const pool = require("../../../config/dbSql");

// Get all countries
const getAllCountries = async () => {
  const [rows] = await pool.query("SELECT * FROM country");
  return rows;
};

// Get a single country by Code
const getCountryByCode = async (code) => {
  const [rows] = await pool.query("SELECT * FROM country WHERE Code = ?", [code]);
  return rows[0];
};

// Insert new country
const createCountry = async (country) => {
  const {
    Code,
    Name,
    Continent,
    Region,
    SurfaceArea,
    IndepYear,
    Population,
    LifeExpectancy,
    GNP,
    GNPOld,
    LocalName,
    GovernmentForm,
    HeadOfState,
    Capital,
    Code2,
  } = country;

  const [result] = await pool.query(
    `INSERT INTO country (
      Code, Name, Continent, Region, SurfaceArea, IndepYear, Population,
      LifeExpectancy, GNP, GNPOld, LocalName, GovernmentForm,
      HeadOfState, Capital, Code2
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      Code,
      Name,
      Continent,
      Region,
      SurfaceArea,
      IndepYear,
      Population,
      LifeExpectancy,
      GNP,
      GNPOld,
      LocalName,
      GovernmentForm,
      HeadOfState,
      Capital,
      Code2,
    ]
  );

  return result.insertId;
};

module.exports = {
  getAllCountries,
  getCountryByCode,
  createCountry,
};
