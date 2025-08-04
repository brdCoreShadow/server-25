const pool = require('../../config/dbSql');

// Get all desserts
const getAllDesserts = async () => {
  const [rows] = await pool.query(`
    SELECT d.dessert_id, d.name, d.price, d.description, d.image_url, c.name AS category
    FROM desserts d
    JOIN categories c ON d.category_id = c.category_id
    ORDER BY d.name ASC
  `);
  return rows;
};

// Create a new dessert
const createDessert = async (dessert) => {
    
  const [result] = await pool.query(
    `INSERT INTO desserts (name, category_id, price, description, image_url)
     VALUES (?, ?, ?, ?, ?)`,
    [dessert.name, dessert.category_id, dessert.price, dessert.description, dessert.image_url]
  );

  return { id: result.insertId, ...dessert };
};

module.exports = {
  getAllDesserts,
  createDessert,
};
