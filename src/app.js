const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const newsRoutes = require("./routes/newsRoutes");
const chatRoutes = require("./routes/chatRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/news", newsRoutes);
app.use("/api/chat", chatRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is working" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
