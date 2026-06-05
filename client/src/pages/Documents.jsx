import { useEffect, useState } from "react";
import { getFiles, deleteFile } from "../api/uploadApi";
import FilePreviewModal from "../components/FilePreviewModal";
import { extractText } from "../api/ocrApi";
import { FileText, Search, Trash2, Eye } from "lucide-react";
import { cleanupOCRText } from "../api/aiApi";
import { extractPDF } from "../api/pdfApi";

export default function Documents() {
  const [files, setFiles] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [ocrText, setOcrText] = useState("");
  const [showOCR, setShowOCR] = useState(false);
  const [loadingOCR, setLoadingOCR] = useState(false);
  const [cleanText, setCleanText] = useState("");
  const [structuredData, setStructuredData] = useState(null);
  
  // PDF specific states
  const [pdfText, setPdfText] = useState("");
  const [showPDF, setShowPDF] = useState(false);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const response = await getFiles();
      setFiles(response.data.files || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePDFExtract = async (fileName) => {
    try {
      const response = await extractPDF(fileName);
      setPdfText(response.data.text);
      setShowPDF(true);
    } catch (error) {
      console.error(error);
      alert("PDF Extraction Failed");
    }
  };

  const handleDelete = async (fileName) => {
    try {
      await deleteFile(fileName);
      fetchFiles();
    } catch (error) {
      console.error(error);
    }
  };

  const getFileType = (fileName) => {
    const ext = fileName.split(".").pop().toLowerCase();
    if (["png", "jpg", "jpeg", "gif", "webp"].includes(ext)) return "Image";
    if (ext === "pdf") return "PDF";
    if (["xls", "xlsx", "csv"].includes(ext)) return "Excel";
    return "Document";
  };

  const filteredFiles = files.filter((file) =>
    file.fileName.toLowerCase().includes(search.toLowerCase())
  );

  const handleOCR = async (fileName) => {
    try {
      setLoadingOCR(true);
      setShowOCR(true);
      const response = await extractText(fileName);
      const rawText = response.data.text;
      setOcrText(rawText);

      const aiResponse = await cleanupOCRText(rawText);
      setCleanText(aiResponse.data.cleanText);
      setStructuredData(aiResponse.data.structuredData);
    } catch (error) {
      console.error(error);
      setShowOCR(false);
      alert("OCR Extraction Failed");
    } finally {
      setLoadingOCR(false);
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Documents</h1>
          <p className="text-slate-400 mt-2">Manage uploaded documents</p>
        </div>
        <div className="bg-indigo-600 px-5 py-3 rounded-xl text-white font-semibold">
          Total Files: {files.length}
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search size={18} className="absolute left-4 top-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search documents..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white outline-none"
        />
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
        <div className="grid grid-cols-4 gap-4 bg-slate-800 p-4 text-slate-300 font-semibold">
          <div>File Name</div>
          <div>Type</div>
          <div>Size</div>
          <div>Actions</div>
        </div>

        {filteredFiles.map((file, index) => (
          <div key={index} className="grid grid-cols-4 gap-4 items-center p-4 border-t border-slate-800">
            <div className="flex items-center gap-3 text-white">
              <FileText size={18} />
              {file.fileName}
            </div>

            <div>
              <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-400 text-sm">
                {getFileType(file.fileName)}
              </span>
            </div>

            <div className="text-slate-300">{file.size}</div>

            <div className="flex gap-3">
              <button
                onClick={() => setSelectedFile(file)}
                className="flex items-center gap-2 bg-green-600 px-3 py-2 rounded-lg text-white"
              >
                <Eye size={16} /> View
              </button>

              {getFileType(file.fileName) === "Image" && (
                <button
                  onClick={() => handleOCR(file.fileName)}
                  className="flex items-center gap-2 bg-indigo-600 px-3 py-2 rounded-lg text-white"
                >
                  OCR
                </button>
              )}

              {file.fileName.toLowerCase().endsWith(".pdf") && (
                <button
                  onClick={() => handlePDFExtract(file.fileName)}
                  className="bg-purple-600 px-3 py-2 rounded-lg text-white"
                >
                  Read PDF
                </button>
              )}

              <button
                onClick={() => handleDelete(file.fileName)}
                className="flex items-center gap-2 bg-red-600 px-3 py-2 rounded-lg text-white"
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>
        ))}

        {filteredFiles.length === 0 && (
          <div className="p-10 text-center text-slate-400">No documents found</div>
        )}
      </div>

      <FilePreviewModal file={selectedFile} onClose={() => setSelectedFile(null)} />

      {/* OCR & AI Analysis Backdrop Modal */}
      {showOCR && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 w-full max-w-3xl rounded-3xl p-6 flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-white text-2xl font-bold">AI Document Intelligence</h2>
              <button onClick={() => setShowOCR(false)} className="text-white text-xl hover:text-slate-300">
                ✕
              </button>
            </div>

            <div className="overflow-y-auto space-y-6 pr-2 custom-scrollbar">
              {loadingOCR ? (
                <div className="text-center p-10 text-slate-400">
                  Processing document pipelines (OCR + Deep Clean + Structuring)...
                </div>
              ) : (
                <>
                  <div>
                    <h3 className="text-white font-bold mb-2">Raw OCR Text</h3>
                    <div className="bg-slate-950 p-4 rounded-xl text-slate-300 whitespace-pre-wrap text-sm">
                      {ocrText || "No text detected."}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-green-400 font-bold mb-2">AI Cleaned Text</h3>
                    <div className="bg-slate-950 p-4 rounded-xl text-slate-300 whitespace-pre-wrap text-sm">
                      {cleanText || "No context resolved."}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-indigo-400 font-bold mb-2">Structured Data</h3>
                    <pre className="bg-slate-950 p-4 rounded-xl text-slate-300 overflow-x-auto text-xs font-mono">
                      {JSON.stringify(structuredData, null, 2)}
                    </pre>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* PDF Viewer Backdrop Modal */}
      {showPDF && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 w-full max-w-4xl rounded-3xl p-6">
            <div className="flex justify-between mb-4">
              <h2 className="text-white text-2xl font-bold">PDF Content</h2>
              <button onClick={() => setShowPDF(false)} className="text-white text-xl hover:text-slate-300">
                ✕
              </button>
            </div>
            <div className="bg-slate-950 p-5 rounded-xl text-slate-300 whitespace-pre-wrap max-h-[600px] overflow-auto">
              {pdfText}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}