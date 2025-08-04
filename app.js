const express = require("express");
let cors = require("cors");
const session = require("express-session");
const path = require("path");
const dotenv = require("dotenv");
const dessertRoutes = require('./routes/desserts/dessertsRoutes');

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

app.use((req, res, next) => {
  console.log(`Received ${req.method} request for ${req.url}`);
  next();
});
app.use("/desserts", dessertRoutes);
console.log("✅ Desserts route mounted at /desserts");


app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app