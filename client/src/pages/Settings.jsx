import { useState } from "react";
import {
  User,
  Lock,
  Bell,
  Database,
  Palette,
  Save,
} from "lucide-react";

export default function Settings() {
  const [theme, setTheme] =
    useState("dark");

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">
          Settings
        </h1>

        <p className="text-slate-400 mt-2">
          Manage your account and preferences
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">

        {/* Profile */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">

          <div className="flex items-center gap-3 mb-6">
            <User className="text-indigo-400" />
            <h2 className="text-xl font-semibold text-white">
              Profile
            </h2>
          </div>

          <div className="space-y-4">

            <input
              type="text"
              placeholder="Full Name"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white"
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white"
            />

            <button
              className="bg-indigo-600 hover:bg-indigo-500 px-5 py-3 rounded-xl text-white flex items-center gap-2"
            >
              <Save size={18} />
              Save Changes
            </button>

          </div>
        </div>

        {/* Security */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">

          <div className="flex items-center gap-3 mb-6">
            <Lock className="text-red-400" />
            <h2 className="text-xl font-semibold text-white">
              Security
            </h2>
          </div>

          <div className="space-y-4">

            <input
              type="password"
              placeholder="Current Password"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white"
            />

            <input
              type="password"
              placeholder="New Password"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white"
            />

            <button
              className="bg-red-600 hover:bg-red-500 px-5 py-3 rounded-xl text-white"
            >
              Update Password
            </button>

          </div>
        </div>

        {/* Appearance */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">

          <div className="flex items-center gap-3 mb-6">
            <Palette className="text-purple-400" />
            <h2 className="text-xl font-semibold text-white">
              Appearance
            </h2>
          </div>

          <div className="space-y-4">

            <div className="flex gap-4">

              <button
                onClick={() =>
                  setTheme("light")
                }
                className={`px-4 py-2 rounded-xl ${
                  theme === "light"
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-800 text-slate-300"
                }`}
              >
                Light
              </button>

              <button
                onClick={() =>
                  setTheme("dark")
                }
                className={`px-4 py-2 rounded-xl ${
                  theme === "dark"
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-800 text-slate-300"
                }`}
              >
                Dark
              </button>

            </div>

          </div>
        </div>

        {/* Notifications */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">

          <div className="flex items-center gap-3 mb-6">
            <Bell className="text-emerald-400" />
            <h2 className="text-xl font-semibold text-white">
              Notifications
            </h2>
          </div>

          <div className="space-y-4">

            <label className="flex items-center gap-3 text-slate-300">
              <input type="checkbox" defaultChecked />
              Email Alerts
            </label>

            <label className="flex items-center gap-3 text-slate-300">
              <input type="checkbox" defaultChecked />
              Upload Notifications
            </label>

            <label className="flex items-center gap-3 text-slate-300">
              <input type="checkbox" defaultChecked />
              AI Processing Notifications
            </label>

          </div>
        </div>

      </div>

      {/* Storage Card */}

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">

        <div className="flex items-center gap-3 mb-4">
          <Database className="text-cyan-400" />
          <h2 className="text-xl font-semibold text-white">
            Storage Usage
          </h2>
        </div>

        <div className="w-full h-4 bg-slate-800 rounded-full overflow-hidden">

          <div
            className="h-full bg-indigo-500"
            style={{
              width: "65%",
            }}
          />

        </div>

        <p className="text-slate-400 mt-3">
          1.3 GB / 2 GB Used
        </p>

      </div>

    </div>
  );
}