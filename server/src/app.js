const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");

const app = express();
const uploadRoutes =
  require("./routes/uploadRoutes");
app.use(cors());
app.use(express.json());

app.use(
  "/api/upload",
  uploadRoutes
);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "NovaFlow API Running",
  });
});


const path = require("path");

app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "../uploads")
  )
);

module.exports = app;