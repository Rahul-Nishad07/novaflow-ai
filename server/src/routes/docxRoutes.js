const express = require("express");
const router = express.Router();

const path = require("path");
const fs = require("fs");

const {
  extractDOCXText,
} = require("../services/docxService");

router.post("/extract", async (req, res) => {
  try {
    const { fileName } = req.body;

    const filePath = path.join(
      __dirname,
      "../../uploads",
      fileName
    );

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
      });
    }

    const text =
      await extractDOCXText(filePath);

    res.json({
      success: true,
      text,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
    });
  }
});

module.exports = router;