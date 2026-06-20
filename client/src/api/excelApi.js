import axios from "axios";

export const extractExcel = (
  fileName
) =>
  axios.post(
    "http://localhost:5000/api/excel/extract",
    {
      fileName,
    }
  );