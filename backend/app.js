const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// 🔍 DEBUG: Check if Railway is passing env vars
console.log("=== RAILWAY ENV CHECK ===");
console.log("MONGODB_URI exists?", !!process.env.MONGODB_URI);
console.log("MONGODB_URI value:", process.env.MONGODB_URI ? "SET" : "NOT SET");
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("All env keys:", Object.keys(process.env).filter(k => k.includes('MONGO')));
console.log("========================");

const Connection = require("./database/db.js");
const Routes = require("./routes/route.js");

const app = express();
const port = 8081;

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
  origin: [
    'https://scrap-mart-pink.vercel.app',   // Your Vercel URL
    'http://localhost:3000',                 // Local React dev
    'http://localhost:5173',                 // Local Vite dev
    'http://127.0.0.1:3000',
    'http://127.0.0.1:5173'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS']
}));

const userRoutes = require("./routes/userRoutes.js");
app.use("/users", userRoutes);

const orderRoutes = require("./routes/orderRoutes.js");
app.use("/orders", orderRoutes);

app.use("/", Routes);

Connection();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});