const Tesseract =
  require("tesseract.js");

const extractText = async (
  imagePath
) => {
  try {
    console.log(
      "Reading Image:",
      imagePath
    );

    const {
      data: { text },
    } = await Tesseract.recognize(
      imagePath,
      "eng"
    );

    return text;
  } catch (error) {
    console.error(
      "OCR Service Error:",
      error
    );

    throw error;
  }
};

module.exports = {
  extractText,
};