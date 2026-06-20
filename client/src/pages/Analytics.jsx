import {
  FileText,
  Database,
  Bot,
  TrendingUp,
} from "lucide-react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

const COLORS = [
  "#6366f1",
  "#10b981",
  "#f59e0b",
  "#ef4444",
];

const uploadData = [
  { month: "Jan", uploads: 30 },
  { month: "Feb", uploads: 50 },
  { month: "Mar", uploads: 80 },
  { month: "Apr", uploads: 120 },
  { month: "May", uploads: 170 },
  { month: "Jun", uploads: 220 },
];

const storageData = [
  { name: "PDF", value: 45 },
  { name: "DOCX", value: 20 },
  { name: "Excel", value: 15 },
  { name: "Images", value: 20 },
];

const aiUsageData = [
  { day: "Mon", requests: 120 },
  { day: "Tue", requests: 150 },
  { day: "Wed", requests: 220 },
  { day: "Thu", requests: 280 },
  { day: "Fri", requests: 340 },
  { day: "Sat", requests: 260 },
  { day: "Sun", requests: 180 },
];

export default function Analytics() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">

      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold text-white">
          Analytics
        </h1>

        <p className="text-slate-400 mt-2">
          Monitor uploads, storage and AI usage
        </p>
      </div>

      {/* KPI Cards */}

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <FileText className="text-indigo-400" />
            <span className="text-green-400 text-sm">
              +12%
            </span>
          </div>

          <h3 className="text-slate-400 mt-4">
            Total Uploads
          </h3>

          <p className="text-4xl font-bold text-white mt-2">
            1,250
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <Database className="text-cyan-400" />
            <span className="text-green-400 text-sm">
              +8%
            </span>
          </div>

          <h3 className="text-slate-400 mt-4">
            Storage Used
          </h3>

          <p className="text-4xl font-bold text-white mt-2">
            1.8 GB
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <Bot className="text-purple-400" />
            <span className="text-green-400 text-sm">
              +25%
            </span>
          </div>

          <h3 className="text-slate-400 mt-4">
            AI Requests
          </h3>

          <p className="text-4xl font-bold text-white mt-2">
            5,420
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <TrendingUp className="text-green-400" />
            <span className="text-green-400 text-sm">
              +3%
            </span>
          </div>

          <h3 className="text-slate-400 mt-4">
            Success Rate
          </h3>

          <p className="text-4xl font-bold text-white mt-2">
            97%
          </p>
        </div>

      </div>

      {/* Charts */}

      <div className="grid gap-6 lg:grid-cols-2">

        {/* Upload Trend */}

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">

          <h2 className="text-white text-xl font-semibold mb-6">
            Upload Trends
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <LineChart data={uploadData}>
              <CartesianGrid stroke="#1e293b" />
              <XAxis stroke="#94a3b8" dataKey="month" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="uploads"
                stroke="#6366f1"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>

        </div>

        {/* File Distribution */}

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">

          <h2 className="text-white text-xl font-semibold mb-6">
            File Distribution
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <PieChart>
              <Pie
                data={storageData}
                dataKey="value"
                outerRadius={90}
                label
              >
                {storageData.map(
                  (_, index) => (
                    <Cell
                      key={index}
                      fill={
                        COLORS[
                          index %
                            COLORS.length
                        ]
                      }
                    />
                  )
                )}
              </Pie>

              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

        </div>

      </div>

      {/* AI Usage */}

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">

        <h2 className="text-white text-xl font-semibold mb-6">
          Weekly AI Usage
        </h2>

        <ResponsiveContainer
          width="100%"
          height={350}
        >
          <BarChart data={aiUsageData}>
            <CartesianGrid stroke="#1e293b" />

            <XAxis
              dataKey="day"
              stroke="#94a3b8"
            />

            <YAxis
              stroke="#94a3b8"
            />

            <Tooltip />

            <Bar
              dataKey="requests"
              fill="#10b981"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>

      </div>

      {/* Top Documents */}

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">

        <h2 className="text-white text-xl font-semibold mb-6">
          Top Documents
        </h2>

        <div className="space-y-4">

          {[
            "Annual_Report.pdf",
            "Invoice_Data.xlsx",
            "Project_Document.docx",
            "Employee_List.xlsx",
          ].map((file, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-slate-800 rounded-xl p-4"
            >
              <span className="text-white">
                {file}
              </span>

              <span className="text-indigo-400">
                {Math.floor(
                  Math.random() * 1000
                )}
                views
              </span>
            </div>
          ))}

        </div>

      </div>

    </div>
  );
}