import axios from "axios";

export const askQuestion = (
  question,
  documentText
) =>
  axios.post(
    "http://localhost:5000/api/chat/ask",
    {
      question,
      documentText,
    }
  );