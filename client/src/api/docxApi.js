import axios from "axios";

export const extractDOCX = (
  fileName
) =>
  axios.post(
    "http://localhost:5000/api/docx/extract",
    {
      fileName,
    }
  );