const express = require("express");
const router = express.Router();

router.post("/generate", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({
        success: false,
        message: "Text is required",
      });
    }

    const words = text.split(" ");

    const summary =
      words.slice(0, 120).join(" ") + "...";

    res.json({
      success: true,
      summary,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Summary Failed",
    });
  }
});

module.exports = router;