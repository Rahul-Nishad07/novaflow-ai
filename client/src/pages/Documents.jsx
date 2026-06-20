import { useEffect, useState } from "react";
import { getFiles, deleteFile } from "../api/uploadApi";
import FilePreviewModal from "../components/FilePreviewModal";
import { extractText } from "../api/ocrApi";
import { FileText, Search, Trash2, Eye, Cpu, Loader2, X } from "lucide-react";
import { cleanupOCRText } from "../api/aiApi";
import { extractPDF } from "../api/pdfApi";
import { generateSummary } from "../api/summaryApi";
import { askQuestion } from "../api/chatApi";
import { extractDOCX } from "../api/docxApi";
import { extractExcel } from "../api/excelApi";

export default function Documents() {
  // --- STATES ---
  const [files, setFiles] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const [ocrText, setOcrText] = useState("");
  const [showOCR, setShowOCR] = useState(false);
  const [loadingOCR, setLoadingOCR] = useState(false);
  const [cleanText, setCleanText] = useState("");
  const [structuredData, setStructuredData] = useState(null);

  const [pdfText, setPdfText] = useState("");
  const [showPDF, setShowPDF] = useState(false);
  const [summary, setSummary] = useState("");
  const [loadingSummary, setLoadingSummary] = useState(false);

  const [docxText, setDocxText] = useState("");
  const [showDocx, setShowDocx] = useState(false);

  const [excelData, setExcelData] = useState([]);
  const [showExcel, setShowExcel] = useState(false);

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loadingChat, setLoadingChat] = useState(false);

  useEffect(() => { fetchFiles(); }, []);

  const fetchFiles = async () => {
    try {
      const response = await getFiles();
      setFiles(response.data.files || []);
    } catch (error) { console.error(error); }
  };

  // --- HANDLERS ---
  const handleAskQuestion = async (sourceText) => {
    if (!question.trim()) return;
    try {
      setLoadingChat(true);
      const response = await askQuestion(question, sourceText);
      setAnswer(response.data.answer);
    } catch (error) { console.error(error); }
    finally { setLoadingChat(false); }
  };

  const handlePDFExtract = async (fileName) => {
    try {
      setLoadingSummary(true);
      setShowPDF(true);
      const response = await extractPDF(fileName);
      setPdfText(response.data.text);
      const summaryResponse = await generateSummary(response.data.text);
      setSummary(summaryResponse.data.summary);
    } catch (error) { console.error(error); alert("PDF Extraction Failed"); }
    finally { setLoadingSummary(false); }
  };

  const handleDOCXExtract = async (fileName) => {
    try {
      const response = await extractDOCX(fileName);
      setDocxText(response.data.text);
      setShowDocx(true);
    } catch (error) { console.error(error); alert("DOCX Extraction Failed"); }
  };

  const handleExcelExtract = async (fileName) => {
    try {
      const response = await extractExcel(fileName);
      setExcelData(response.data.data);
      setShowExcel(true);
    } catch (error) { console.error(error); alert("Excel Extraction Failed"); }
  };

  const handleOCR = async (fileName) => {
    try {
      setLoadingOCR(true);
      setShowOCR(true);
      const response = await extractText(fileName);
      setOcrText(response.data.text);
      const aiResponse = await cleanupOCRText(response.data.text);
      setCleanText(aiResponse.data.cleanText);
      setStructuredData(aiResponse.data.structuredData);
    } catch (error) { console.error(error); setShowOCR(false); alert("OCR Failed"); }
    finally { setLoadingOCR(false); }
  };

  const handleDelete = async (fileName) => {
    try { await deleteFile(fileName); fetchFiles(); } catch (error) { console.error(error); }
  };

  const getFileType = (fileName) => {
    const ext = fileName.split(".").pop().toLowerCase();
    if (["png", "jpg", "jpeg", "gif", "webp"].includes(ext)) return "Image";
    if (ext === "pdf") return "PDF";
    if (ext === "docx") return "DOCX";
    if (["xls", "xlsx"].includes(ext)) return "Excel";
    return "Document";
  };

  const filteredFiles = files.filter((f) => f.fileName.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 text-slate-200">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Documents</h1>
          <p className="text-slate-400">Manage and process your documents</p>
        </div>
        <div className="bg-indigo-600/10 px-6 py-3 rounded-2xl text-indigo-400 font-semibold border border-indigo-500/20">
          {files.length} Files Total
        </div>
      </div>

      <input 
        className="w-full p-4 rounded-2xl bg-slate-900 border border-slate-800 text-white outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="Search documents..." value={search} onChange={(e) => setSearch(e.target.value)} 
      />

      {/* Files List */}
      <div className="grid gap-4">
        {filteredFiles.map((file, index) => (
          <div key={index} className="flex items-center justify-between bg-slate-900 p-5 rounded-2xl border border-slate-800 hover:border-slate-700 transition">
            <div className="flex items-center gap-4">
              <FileText className="text-indigo-400" />
              <p className="font-semibold">{file.fileName}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setSelectedFile(file)} className="p-2 hover:bg-slate-800 rounded-lg"><Eye size={18} /></button>
              {getFileType(file.fileName) === "Image" && <button onClick={() => handleOCR(file.fileName)} className="bg-indigo-600 px-3 py-1 rounded-lg text-sm">OCR</button>}
              {getFileType(file.fileName) === "PDF" && <button onClick={() => handlePDFExtract(file.fileName)} className="bg-purple-600 px-3 py-1 rounded-lg text-sm">Read PDF</button>}
              {getFileType(file.fileName) === "DOCX" && <button onClick={() => handleDOCXExtract(file.fileName)} className="bg-blue-600 px-3 py-1 rounded-lg text-sm">Read DOCX</button>}
              {getFileType(file.fileName) === "Excel" && <button onClick={() => handleExcelExtract(file.fileName)} className="bg-emerald-600 px-3 py-1 rounded-lg text-sm">Read Excel</button>}
              <button onClick={() => handleDelete(file.fileName)} className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg"><Trash2 size={18} /></button>
            </div>
          </div>
        ))}
      </div>

      {/* Modals */}
      <FilePreviewModal file={selectedFile} onClose={() => setSelectedFile(null)} />
      
      {/* OCR Modal */}
      {showOCR && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 p-8 rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-slate-800">
            <div className="flex justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2"><Cpu className="text-indigo-400"/> AI Intelligence</h2>
              <button onClick={() => setShowOCR(false)}><X /></button>
            </div>
            {loadingOCR ? <div className="text-center py-20"><Loader2 className="animate-spin mx-auto"/></div> : (
              <div className="space-y-6">
                <div><h3 className="text-slate-400 mb-2">Raw OCR</h3><div className="bg-slate-950 p-4 rounded-xl text-sm">{ocrText}</div></div>
                <div><h3 className="text-green-400 mb-2">Cleaned</h3><div className="bg-slate-950 p-4 rounded-xl text-sm">{cleanText}</div></div>
                <div><h3 className="text-indigo-400 mb-2">Structure</h3><pre className="bg-slate-950 p-4 rounded-xl text-xs overflow-x-auto">{JSON.stringify(structuredData, null, 2)}</pre></div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* PDF Modal */}
      {showPDF && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 p-8 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-slate-800">
            <button onClick={() => setShowPDF(false)} className="float-right"><X /></button>
            <h2 className="text-2xl font-bold mb-4">PDF Analysis</h2>
            <div className="bg-indigo-900/20 p-4 rounded-xl mb-4"><p className="text-sm">{loadingSummary ? "Generating..." : summary}</p></div>
            <div className="bg-slate-950 p-4 rounded-xl h-64 overflow-auto text-sm mb-6">{pdfText}</div>
            <input value={question} onChange={(e) => setQuestion(e.target.value)} className="bg-slate-800 p-3 rounded-xl w-full mb-2 outline-none" placeholder="Ask a question..." />
            <button onClick={() => handleAskQuestion(pdfText)} className="bg-indigo-600 px-6 py-2 rounded-xl">Ask</button>
            <div className="mt-4 p-4 bg-slate-950 rounded-xl">{loadingChat ? "Thinking..." : answer}</div>
          </div>
        </div>
      )}

      {/* DOCX Modal */}
      {showDocx && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 p-8 rounded-3xl w-full max-w-4xl max-h-[80vh] overflow-auto border border-slate-800">
             <button onClick={() => setShowDocx(false)} className="float-right"><X /></button>
             <h2 className="text-2xl font-bold mb-4">DOCX Content</h2>
             <pre className="whitespace-pre-wrap bg-slate-950 p-5 rounded-xl">{docxText}</pre>
          </div>
        </div>
      )}

      {/* Excel Modal (Table View) */}
      {showExcel && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 p-8 rounded-3xl w-full max-w-5xl max-h-[80vh] flex flex-col border border-slate-800">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Excel Data</h2>
              <button onClick={() => setShowExcel(false)}><X /></button>
            </div>
            <div className="overflow-auto flex-1 bg-slate-950 rounded-xl p-2">
              <table className="min-w-full text-white border-collapse">
                <thead>
                  <tr>
                    {excelData.length > 0 && Object.keys(excelData[0]).map((key) => (
                      <th key={key} className="border border-slate-700 bg-slate-800 p-3 text-left">{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {excelData.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {Object.values(row).map((value, colIndex) => (
                        <td key={colIndex} className="border border-slate-700 p-3 text-sm">{value}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// import { useEffect, useState } from "react";
// import { getFiles, deleteFile } from "../api/uploadApi";
// import FilePreviewModal from "../components/FilePreviewModal";
// import { extractText } from "../api/ocrApi";
// import { FileText, Search, Trash2, Eye } from "lucide-react";
// import { cleanupOCRText } from "../api/aiApi";
// import { extractPDF } from "../api/pdfApi";
// import { generateSummary }
// from "../api/summaryApi";

// export default function Documents() {
//   const [files, setFiles] = useState([]);
//   const [search, setSearch] = useState("");
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [ocrText, setOcrText] = useState("");
//   const [showOCR, setShowOCR] = useState(false);
//   const [loadingOCR, setLoadingOCR] = useState(false);
//   const [cleanText, setCleanText] = useState("");
//   const [structuredData, setStructuredData] = useState(null);
  
//   // PDF specific states
//   const [pdfText, setPdfText] = useState("");
//   const [showPDF, setShowPDF] = useState(false);

//   useEffect(() => {
//     fetchFiles();
//   }, []);

//   const fetchFiles = async () => {
//     try {
//       const response = await getFiles();
//       setFiles(response.data.files || []);
//     } catch (error) {
//       console.error(error);
//     }


//   };

//  const handlePDFExtract = async (
//   fileName
// ) => {
//   try {
//     const response =
//       await extractPDF(fileName);

//     const text =
//       response.data.text;

//     setPdfText(text);

//     setLoadingSummary(true);

//     const summaryResponse =
//       await generateSummary(text);

//     setSummary(
//       summaryResponse.data.summary
//     );

//     setShowPDF(true);
//   } catch (error) {
//     console.error(error);

//     alert(
//       "PDF Extraction Failed"
//     );
//   } finally {
//     setLoadingSummary(false);
//   }
// };


//   const [summary, setSummary] =
//   useState("");

// const [loadingSummary,
//   setLoadingSummary] =
//   useState(false);

//   const handleDelete = async (fileName) => {
//     try {
//       await deleteFile(fileName);
//       fetchFiles();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const getFileType = (fileName) => {
//     const ext = fileName.split(".").pop().toLowerCase();
//     if (["png", "jpg", "jpeg", "gif", "webp"].includes(ext)) return "Image";
//     if (ext === "pdf") return "PDF";
//     if (["xls", "xlsx", "csv"].includes(ext)) return "Excel";
//     return "Document";
//   };

//   const filteredFiles = files.filter((file) =>
//     file.fileName.toLowerCase().includes(search.toLowerCase())
//   );

//   const handleOCR = async (fileName) => {
//     try {
//       setLoadingOCR(true);
//       setShowOCR(true);
//       const response = await extractText(fileName);
//       const rawText = response.data.text;
//       setOcrText(rawText);

//       const aiResponse = await cleanupOCRText(rawText);
//       setCleanText(aiResponse.data.cleanText);
//       setStructuredData(aiResponse.data.structuredData);
//     } catch (error) {
//       console.error(error);
//       setShowOCR(false);
//       alert("OCR Extraction Failed");
//     } finally {
//       setLoadingOCR(false);
//     }
//   };

//   return (
//     <div className="p-6">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-8">
//         <div>
//           <h1 className="text-3xl font-bold text-white">Documents</h1>
//           <p className="text-slate-400 mt-2">Manage uploaded documents</p>
//         </div>
//         <div className="bg-indigo-600 px-5 py-3 rounded-xl text-white font-semibold">
//           Total Files: {files.length}
//         </div>
//       </div>

//       {/* Search */}
//       <div className="relative mb-6">
//         <Search size={18} className="absolute left-4 top-4 text-slate-400" />
//         <input
//           type="text"
//           placeholder="Search documents..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white outline-none"
//         />
//       </div>

//       {/* Table */}
//       <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
//         <div className="grid grid-cols-4 gap-4 bg-slate-800 p-4 text-slate-300 font-semibold">
//           <div>File Name</div>
//           <div>Type</div>
//           <div>Size</div>
//           <div>Actions</div>
//         </div>

//         {filteredFiles.map((file, index) => (
//           <div key={index} className="grid grid-cols-4 gap-4 items-center p-4 border-t border-slate-800">
//             <div className="flex items-center gap-3 text-white">
//               <FileText size={18} />
//               {file.fileName}
//             </div>

//             <div>
//               <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-400 text-sm">
//                 {getFileType(file.fileName)}
//               </span>
//             </div>

//             <div className="text-slate-300">{file.size}</div>

//             <div className="flex gap-3">
//               <button
//                 onClick={() => setSelectedFile(file)}
//                 className="flex items-center gap-2 bg-green-600 px-3 py-2 rounded-lg text-white"
//               >
//                 <Eye size={16} /> View
//               </button>

//               {getFileType(file.fileName) === "Image" && (
//                 <button
//                   onClick={() => handleOCR(file.fileName)}
//                   className="flex items-center gap-2 bg-indigo-600 px-3 py-2 rounded-lg text-white"
//                 >
//                   OCR
//                 </button>
//               )}

//               {file.fileName.toLowerCase().endsWith(".pdf") && (
//                 <button
//                   onClick={() => handlePDFExtract(file.fileName)}
//                   className="bg-purple-600 px-3 py-2 rounded-lg text-white"
//                 >
//                   Read PDF
//                 </button>
//               )}

//               <button
//                 onClick={() => handleDelete(file.fileName)}
//                 className="flex items-center gap-2 bg-red-600 px-3 py-2 rounded-lg text-white"
//               >
//                 <Trash2 size={16} /> Delete
//               </button>
//             </div>
//           </div>
//         ))}

//         {filteredFiles.length === 0 && (
//           <div className="p-10 text-center text-slate-400">No documents found</div>
//         )}
//       </div>

//       <FilePreviewModal file={selectedFile} onClose={() => setSelectedFile(null)} />

//       {/* OCR & AI Analysis Backdrop Modal */}
//       {showOCR && (
//         <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
//           <div className="bg-slate-900 w-full max-w-3xl rounded-3xl p-6 flex flex-col max-h-[90vh]">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-white text-2xl font-bold">AI Document Intelligence</h2>
//               <button onClick={() => setShowOCR(false)} className="text-white text-xl hover:text-slate-300">
//                 ✕
//               </button>
//             </div>

//             <div className="overflow-y-auto space-y-6 pr-2 custom-scrollbar">
//               {loadingOCR ? (
//                 <div className="text-center p-10 text-slate-400">
//                   Processing document pipelines (OCR + Deep Clean + Structuring)...
//                 </div>
//               ) : (
//                 <>
//                   <div>
//                     <h3 className="text-white font-bold mb-2">Raw OCR Text</h3>
//                     <div className="bg-slate-950 p-4 rounded-xl text-slate-300 whitespace-pre-wrap text-sm">
//                       {ocrText || "No text detected."}
//                     </div>
//                   </div>

//                   <div>
//                     <h3 className="text-green-400 font-bold mb-2">AI Cleaned Text</h3>
//                     <div className="bg-slate-950 p-4 rounded-xl text-slate-300 whitespace-pre-wrap text-sm">
//                       {cleanText || "No context resolved."}
//                     </div>
//                   </div>

//                   <div>
//                     <h3 className="text-indigo-400 font-bold mb-2">Structured Data</h3>
//                     <pre className="bg-slate-950 p-4 rounded-xl text-slate-300 overflow-x-auto text-xs font-mono">
//                       {JSON.stringify(structuredData, null, 2)}
//                     </pre>
//                   </div>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

// <div className="mb-6">
//   <h3
//     className="
//       text-green-400
//       font-bold
//       mb-2
//     "
//   >
//     AI Summary
//   </h3>

//   <div
//     className="
//       bg-slate-950
//       p-5
//       rounded-xl
//       text-slate-300
//     "
//   >
//     {loadingSummary
//       ? "Generating Summary..."
//       : summary}
//   </div>
// </div>


//       {/* PDF Viewer Backdrop Modal */}
//       {showPDF && (
//         <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
//           <div className="bg-slate-900 w-full max-w-4xl rounded-3xl p-6">
//             <div className="flex justify-between mb-4">
//               <h2 className="text-white text-2xl font-bold">PDF Content</h2>
//               <button onClick={() => setShowPDF(false)} className="text-white text-xl hover:text-slate-300">
//                 ✕
//               </button>
//             </div>
//             <div className="bg-slate-950 p-5 rounded-xl text-slate-300 whitespace-pre-wrap max-h-[600px] overflow-auto">
//               {pdfText}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }