const express = require("express");
const router = express.Router();

const fs = require("fs");
const path = require("path");

const upload = require("../middleware/upload");


// =========================
// GET ALL FILES
// =========================

router.get("/files", (req, res) => {
  const uploadsDir = path.join(
    __dirname,
    "../../uploads"
  );

  fs.readdir(uploadsDir, (err, files) => {

    const fileList = files.map((file) => {
  const filePath = path.join(
    uploadsDir,
    file
  );

  const stats = fs.statSync(filePath);

  return {
    fileName: file,
    fileUrl: `http://localhost:5000/uploads/${file}`,
    size:
      (
        stats.size /
        1024 /
        1024
      ).toFixed(2) + " MB",
  };
});

    res.json({
      success: true,
      files: fileList,
    });
  });
});


// =========================
// UPLOAD FILE
// =========================

router.post(
  "/",
  upload.single("file"),
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    res.json({
      success: true,
      fileName: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size,
    });
  }
);


//delete file


router.delete("/delete/:fileName", (req, res) => {
  const { fileName } = req.params;

  const filePath = path.join(
    __dirname,
    "../../uploads",
    fileName
  );

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({
      success: false,
      message: "File not found",
    });
  }

  fs.unlinkSync(filePath);

  res.json({
    success: true,
    message: "File deleted successfully",
  });
});



module.exports = router;