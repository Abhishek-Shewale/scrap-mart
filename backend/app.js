const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
// REMOVE: const dotenv = require("dotenv");
// REMOVE: dotenv.config();

const Connection = require("./database/db.js");
const Routes = require("./routes/route.js");

const app = express();
const port = 8081;

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

const userRoutes = require("./routes/userRoutes.js");
app.use("/users", userRoutes);

const orderRoutes = require("./routes/orderRoutes.js");
app.use("/orders", orderRoutes);

app.use("/", Routes);

Connection();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});