import {
  Upload,
  ScanText,
  Bot,
  FileText,
  Download,
  CheckCircle,
} from "lucide-react";

const workflowSteps = [
  {
    title: "Upload Document",
    description:
      "Upload PDF, DOCX, Excel or Images",
    icon: Upload,
    status: "completed",
  },
  {
    title: "OCR Processing",
    description:
      "Extract text from document",
    icon: ScanText,
    status: "completed",
  },
  {
    title: "AI Analysis",
    description:
      "Analyze content using AI",
    icon: Bot,
    status: "active",
  },
  {
    title: "Generate Summary",
    description:
      "Create smart summaries",
    icon: FileText,
    status: "pending",
  },
  {
    title: "Download Result",
    description:
      "Export processed output",
    icon: Download,
    status: "pending",
  },
];

export default function Workflow() {
  return (
    <div className="p-8 max-w-7xl mx-auto">

      {/* Header */}

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">
          Workflow Pipeline
        </h1>

        <p className="text-slate-400 mt-2">
          Monitor document processing
          workflow in real-time
        </p>
      </div>

      {/* Overview Cards */}

      <div className="grid gap-6 md:grid-cols-4 mb-10">

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <h3 className="text-slate-400 text-sm">
            Uploaded
          </h3>

          <p className="text-3xl font-bold text-white mt-2">
            156
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <h3 className="text-slate-400 text-sm">
            Processing
          </h3>

          <p className="text-3xl font-bold text-yellow-400 mt-2">
            12
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <h3 className="text-slate-400 text-sm">
            Completed
          </h3>

          <p className="text-3xl font-bold text-green-400 mt-2">
            140
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <h3 className="text-slate-400 text-sm">
            Failed
          </h3>

          <p className="text-3xl font-bold text-red-400 mt-2">
            4
          </p>
        </div>

      </div>

      {/* Workflow Timeline */}

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

        <h2 className="text-xl font-semibold text-white mb-8">
          Current Workflow
        </h2>

        <div className="space-y-8">

          {workflowSteps.map(
            (step, index) => {
              const Icon = step.icon;

              return (
                <div
                  key={index}
                  className="flex items-start gap-5"
                >

                  <div
                    className={`
                    w-14 h-14 rounded-2xl
                    flex items-center justify-center

                    ${
                      step.status ===
                      "completed"
                        ? "bg-green-500/20 text-green-400"
                        : step.status ===
                          "active"
                        ? "bg-indigo-500/20 text-indigo-400"
                        : "bg-slate-800 text-slate-500"
                    }
                  `}
                  >
                    <Icon size={26} />
                  </div>

                  <div className="flex-1">

                    <div className="flex items-center justify-between">

                      <h3 className="text-white font-semibold text-lg">
                        {step.title}
                      </h3>

                      {step.status ===
                        "completed" && (
                        <CheckCircle
                          size={22}
                          className="text-green-400"
                        />
                      )}
                    </div>

                    <p className="text-slate-400 mt-1">
                      {step.description}
                    </p>

                    {step.status ===
                      "active" && (
                      <div className="mt-4">

                        <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">

                          <div
                            className="h-full bg-indigo-500"
                            style={{
                              width:
                                "65%",
                            }}
                          />

                        </div>

                        <p className="text-indigo-400 text-sm mt-2">
                          Processing...
                          65%
                        </p>

                      </div>
                    )}

                  </div>

                </div>
              );
            }
          )}

        </div>

      </div>

      {/* Recent Workflow Activity */}

      <div className="grid md:grid-cols-2 gap-6 mt-8">

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">

          <h2 className="text-white text-lg font-semibold mb-5">
            Recent Activities
          </h2>

          <div className="space-y-4">

            <div className="bg-slate-800 p-4 rounded-xl">
              <p className="text-white">
                PDF uploaded successfully
              </p>
            </div>

            <div className="bg-slate-800 p-4 rounded-xl">
              <p className="text-white">
                OCR completed
              </p>
            </div>

            <div className="bg-slate-800 p-4 rounded-xl">
              <p className="text-white">
                Summary generated
              </p>
            </div>

          </div>

        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">

          <h2 className="text-white text-lg font-semibold mb-5">
            Workflow Success Rate
          </h2>

          <div className="flex items-center justify-center h-48">

            <div className="text-center">

              <p className="text-6xl font-bold text-green-400">
                97%
              </p>

              <p className="text-slate-400 mt-2">
                Successful Processing
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}