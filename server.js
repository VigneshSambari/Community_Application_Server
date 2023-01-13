const express = require("express");
const app = express();

const PORT = 5000 || process.env.PORT;

app.get("/", (req, res) => {
  res.send("hoila");
});

app.listen(PORT, () => {
  console.log("APP is Up and Running ... ");
});
