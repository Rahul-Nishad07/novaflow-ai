import { useState } from "react";
import axios from "axios";
import { UploadCloud, FileText } from "lucide-react";

export default function UploadDocument() {
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
 const [progress, setProgress] =
  useState(0);
  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);

    if (e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
    }
  };

 const handleUpload = async () => {
  if (!file) {
    alert("Select a file first");
    return;
  }

  try {
    setLoading(true);
    setProgress(0);

    const formData = new FormData();
    formData.append("file", file);

    await axios.post(
      "http://localhost:5000/api/upload",
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },

        onUploadProgress: (event) => {
          const percent = Math.round(
            (event.loaded * 100) /
              event.total
          );

          setProgress(percent);
        },
      }
    );

    alert("Upload Successful");

    setFile(null);
    setProgress(0);
  } catch (error) {
    console.error(error);
    alert("Upload Failed");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-slate-950 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Upload Documents
          </h1>

          <p className="text-slate-400 mt-2">
            Upload PDFs, Images and Excel files
          </p>
        </div>

        {/* Upload Card */}

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-10">
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() =>
              setDragging(false)
            }
            onDrop={handleDrop}
            className={`
              border-2
              border-dashed
              rounded-3xl
              p-12
              text-center
              transition-all
              cursor-pointer
              ${
                dragging
                  ? "border-indigo-500 bg-indigo-500/10"
                  : "border-slate-700"
              }
            `}
          >
            <UploadCloud
              size={70}
              className="mx-auto text-indigo-500"
            />

            <h2 className="text-white text-2xl font-semibold mt-5">
              Drag & Drop Files
            </h2>

            <p className="text-slate-400 mt-3">
              Drop files here or browse
            </p>

            <label className="inline-block mt-6">
              <input
                type="file"
                className="hidden"
                onChange={(e) =>
                  setFile(e.target.files[0])
                }
              />

              <span className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-medium">
                Browse Files
              </span>
            </label>
          </div>

          {/* File Preview */}

          {file && (
            <div className="mt-8 bg-slate-800 rounded-2xl p-5 flex items-center gap-4">
              <FileText
                size={40}
                className="text-indigo-400"
              />

              <div className="flex-1">
                <p className="text-white font-medium">
                  {file.name}
                </p>

                <p className="text-slate-400 text-sm">
                  {(file.size / 1024 / 1024).toFixed(
                    2
                  )}{" "}
                  MB
                </p>
              </div>
            </div>
          )}



          {progress > 0 && (
  <div className="mt-6">
    <div className="flex justify-between mb-2">
      <span className="text-white font-medium">
        Upload Progress
      </span>

      <span className="text-indigo-400 font-semibold">
        {progress}%
      </span>
    </div>

    <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
      <div
        className="
          h-full
          bg-gradient-to-r
          from-indigo-500
          to-purple-500
          transition-all
          duration-300
        "
        style={{
          width: `${progress}%`,
        }}
      />
    </div>
  </div>
)}

          {/* Upload Button */}

          <button
  onClick={handleUpload}
  disabled={loading}
  className="
    mt-8
    w-full
    bg-gradient-to-r
    from-indigo-600
    to-purple-600
    hover:opacity-90
    disabled:opacity-50
    text-white
    py-4
    rounded-2xl
    font-semibold
    text-lg
    transition-all
  "
>
  {loading
    ? `Uploading ${progress}%`
    : "Upload Document"}
</button>
        </div>
      </div>
    </div>
  );
}