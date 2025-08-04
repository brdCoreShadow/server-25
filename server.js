

require("colors");
const path = require("path");
const dotenv = require("dotenv");
const app = require("./app");

const pathToEnv = path.join(__dirname, "config", ".env");
dotenv.config({ path: pathToEnv });

const pool = require("./config/dbSql"); 

const { PORT } = process.env;

(async () => {
  try {
    const conn = await pool.getConnection();
    console.log("✅ MariaDB connected successfully".bold.blue);
    conn.release(); 

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`.bold.green);
    });
  } catch (err) {
    console.error("❌ Failed to connect to MariaDB:", err.message.red);
    process.exit(1);
  }
})();
