const express = require("express");
const router = express.Router();

const path = require("path");
const fs = require("fs");

const {
  extractText,
} = require("../services/ocrService");

router.post(
  "/extract",
  async (req, res) => {
    try {
      const { fileName } = req.body;

      if (!fileName) {
        return res.status(400).json({
          success: false,
          message: "File name is required",
        });
      }

      const imagePath = path.join(
        __dirname,
        "../../uploads",
        fileName
      );

      console.log(
        "OCR Request:",
        fileName
      );

      console.log(
        "OCR Path:",
        imagePath
      );

      // Check file exists

      if (!fs.existsSync(imagePath)) {
        return res.status(404).json({
          success: false,
          message: "File not found",
        });
      }

      // Check image extension

      const extension = path
        .extname(fileName)
        .toLowerCase();

      const allowedExtensions = [
        ".png",
        ".jpg",
        ".jpeg",
        ".bmp",
        ".tiff",
        ".webp",
      ];

      if (
        !allowedExtensions.includes(
          extension
        )
      ) {
        return res.status(400).json({
          success: false,
          message:
            "OCR only supports image files",
        });
      }

      const text =
        await extractText(imagePath);

      res.json({
        success: true,
        text,
      });
    } catch (error) {
      console.error(
        "OCR ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message: "OCR Failed",
        error: error.message,
      });
    }
  }
);

module.exports = router;