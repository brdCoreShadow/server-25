const express = require("express");
let cors = require("cors");
const session = require("express-session");
const path = require("path");
const dotenv = require("dotenv");
const { extensionsRoutes } = require("./routes");
const countriesRoutes = require("./routes/sql/world/countriesRoutes");

require("colors");

const app = express();

app.use(cors({ origin: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "your_secret_key_here",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);
app.use(express.static("public"))

const pathToEnv = path.join(__dirname, "..", "config", ".env");

dotenv.config({ path: pathToEnv });

app.use("/extensions", extensionsRoutes)
app.use("/countries", countriesRoutes);


app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app