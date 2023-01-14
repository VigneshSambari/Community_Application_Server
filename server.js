const express = require("express");
const connectDB = require("./database/db");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/auth", userRoutes);

const PORT = 5000 || process.env.PORT;
connectDB();

app.get("/", (req, res) => {
  res.send("hoila");
});

app.listen(PORT, () => console.log("App is Up and Running ..."));
