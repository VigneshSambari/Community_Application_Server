const express = require("express");
const connectDB = require("./database/db");
const userRoutes = require("./routes/userRoutes");
const roomRoutes = require("./routes/roomRoutes");
const blogRoutes = require("./routes/blogRoutes");
const profileRoutes = require("./routes/profileRoutes");
const messageRoutes = require("./routes/messageRoutes")
//const {messageURLS} = require('./utils/socket/messageURLS');

const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/auth", userRoutes);
app.use("/room", roomRoutes);
app.use("/profile", profileRoutes);
app.use("/blog", blogRoutes);
app.use("/message", messageRoutes);




const PORT = 5000 || process.env.PORT;
connectDB();

app.get("/", async (req, res) => {

  res.json(data);
});

app.listen(PORT, () => console.log("App is Up and Running ..."));
