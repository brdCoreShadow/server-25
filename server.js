// require("colors");

// const path = require("path");
// const dotenv = require("dotenv");
// const app = require('./app');
// const connectDb = require("./config/db");
// const pool = require("./config/")

// const pathToEnv = path.join(__dirname, "config", ".env");
// dotenv.config({ path: pathToEnv });

// const { PORT } = process.env;

// app.listen(PORT, () => {
//   connectDb();
//   console.log(`Server is launched on port: ${PORT}`.bold.green.italic);
// });

require("colors");
const path = require("path");
const dotenv = require("dotenv");
const app = require("./app");

// Load environment variables
const pathToEnv = path.join(__dirname, "config", ".env");
dotenv.config({ path: pathToEnv });

const pool = require("./config/dbSql"); // This should be your MariaDB pool

const { PORT } = process.env;

// Test MariaDB connection before starting server
(async () => {
  try {
    const conn = await pool.getConnection();
    console.log("✅ MariaDB connected successfully".bold.blue);
    conn.release(); // important to release back to pool

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`.bold.green);
    });
  } catch (err) {
    console.error("❌ Failed to connect to MariaDB:", err.message.red);
    process.exit(1);
  }
})();
