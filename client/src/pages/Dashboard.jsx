import {
  FileText,
  Clock3,
  CheckCircle,
  Bot,
} from "lucide-react";

import StatCard from "../components/dashboard/StatCard";
import { useAuth } from "../hooks/useAuth";

import { useEffect, useState } from "react";
import { getStats } from "../api/dashboardApi";
export default function Dashboard() {
  const { user } = useAuth();

const [stats, setStats] = useState({
  totalFiles: 0,
  pdfs: 0,
  images: 0,
  excels: 0,
});

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
    <div
      className="
    
        bg-slate-950
        p-6
      "
    >
      {/* Header */}

      <div
        className="
          mb-8
          rounded-3xl
          border
          border-slate-800
          bg-gradient-to-r
          from-indigo-600
          to-purple-600
          p-8
        "
      >
        <h1
          className="
            text-4xl
            font-bold
            text-white
          "
        >
          Welcome Back,
          {" "}
          {user?.name || "Rahul"}
          👋
        </h1>

        <p
          className="
            mt-3
            text-indigo-100
          "
        >
          Manage your AI workflows and
          document automation.
        </p>
      </div>

      {/* Stats */}

      <div
        className="
          grid
          gap-6
          md:grid-cols-2
          xl:grid-cols-4
        "
      >
       <StatCard
  title="Documents"
  value={stats.totalFiles}
  icon={FileText}
/>

<StatCard
  title="PDF Files"
  value={stats.pdfs}
  icon={FileText}
/>

<StatCard
  title="Images"
  value={stats.images}
  icon={CheckCircle}
/>

<StatCard
  title="Excel Files"
  value={stats.excels}
  icon={Bot}
/>
      </div>

      {/* Bottom Grid */}

      <div
        className="
          mt-8
          grid
          gap-6
          lg:grid-cols-2
        "
      >
        <div
          className="
            rounded-2xl
            border
            border-slate-800
            bg-slate-900
            p-6
          "
        >
          <h2
            className="
              mb-4
              text-xl
              font-semibold
              text-white
            "
          >
            Recent Uploads
          </h2>

          <div className="space-y-4">
            <div className="rounded-xl bg-slate-800 p-4 text-slate-300">
              Invoice_2026.pdf
            </div>

            <div className="rounded-xl bg-slate-800 p-4 text-slate-300">
              Purchase_Order.xlsx
            </div>

            <div className="rounded-xl bg-slate-800 p-4 text-slate-300">
              Vendor_Document.pdf
            </div>
          </div>
        </div>

        <div
          className="
            rounded-2xl
            border
            border-slate-800
            bg-slate-900
            p-6
          "
        >
          <h2
            className="
              mb-4
              text-xl
              font-semibold
              text-white
            "
          >
            Workflow Activity
          </h2>

          <div className="space-y-4">
            <div className="rounded-xl bg-slate-800 p-4 text-slate-300">
              Document approved
            </div>

            <div className="rounded-xl bg-slate-800 p-4 text-slate-300">
              OCR completed
            </div>

            <div className="rounded-xl bg-slate-800 p-4 text-slate-300">
              AI extraction completed
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}