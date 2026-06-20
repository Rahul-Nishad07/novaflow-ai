import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Get All Files
export const getFiles = () => {
  return API.get("/upload/files");
};

// Delete File
export const deleteFile = (fileName) => {
  return API.delete(
    `/upload/delete/${fileName}`
  );
};

// Multiple Upload
export const uploadFiles = async (files) => {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("files", file);
  });

  return API.post(
    "/upload/multiple",
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );
};