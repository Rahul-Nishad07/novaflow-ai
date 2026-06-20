import {
  Bell,
  FileText,
  CheckCircle,
  AlertTriangle,
  Bot,
} from "lucide-react";

export default function Notifications() {

  const notifications = [
    {
      id: 1,
      title: "PDF Uploaded Successfully",
      description:
        "Annual_Report.pdf uploaded successfully.",
      time: "2 min ago",
      icon: FileText,
      color: "text-blue-400",
    },

    {
      id: 2,
      title: "AI Summary Generated",
      description:
        "Summary completed for Invoice.pdf",
      time: "10 min ago",
      icon: Bot,
      color: "text-purple-400",
    },

    {
      id: 3,
      title: "OCR Extraction Completed",
      description:
        "Text extracted from image successfully.",
      time: "25 min ago",
      icon: CheckCircle,
      color: "text-green-400",
    },

    {
      id: 4,
      title: "Storage Warning",
      description:
        "You have used 80% of your storage.",
      time: "1 hour ago",
      icon: AlertTriangle,
      color: "text-yellow-400",
    },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">

      {/* Header */}

      <div className="mb-8">

        <h1 className="text-3xl font-bold text-white">
          Notifications
        </h1>

        <p className="text-slate-400 mt-2">
          Stay updated with your recent activities
        </p>

      </div>

      {/* Summary Card */}

      <div
        className="
        bg-slate-900
        border
        border-slate-800
        rounded-3xl
        p-6
        mb-8
      "
      >
        <div className="flex items-center gap-4">

          <div
            className="
            w-14
            h-14
            rounded-2xl
            bg-indigo-500/20
            flex
            items-center
            justify-center
          "
          >
            <Bell className="text-indigo-400" />
          </div>

          <div>
            <h2 className="text-white text-xl font-bold">
              24 Notifications
            </h2>

            <p className="text-slate-400">
              4 unread notifications
            </p>
          </div>

        </div>
      </div>

      {/* Notification List */}

      <div className="space-y-4">

        {notifications.map((item) => {

          const Icon = item.icon;

          return (
            <div
              key={item.id}
              className="
                bg-slate-900
                border
                border-slate-800
                rounded-2xl
                p-5
                hover:border-indigo-500/30
                transition-all
              "
            >
              <div className="flex items-start gap-4">

                <div
                  className="
                    w-12
                    h-12
                    rounded-xl
                    bg-slate-800
                    flex
                    items-center
                    justify-center
                  "
                >
                  <Icon
                    className={item.color}
                    size={22}
                  />
                </div>

                <div className="flex-1">

                  <div className="flex justify-between">

                    <h3 className="text-white font-semibold">
                      {item.title}
                    </h3>

                    <span className="text-xs text-slate-500">
                      {item.time}
                    </span>

                  </div>

                  <p className="text-slate-400 mt-2">
                    {item.description}
                  </p>

                </div>

              </div>
            </div>
          );
        })}

      </div>

    </div>
  );
}