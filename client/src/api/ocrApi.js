import axios from "axios";

const API =
  "http://localhost:5000/api/ocr";

export const extractText = (
  fileName
) => {
  return axios.post(
    `${API}/extract`,
    {
      fileName,
    }
  );
};