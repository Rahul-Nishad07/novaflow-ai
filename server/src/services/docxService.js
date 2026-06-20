const mammoth = require("mammoth");

const extractDOCXText = async (filePath) => {
  const result =
    await mammoth.extractRawText({
      path: filePath,
    });

  return result.value;
};

module.exports = {
  extractDOCXText,
};