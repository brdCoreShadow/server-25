const pool = require("../../config/dbSql");

const getAll = async () => {
  try {
    const [rows] = await pool.query(`
    SELECT id, user_name, activity, timeframe, current_hours, previous_hours
    FROM time_tracking
  `);

    return { data: rows };
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
};

const getDaily = async () => {
  try {
    const [rows] = await pool.query(`
    SELECT id, user_name, activity, timeframe, current_hours, previous_hours
    FROM time_tracking
  `);

    return { data: rows };
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
};

module.exports = {
  getAll,
};
