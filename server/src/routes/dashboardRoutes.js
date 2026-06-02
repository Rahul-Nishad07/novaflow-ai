const express = require("express");
const router = express.Router();

const fs = require("fs");
const path = require("path");

router.get("/stats", (req, res) => {
  const uploadsDir = path.join(
    __dirname,
    "../../uploads"
  );

  fs.readdir(uploadsDir, (err, files) => {
    if (err) {
      return res.status(500).json({
        success: false,
      });
    }

    const totalFiles = files.length;

    const pdfs = files.filter(
      (file) => file.endsWith(".pdf")
    ).length;

    const images = files.filter((file) =>
      /\.(png|jpg|jpeg|webp)$/i.test(file)
    ).length;

    const excels = files.filter((file) =>
      /\.(xls|xlsx|csv)$/i.test(file)
    ).length;

    res.json({
      success: true,
      totalFiles,
      pdfs,
      images,
      excels,
    });
  });
});

module.exports = router;