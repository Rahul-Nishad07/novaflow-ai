import { Link ,NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 h-screen bg-slate-900 text-white p-5">
      <h2 className="text-2xl font-bold mb-8">
        NovaFlow AI
      </h2>

    <ul className="flex flex-col gap-4">
  <NavLink to="/dashboard">Dashboard</NavLink>
  <NavLink to="/upload">Upload</NavLink>
  <NavLink to="/documents">Documents</NavLink>
  <NavLink to="/workflow">Workflow</NavLink>
  <NavLink to="/analytics">Analytics</NavLink>
  <NavLink to="/settings">Settings</NavLink>
</ul>
    </div>
  );
}

export default Sidebar;