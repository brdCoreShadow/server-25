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

const getAllByParams = async (timeframe) => {
  try {
    let query = ` SELECT id, user_name, activity, timeframe, current_hours, previous_hours
    FROM time_tracking`;

    if (timeframe === "daily") {
      query += " WHERE timeframe = 'daily'";
    
    } else if (timeframe === "weekly"){
        query += " WHERE timeframe = 'weekly'"
       
    } else if (timeframe === "monthly"){
        query += " WHERE timeframe = 'monthly'"
       
    } else {
        throw new Error("Invalid filter type");
    }

    const [rows] = await pool.query(query);

    return { data: rows };
  } catch (error) {
    console.error("Error fetching daily data", error);
    throw error;
  }
};

module.exports = {
  getAll,
  getAllByParams
};
