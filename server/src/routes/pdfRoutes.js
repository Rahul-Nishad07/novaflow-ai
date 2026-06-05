const express = require("express");
const router = express.Router();

const path = require("path");
const fs = require("fs");

const {
  extractPDFText,
} = require("../services/pdfService");

router.post("/extract", async (req, res) => {
  try {
    const { fileName } = req.body;

    console.log("File Name:", fileName);

    const filePath = path.join(
      __dirname,
      "../../uploads",
      fileName
    );

    console.log("File Path:", filePath);
    console.log(
      "Exists:",
      fs.existsSync(filePath)
    );

    const text = await extractPDFText(filePath);

    res.json({
      success: true,
      text,
    });
  } catch (error) {
    console.error("PDF ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;