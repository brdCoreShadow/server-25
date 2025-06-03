require("colors");

const path = require("path");
const dotenv = require("dotenv");
const app = require('./app');
const connectDb = require("./config/db");


const pathToEnv = path.join(__dirname, "config", ".env");
dotenv.config({ path: pathToEnv });

const { PORT } = process.env;

app.listen(PORT, () => {
  connectDb();
  console.log(`Server is launched on port: ${PORT}`.bold.green.italic);
});
