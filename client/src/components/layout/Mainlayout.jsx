import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";

export default function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-950 font-sans text-slate-200">
      {/* Sidebar: Desktop fixed, Mobile hidden/overlay */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 transform bg-slate-900 border-r border-slate-800 transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:block
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <Sidebar />
      </div>

      {/* Overlay for mobile when silogoutdebar is open */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 md:hidden" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header with Hamburger Menu */}
        <div className="md:hidden flex items-center p-4 bg-slate-900 border-b border-slate-800">
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-slate-400 hover:text-white">
            <Menu size={24} />
          </button>
          <span className="ml-4 font-bold">NovaFlow AI</span>
        </div>

        <Navbar />

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}







// // import Sidebar from "./Sidebar";
// // import Navbar from "./Navbar";
// // import { Outlet } from "react-router-dom";

// // export default function MainLayout() {
// //   return (
// //     <div className="flex min-h-screen bg-slate-950">
// //       <Sidebar />

// //       <div className="flex-1">
// //         <Navbar />

// //         <main className="p-6">
// //           <Outlet />
// //         </main>
// //       </div>
// //     </div>
// //   );
// // }





