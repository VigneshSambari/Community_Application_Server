const express = require("express");
const connectDB = require("./database/db");
const userRoutes = require("./routes/userRoutes");
const roomRoutes = require("./routes/roomRoutes");
<<<<<<< HEAD
const blogRoutes = require("./routes/blogRoutes");
=======
>>>>>>> 8d5bfd096c55756115e3a4acea7425c3eec7df21
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/auth", userRoutes);
app.use("/room", roomRoutes);
<<<<<<< HEAD
app.use("/blog", blogRoutes);


=======
>>>>>>> 8d5bfd096c55756115e3a4acea7425c3eec7df21

const PORT = 5000 || process.env.PORT;
connectDB();

app.get("/", (req, res) => {
  res.send("hoila");
});

app.listen(PORT, () => console.log("App is Up and Running ..."));
