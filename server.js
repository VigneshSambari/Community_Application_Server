const express = require("express");
const connectDB = require("./database/db");
const userRoutes = require("./routes/userRoutes");
const roomRoutes = require("./routes/roomRoutes");
const blogRoutes = require("./routes/blogRoutes");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/auth", userRoutes);
app.use("/room", roomRoutes);
app.use("/blog", blogRoutes);



const PORT = 5000 || process.env.PORT;
connectDB();

app.get("/", (req, res) => {
  res.send("hoila");
});

app.listen(PORT, () => console.log("App is Up and Running ..."));
