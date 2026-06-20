import { useState } from "react";
import axios from "axios";
import { UploadCloud, FileText, Loader2, Trash2 } from "lucide-react";

export default function UploadDocument() {
  const [files, setFiles] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  // Handle Drag Drop
  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      setFiles((prev) => [...prev, ...droppedFiles]);
    }
  };

  // Handle Manual Selection
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...selectedFiles]);
    }
  };

  // Remove individual files from the list before upload
  const removeFile = (indexToRemove) => {
    setFiles((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  // Calculated combined storage size
  const totalSizeMB = (
    files.reduce((acc, currentFile) => acc + currentFile.size, 0) / 1024 / 1024
  ).toFixed(2);

  const handleUpload = async () => {
    if (files.length === 0) return;
    try {
      setLoading(true);
      setProgress(0);
      
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("files", file); // Must match backend 'upload.array("files")' name
      });

      // Pointing to your multiple file backend router path
      await axios.post("http://localhost:5000/api/upload/multiple", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (event) => {
          const percent = Math.round((event.loaded * 100) / event.total);
          setProgress(percent);
        },
      });

      alert("Upload Successful");
      setFiles([]);
      setProgress(0);
    } catch (error) {
      console.error(error);
      alert("Upload Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Upload Documents</h1>
        <p className="text-slate-400 mt-1">Add new files to your AI-powered repository</p>
      </div>

      {/* Upload Box */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl">
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-3xl p-12 text-center transition-all duration-300 ${
            dragging
              ? "border-indigo-500 bg-indigo-500/5"
              : "border-slate-700 hover:border-slate-600 bg-slate-950/50"
          }`}
        >
          <input
            type="file"
            multiple
            className="hidden"
            id="fileInput"
            onChange={handleFileChange}
          />
          
          <label htmlFor="fileInput" className="cursor-pointer block">
            <div className="bg-indigo-500/10 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <UploadCloud size={40} className="text-indigo-400" />
            </div>
            <h2 className="text-xl font-semibold text-white">Click or drag files here</h2>
            <p className="text-slate-400 mt-2 text-sm">PDF, PNG, JPG, or DOCX supported</p>
          </label>
        </div>

        {/* Selected Files List Preview */}
        {files.length > 0 && (
          <div className="mt-6 space-y-3">
            <div className="flex justify-between items-center text-slate-400 text-sm px-1">
              <span>Selected Queue ({files.length})</span>
              <span>Total Size: {totalSizeMB} MB</span>
            </div>
            
            <div className="max-h-60 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-slate-950/60 border border-slate-800/80 rounded-2xl"
                >
                  <div className="flex items-center gap-3 truncate mr-4">
                    <FileText size={20} className="text-indigo-400 shrink-0" />
                    <span className="text-white text-sm truncate font-medium">{file.name}</span>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <span className="text-slate-500 text-xs">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                    <button
                      onClick={() => removeFile(index)}
                      className="text-slate-500 hover:text-red-400 p-1 rounded-lg transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Progress Section */}
        {progress > 0 && (
          <div className="mt-8 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-300">Uploading pipeline...</span>
              <span className="text-indigo-400 font-bold">{progress}%</span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Action Button */}
        <button
          onClick={handleUpload}
          disabled={files.length === 0 || loading}
          className="mt-8 w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-600 text-white py-4 rounded-2xl font-semibold transition-all shadow-lg shadow-indigo-500/20"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="animate-spin" size={20} /> Processing Queue...
            </span>
          ) : (
            `Upload ${files.length > 0 ? `${files.length} Documents` : "Documents"}`
          )}
        </button>
      </div>
    </div>
  );
}