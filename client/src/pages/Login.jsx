import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { loginUser } from "../api/authApi";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    // Prevent the page from refreshing on form submission
    e.preventDefault();
    
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      setError("");

      console.log("=== STARTING LOGIN API CALL ===");
      const response = await loginUser({ email, password });
      
      console.log("=== LOGIN RESPONSE RECEIVED ===");
      console.log("Response Data:", response?.data);

      if (!response?.data) {
        throw new Error("Backend response me data nahi mila!");
      }

      // REPLACED: Ab token direct context function ke parameters me ja rha hai
      if (login) {
        console.log("Calling login() hook with token and user details...");
        login(response.data.token, response.data.user);
      } else {
        console.warn("Warning: useAuth se 'login' function nahi mila!");
      }

      // Route the user to dashboard safely
      console.log("Redirecting to /dashboard now...");
      
      setTimeout(() => {
        navigate("/dashboard");
      }, 100);

    } catch (err) {
      console.error("=== LOGIN ERROR CATCHED ===");
      console.error("Full Error Object:", err);
      
      if (err.response) {
        console.error("Backend Error Data:", err.response.data);
        console.error("Backend Error Status:", err.response.status);
      }

      setError(
        err?.response?.data?.message || err?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
        <h1 className="text-3xl font-bold text-white">NovaFlow AI</h1>
        <p className="text-slate-400 mt-2">AI Workflow Automation</p>

        {error && (
          <div className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <Input
            label="Email"
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

         <Button
  type="submit"
  disabled={loading}
  className="w-full"
>
  {loading
    ? "Signing In..."
    : "Login"}
</Button>

<div className="text-center mt-5">

  <p className="text-slate-400 text-sm">
    Don't have an account?
  </p>

  <button
    type="button"
    onClick={() =>
      navigate("/register")
    }
    className="
      mt-2
      text-indigo-400
      hover:text-indigo-300
      font-medium
      transition
    "
  >
    Create Account
  </button>

</div>
        </form>
      </div>
    </div>
  );
}