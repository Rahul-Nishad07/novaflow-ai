import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { loginUser } from "../api/authApi";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
const { login } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    try {
      setLoading(true);

      const response = await loginUser({
        email,
        password,
      });

      console.log("Login Response:", response.data);

      login(
  response.data.token,
  response.data.user
);

      navigate("/dashboard");
    } catch (err) {
      console.error(err);

      setError(
        err?.response?.data?.message ||
          "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-slate-950
      "
    >
      <div
        className="
          w-full
          max-w-md
          rounded-3xl
          border
          border-slate-800
          bg-slate-900
          p-8
          shadow-xl
        "
      >
        <h1
          className="
            text-3xl
            font-bold
            text-white
          "
        >
          NovaFlow AI
        </h1>

        <p
          className="
            mt-2
            text-slate-400
          "
        >
          AI Workflow Automation
        </p>

        {error && (
          <div
            className="
              mt-4
              rounded-lg
              border
              border-red-500
              bg-red-500/10
              p-3
              text-sm
              text-red-400
            "
          >
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >
          <Input
            label="Email"
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <Button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Signing In..."
              : "Login"}
          </Button>
        </form>
      </div>
    </div>
  );
}