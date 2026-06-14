import axios from "axios";

export const generateSummary = (text) =>
  axios.post(
    "http://localhost:5000/api/summary/generate",
    { text }
  );