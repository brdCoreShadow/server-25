const pool = require("../../config/dbSql");

const getAllDesserts = async (page = 1, limit = 9) => {
  const offset = (page - 1) * limit;

  const [rows] = await pool.query(`
    SELECT d.dessert_id, d.name, d.price, d.description, d.image_url, c.name AS category
    FROM desserts d
    JOIN categories c ON d.category_id = c.category_id
    ORDER BY d.name ASC
    LIMIT ? OFFSET ?
  `, [limit, offset]);

  // get total count for pagination info
  const [[{ total }]] = await pool.query(`
    SELECT COUNT(*) AS total FROM desserts
  `);

  return {
    total,
    page,
    pages: Math.ceil(total / limit),
    data: rows
  };
};


const getDessertsByParam = async (type, value) => {
  let query = `
    SELECT d.dessert_id, d.name, d.price, d.description, d.image_url, c.name AS category
    FROM desserts d
    JOIN categories c ON d.category_id = c.category_id
  `;
  const params = [];

  if (type === "id") {
    query += " WHERE d.dessert_id = ?";
    params.push(value);
  } else if (type === "name") {
    query += " WHERE d.name LIKE ?";
    params.push(`%${value}%`);
  } else if (type === "category") {
    query += " WHERE c.name = ?";
    params.push(value);
  } else {
    throw new Error("Invalid filter type");
  }

  query += " ORDER BY d.name ASC";

  const [rows] = await pool.query(query, params);

  if (type === "id") {
    return rows[0] || null;
  }
  return rows;
};

const createDessert = async (dessert) => {
  const [result] = await pool.query(
    `INSERT INTO desserts (name, category_id, price, description, image_url)
     VALUES (?, ?, ?, ?, ?)`,
    [
      dessert.name,
      dessert.category_id,
      dessert.price,
      dessert.description,
      dessert.image_url,
    ]
  );

  return { id: result.insertId, ...dessert };
};

const updateDessert = async (id, updates) => {
  
  const fields = [];
  const values = [];

  if (updates.name !== undefined) {
    fields.push("name = ?");
    values.push(updates.name);
  }
  if (updates.category_id !== undefined) {
    fields.push("category_id = ?");
    values.push(updates.category_id);
  }
  if (updates.price !== undefined) {
    fields.push("price = ?");
    values.push(updates.price);
  }
  if (updates.description !== undefined) {
    fields.push("description = ?");
    values.push(updates.description);
  }
  if (updates.image_url !== undefined) {
    fields.push("image_url = ?");
    values.push(updates.image_url);
  }

  if (fields.length === 0) {
    throw new Error("No valid fields provided for update");
  }

  values.push(id); 

  const [result] = await pool.query(
    `UPDATE desserts SET ${fields.join(", ")} WHERE dessert_id = ?`,
    values
  );

  return result.affectedRows > 0;
};

const deleteDessert = async (id) => {
  const [result] = await pool.query(
    `DELETE FROM desserts WHERE dessert_id = ?`,
    [id]
  );
  return result.affectedRows > 0;
};

module.exports = {
  getAllDesserts,
  createDessert,
  getDessertsByParam,
  updateDessert,
  deleteDessert
};
