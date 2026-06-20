const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/authRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const aiRoutes = require("./routes/aiRoutes");
const pdfRoutes = require("./routes/pdfRoutes");
const summaryRoutes = require("./routes/summaryRoutes");
const chatRoutes = require("./routes/chatRoutes");
const ocrRoutes = require("./routes/ocrRoutes");
const docxRoutes = require("./routes/docxRoutes");
const excelRoutes = require("./routes/excelRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

// Route Registration
app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/pdf", pdfRoutes);
app.use("/api/summary", summaryRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/ocr", ocrRoutes);
app.use("/api/docx", docxRoutes);
app.use("/api/excel", excelRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Static Files
app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "../uploads")
  )
);

// Test Route
app.get("/", (req, res) => {
  res.json({
    message: "NovaFlow API Running",
  });
});

module.exports = app;