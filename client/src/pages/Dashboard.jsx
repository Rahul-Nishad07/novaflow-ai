

import { FileText, Clock3, CheckCircle, Bot, Activity, ArrowUpRight, Database } from "lucide-react";
import StatCard from "../components/dashboard/StatCard";
import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { getStats, getRecentUploads } from "../api/dashboardApi"; // Added missing getRecentUploads import
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";

// Colors matching your Slate/Indigo dashboard theme
const COLORS = ["#6366f1", "#38bdf8", "#10b981", "#f59e0b"];

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [recentFiles, setRecentFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all initial dashboard data together
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        const [statsResponse, recentResponse] = await Promise.all([
          getStats(),
          getRecentUploads(),
        ]);
        
        setStats(statsResponse.data);
        setRecentFiles(recentResponse.data.files || []);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  if (loading || !stats) {
    return <div className="text-white p-8 flex justify-center items-center h-screen">Loading dashboard analytics...</div>;
  }

  // Data mapping for charts
  const pieData = [
    { name: "PDF", value: stats?.pdfs || 0 },
    { name: "DOCX", value: stats?.docx || 0 },
    { name: "Excel", value: stats?.excel || 0 },
    { name: "Images", value: stats?.images || 0 },
  ];

  const storageData = [
    { type: "PDF", size: parseFloat(stats?.pdfs || 0) },
    { type: "DOCX", size: parseFloat(stats?.docx || 0) },
    { type: "Excel", size: parseFloat(stats?.excel || 0) },
    { type: "Images", size: parseFloat(stats?.images || 0) },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Welcome Back, {user?.name || "Rahul"} 👋
          </h1>
          <p className="mt-2 text-slate-400">Monitor your document pipelines and storage usage.</p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 blur-[100px] rounded-full"></div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <StatCard title="Total Files" value={stats.totalFiles} icon={FileText} />
        <StatCard title="PDF Files" value={stats.pdfs} icon={FileText} />
        <StatCard title="DOCX Files" value={stats.docx} icon={FileText} />
        <StatCard title="Excel Files" value={stats.excel} icon={Bot} />
        <StatCard title="Images" value={stats.images} icon={CheckCircle} />
        <StatCard title="Storage Used" value={`${stats.storageUsed || 0} MB`} icon={Database} />
      </div>

      {/* Analytics Charts Row */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
          <h2 className="text-white text-lg font-bold mb-4">File Distribution</h2>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#fff' }} />
              <Legend wrapperStyle={{ color: '#94a3b8' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Storage Chart */}
        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
          <h2 className="text-white text-lg font-bold mb-4">Storage Usage</h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={storageData}>
              <XAxis dataKey="type" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#fff' }} />
              <Bar dataKey="size" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Grid (Recent Uploads List & Activity feeds) */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Uploads List */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <Clock3 size={18} className="text-indigo-400" /> Recent Uploads
            </h2>
            <button className="text-xs text-indigo-400 hover:text-indigo-300">View All</button>
          </div>

          <div className="space-y-3">
            {recentFiles.length === 0 ? (
              <p className="text-slate-400 text-sm py-4">No recent uploads found</p>
            ) : (
              recentFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-4 rounded-xl bg-slate-800/30 border border-slate-800/80 hover:border-indigo-500/30 transition-all"
                >
                  <div>
                    <p className="text-white text-sm font-medium">{file.fileName}</p>
                    <p className="text-slate-400 text-xs mt-1">
                      {new Date(file.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <span className="text-indigo-400 text-sm font-medium">{file.size} MB</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Workflow Activity Feed */}
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