import API from "./axios";

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