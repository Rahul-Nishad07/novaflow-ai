import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { LogOut, Bell, User } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="h-16 bg-slate-900/50 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-8 sticky top-0 z-40">
      {/* Title */}
      <h2 className="text-lg font-semibold text-white tracking-wide">
        {window.location.pathname.replace("/", "").toUpperCase() || "DASHBOARD"}
      </h2>

      {/* Right Side Actions */}
      <div className="flex items-center gap-6">
        {/* Notification Icon */}
        <button className="text-slate-400 hover:text-indigo-400 transition-colors">
          <Bell size={20} />
        </button>

        {/* User Info & Logout */}
        <div className="flex items-center gap-4 pl-6 border-l border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
              {user?.name?.charAt(0) || "U"}
            </div>
            <span className="text-sm font-medium text-slate-300 hidden md:block">
              {user?.name || "User"}
            </span>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-all text-sm font-medium"
          >
            <LogOut size={16} />
            <span className="hidden md:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}







// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../hooks/useAuth";

// export default function Navbar() {
//   const navigate = useNavigate();

//   const {
//     user,
//     logout,
//   } = useAuth();

//   const handleLogout = () => {
//     logout();
//     navigate("/");
//   };

//   return (
//     <header
//       className="
//         h-16
//         bg-slate-900
//         border-b
//         border-slate-800
//         flex
//         items-center
//         justify-between
//         px-6
//       "
//     >
//       <h2 className="text-white">
//         Dashboard
//       </h2>

//       <div className="flex items-center gap-4">
//         <span className="text-slate-300">
//           {user?.name}
//         </span>

//         <button
//           onClick={handleLogout}
//           className="
//             rounded-lg
//             bg-red-600
//             px-4
//             py-2
//             text-white
//           "
//         >
//           Logout
//         </button>
//       </div>
//     </header>
//   );
// }