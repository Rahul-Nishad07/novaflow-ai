import axios from "axios";

export const getStats = () =>
  axios.get(
    "http://localhost:5000/api/dashboard/stats"
  );

  export const getRecentUploads = () =>
  axios.get(
    "http://localhost:5000/api/dashboard/recent-uploads"
  );