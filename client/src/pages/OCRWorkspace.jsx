import { useState } from "react";
import axios from "axios";
import {
  UploadCloud,
  FileText,
  Copy,
  Download,
  ScanText,
} from "lucide-react";

export default function OCRWorkspace() {

  const [image, setImage] =
    useState(null);

  const [preview, setPreview] =
    useState("");

  const [text, setText] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleImage =
    (e) => {

      const file =
        e.target.files[0];

      if (!file) return;

      setImage(file);

      setPreview(
        URL.createObjectURL(file)
      );
    };

  const extractText =
    async () => {

      if (!image) return;

      try {

        setLoading(true);

        const formData =
          new FormData();

        formData.append(
          "image",
          image
        );

        const response =
          await axios.post(
            "http://localhost:5000/api/ocr",
            formData,
            {
              headers: {
                "Content-Type":
                  "multipart/form-data",
              },
            }
          );

        setText(
          response.data.text
        );

      } catch (error) {

        console.error(error);

        alert(
          "OCR Failed"
        );

      } finally {

        setLoading(false);
      }
    };

  const copyText = () => {

    navigator.clipboard.writeText(
      text
    );

    alert(
      "Copied Successfully"
    );
  };

  const downloadText = () => {

    const blob =
      new Blob(
        [text],
        {
          type:
            "text/plain",
        }
      );

    const url =
      URL.createObjectURL(blob);

    const a =
      document.createElement("a");

    a.href = url;

    a.download =
      "ocr-result.txt";

    a.click();
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">

      {/* Header */}

      <div className="mb-8">

        <h1 className="text-3xl font-bold text-white">
          OCR Workspace
        </h1>

        <p className="text-slate-400 mt-2">
          Extract text from images instantly
        </p>

      </div>

      <div className="grid lg:grid-cols-2 gap-6">

        {/* Upload Section */}

        <div
          className="
            bg-slate-900
            border
            border-slate-800
            rounded-3xl
            p-6
          "
        >

          <h2
            className="
              text-white
              text-xl
              font-semibold
              mb-5
            "
          >
            Upload Image
          </h2>

          <label
            className="
              border-2
              border-dashed
              border-slate-700
              rounded-3xl
              h-72
              flex
              flex-col
              items-center
              justify-center
              cursor-pointer
              hover:border-indigo-500
            "
          >

            <UploadCloud
              size={48}
              className="text-indigo-400"
            />

            <p className="text-slate-300 mt-4">
              Click to Upload Image
            </p>

            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleImage}
            />

          </label>

          {preview && (

            <img
              src={preview}
              alt="preview"
              className="
                mt-5
                rounded-2xl
                w-full
                h-72
                object-cover
              "
            />

          )}

          <button
            onClick={extractText}
            disabled={!image}
            className="
              mt-5
              w-full
              bg-indigo-600
              hover:bg-indigo-500
              py-3
              rounded-xl
              text-white
              font-semibold
            "
          >
            {
              loading
                ? "Processing..."
                : "Extract Text"
            }
          </button>

        </div>

        {/* Result Section */}

        <div
          className="
            bg-slate-900
            border
            border-slate-800
            rounded-3xl
            p-6
          "
        >

          <div
            className="
              flex
              justify-between
              items-center
              mb-5
            "
          >

            <h2
              className="
                text-white
                text-xl
                font-semibold
              "
            >
              OCR Result
            </h2>

            <div className="flex gap-3">

              <button
                onClick={copyText}
                className="
                  bg-slate-800
                  p-2
                  rounded-lg
                "
              >
                <Copy
                  size={18}
                  className="text-white"
                />
              </button>

              <button
                onClick={downloadText}
                className="
                  bg-slate-800
                  p-2
                  rounded-lg
                "
              >
                <Download
                  size={18}
                  className="text-white"
                />
              </button>

            </div>

          </div>

          <div
            className="
              bg-slate-950
              border
              border-slate-800
              rounded-2xl
              min-h-[450px]
              p-5
              overflow-auto
            "
          >

            {text ? (

              <pre
                className="
                  text-slate-300
                  whitespace-pre-wrap
                "
              >
                {text}
              </pre>

            ) : (

              <div
                className="
                  h-full
                  flex
                  items-center
                  justify-center
                  text-slate-500
                "
              >
                <div
                  className="
                    flex
                    flex-col
                    items-center
                    gap-3
                  "
                >
                  <ScanText size={50} />
                  No OCR Result Yet
                </div>
              </div>

            )}

          </div>

        </div>

      </div>

    </div>
  );
}