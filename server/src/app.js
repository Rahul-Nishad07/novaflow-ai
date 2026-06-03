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


const dashboardRoutes =
  require("./routes/dashboardRoutes");

app.use(
  "/api/dashboard",
  dashboardRoutes
);

const aiRoutes =
  require("./routes/aiRoutes");

app.use(
  "/api/ai",
  aiRoutes
);

const ocrRoutes =
  require("./routes/ocrRoutes");

  app.use("/api/ocr", ocrRoutes);

const path = require("path");

app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "../uploads")
  )
);

module.exports = app;