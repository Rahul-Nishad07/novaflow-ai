import { FileText, Clock3, CheckCircle, Bot, Activity, ArrowUpRight } from "lucide-react";
import StatCard from "../components/dashboard/StatCard";
import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { getStats } from "../api/dashboardApi";

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ totalFiles: 0, pdfs: 0, images: 0, excels: 0 });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await getStats();
      setStats(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Welcome Back, {user?.name || "Rahul"} 👋
          </h1>
          <p className="mt-2 text-slate-400 max-w-lg">
            Monitor your document automation pipelines, AI extraction progress, and workflow efficiency.
          </p>
        </div>
        {/* Decorative gradient overlay */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 blur-[100px] rounded-full"></div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Documents" value={stats.totalFiles} icon={FileText} />
        <StatCard title="PDF Processed" value={stats.pdfs} icon={FileText} />
        <StatCard title="Images/OCR" value={stats.images} icon={CheckCircle} />
        <StatCard title="Excel Data" value={stats.excels} icon={Bot} />
      </div>

      {/* Bottom Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Uploads */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <Clock3 size={18} className="text-indigo-400" /> Recent Uploads
            </h2>
            <button className="text-xs text-indigo-400 hover:text-indigo-300">View All</button>
          </div>
          <div className="space-y-3">
            {["Invoice_2026.pdf", "Purchase_Order.xlsx", "Vendor_Document.pdf"].map((file, i) => (
              <div key={i} className="flex items-center justify-between rounded-xl bg-slate-800/50 p-4 border border-slate-700/50 hover:border-indigo-500/50 transition-all">
                <span className="text-slate-300 text-sm">{file}</span>
                <ArrowUpRight size={16} className="text-slate-500" />
              </div>
            ))}
          </div>
        </div>

        {/* Workflow Activity */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <Activity size={18} className="text-emerald-400" /> Workflow Activity
            </h2>
          </div>
          <div className="space-y-3">
            {[
              { text: "Document approved", color: "text-emerald-400" },
              { text: "OCR completed", color: "text-blue-400" },
              { text: "AI extraction completed", color: "text-purple-400" }
            ].map((activity, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl bg-slate-800/50 p-4 border border-slate-700/50">
                <div className={`w-2 h-2 rounded-full bg-current ${activity.color}`}></div>
                <span className="text-slate-300 text-sm">{activity.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}





// import {
//   FileText,
//   Clock3,
//   CheckCircle,
//   Bot,
// } from "lucide-react";

// import StatCard from "../components/dashboard/StatCard";
// import { useAuth } from "../hooks/useAuth";

// import { useEffect, useState } from "react";
// import { getStats } from "../api/dashboardApi";
// export default function Dashboard() {
//   const { user } = useAuth();

// const [stats, setStats] = useState({
//   totalFiles: 0,
//   pdfs: 0,
//   images: 0,
//   excels: 0,
// });

// useEffect(() => {
//   fetchStats();
// }, []);

// const fetchStats = async () => {
//   try {
//     const response = await getStats();

//     setStats(response.data);
//   } catch (error) {
//     console.error(error);
//   }
// };

//   return (
//     <div
//       className="
    
//         bg-slate-950
//         p-6
//       "
//     >
//       {/* Header */}

//       <div
//         className="
//           mb-8
//           rounded-3xl
//           border
//           border-slate-800
//           bg-gradient-to-r
//           from-indigo-600
//           to-purple-600
//           p-8
//         "
//       >
//         <h1
//           className="
//             text-4xl
//             font-bold
//             text-white
//           "
//         >
//           Welcome Back,
//           {" "}
//           {user?.name || "Rahul"}
//           👋
//         </h1>

//         <p
//           className="
//             mt-3
//             text-indigo-100
//           "
//         >
//           Manage your AI workflows and
//           document automation.
//         </p>
//       </div>

//       {/* Stats */}

//       <div
//         className="
//           grid
//           gap-6
//           md:grid-cols-2
//           xl:grid-cols-4
//         "
//       >
//        <StatCard
//   title="Documents"
//   value={stats.totalFiles}
//   icon={FileText}
// />

// <StatCard
//   title="PDF Files"
//   value={stats.pdfs}
//   icon={FileText}
// />

// <StatCard
//   title="Images"
//   value={stats.images}
//   icon={CheckCircle}
// />

// <StatCard
//   title="Excel Files"
//   value={stats.excels}
//   icon={Bot}
// />
//       </div>

//       {/* Bottom Grid */}

//       <div
//         className="
//           mt-8
//           grid
//           gap-6
//           lg:grid-cols-2
//         "
//       >
//         <div
//           className="
//             rounded-2xl
//             border
//             border-slate-800
//             bg-slate-900
//             p-6
//           "
//         >
//           <h2
//             className="
//               mb-4
//               text-xl
//               font-semibold
//               text-white
//             "
//           >
//             Recent Uploads
//           </h2>

//           <div className="space-y-4">
//             <div className="rounded-xl bg-slate-800 p-4 text-slate-300">
//               Invoice_2026.pdf
//             </div>

//             <div className="rounded-xl bg-slate-800 p-4 text-slate-300">
//               Purchase_Order.xlsx
//             </div>

//             <div className="rounded-xl bg-slate-800 p-4 text-slate-300">
//               Vendor_Document.pdf
//             </div>
//           </div>
//         </div>

//         <div
//           className="
//             rounded-2xl
//             border
//             border-slate-800
//             bg-slate-900
//             p-6
//           "
//         >
//           <h2
//             className="
//               mb-4
//               text-xl
//               font-semibold
//               text-white
//             "
//           >
//             Workflow Activity
//           </h2>

//           <div className="space-y-4">
//             <div className="rounded-xl bg-slate-800 p-4 text-slate-300">
//               Document approved
//             </div>

//             <div className="rounded-xl bg-slate-800 p-4 text-slate-300">
//               OCR completed
//             </div>

//             <div className="rounded-xl bg-slate-800 p-4 text-slate-300">
//               AI extraction completed
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }