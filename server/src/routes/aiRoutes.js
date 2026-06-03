const express = require("express");

const router = express.Router();

router.post(
  "/cleanup",
  async (req, res) => {
    try {
      const { text } = req.body;

      if (!text) {
        return res.status(400).json({
          success: false,
          message: "Text required",
        });
      }

      let cleanText = text
        .replace(/\s+/g, " ")
        .trim();

      const structuredData = {
        extractedText: cleanText,
      };

      res.json({
        success: true,
        cleanText,
        structuredData,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message: "AI Cleanup Failed",
      });
    }
  }
);

module.exports = router;