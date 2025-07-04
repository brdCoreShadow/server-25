const pool = require("../../../config/dbSql");

const getAllProducts = async () => {
  const [rows] = await pool.query("SELECT * FROM products");
  return rows;
};

const getProductById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM products WHERE id = ?", [id]);
  return rows[0];
};

const createProduct = async ({ name, price }) => {
  const [result] = await pool.query(
    "INSERT INTO products (name, price) VALUES (?, ?)",
    [name, price]
  );
  return result.insertId;
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
};