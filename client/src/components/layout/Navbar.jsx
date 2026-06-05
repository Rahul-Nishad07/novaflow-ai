import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function Navbar() {
  const navigate = useNavigate();

  const {
    user,
    logout,
  } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header
      className="
        h-16
        bg-slate-900
        border-b
        border-slate-800
        flex
        items-center
        justify-between
        px-6
      "
    >
      <h2 className="text-white">
        Dashboard
      </h2>

      <div className="flex items-center gap-4">
        <span className="text-slate-300">
          {user?.name}
        </span>

        <button
          onClick={handleLogout}
          className="
            rounded-lg
            bg-red-600
            px-4
            py-2
            text-white
          "
        >
          Logout
        </button>
      </div>
    </header>
  );
}