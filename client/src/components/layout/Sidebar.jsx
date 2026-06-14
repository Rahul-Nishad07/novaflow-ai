import { NavLink } from "react-router-dom";
import { LayoutDashboard, UploadCloud, FileText, GitBranch, BarChart3, Settings, Bot } from "lucide-react";

function Sidebar() {
  // Navigation config for cleaner mapping
  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Upload", path: "/upload", icon: UploadCloud },
    { name: "Documents", path: "/documents", icon: FileText },
    { name: "Workflow", path: "/workflow", icon: GitBranch },
    { name: "Analytics", path: "/analytics", icon: BarChart3 },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  return (
    <aside className="w-64 h-screen bg-slate-900 border-r border-slate-800 flex flex-col p-6 sticky top-0">
      {/* Brand */}
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="bg-indigo-600 p-2 rounded-xl">
          <Bot size={24} className="text-white" />
        </div>
        <h2 className="text-xl font-bold text-white tracking-tight">NovaFlow AI</h2>
      </div>

      {/* Navigation */}
      <nav className="flex-1">
        <ul className="flex flex-col gap-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }`
                }
              >
                <item.icon size={20} />
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Footer */}
      <div className="pt-6 border-t border-slate-800">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-indigo-400 font-bold text-xs">
            RA
          </div>
          <div className="text-xs">
            <p className="text-white font-medium">Rahul AI</p>
            <p className="text-slate-500">Pro Plan</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;







// import { Link ,NavLink } from "react-router-dom";

// function Sidebar() {
//   return (
//     <div className="w-64 h-screen bg-slate-900 text-white p-5">
//       <h2 className="text-2xl font-bold mb-8">
//         NovaFlow AI
//       </h2>

//     <ul className="flex flex-col gap-4">
//   <NavLink to="/dashboard">Dashboard</NavLink>
//   <NavLink to="/upload">Upload</NavLink>
//   <NavLink to="/documents">Documents</NavLink>
//   <NavLink to="/workflow">Workflow</NavLink>
//   <NavLink to="/analytics">Analytics</NavLink>
//   <NavLink to="/settings">Settings</NavLink>
// </ul>
//     </div>
//   );
// }

// export default Sidebar;