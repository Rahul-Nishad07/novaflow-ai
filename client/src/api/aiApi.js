import axios from "axios";

const API =
  "http://localhost:5000/api/ai";

export const cleanupOCRText = (text) => {
  return axios.post(
    `${API}/cleanup`,
    {
      text,
    }
  );
};