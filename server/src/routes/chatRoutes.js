const express = require("express");

const router = express.Router();

router.post("/ask", async (req, res) => {
  try {
    const {
      question,
      documentText,
    } = req.body;

    if (!question || !documentText) {
      return res.status(400).json({
        success: false,
        message:
          "Question and document text required",
      });
    }

    const doc =
      documentText.toLowerCase();

    const q =
      question.toLowerCase();

    // simple keyword search

    const words = q.split(" ");

    const found = words.some(
      (word) =>
        doc.includes(word)
    );

    if (!found) {
      return res.json({
        success: true,
        found: false,
        answer:
          "This information was not found in the uploaded document.",
      });
    }

    // return matching chunk

    const paragraphs =
      documentText.split("\n");

    const result =
      paragraphs.find((p) =>
        words.some((w) =>
          p
            .toLowerCase()
            .includes(w)
        )
      );

    res.json({
      success: true,
      found: true,
      answer:
        result ||
        "Relevant information found.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
    });
  }
});

module.exports = router;