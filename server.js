const express = require("express");
const connectDB = require("./database/db");
const app = express();

const PORT = 5000 || process.env.PORT;

connectDB();

app.get("/", (req, res) => {
  res.send("hoila");
});

app.listen(Port, "0.0.0.0", () => console.log("Running"));
