import axios from "axios";

export const extractPDF =
  (fileName) => {
    return axios.post(
      "http://localhost:5000/api/pdf/extract",
      {
        fileName,
      }
    );
  };