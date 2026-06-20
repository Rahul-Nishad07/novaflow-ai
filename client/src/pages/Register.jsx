import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {

  const navigate =
    useNavigate();

  const [form, setForm] =
    useState({
      name: "",
      email: "",
      password: "",
    });

  const [loading,
    setLoading] =
    useState(false);

  const handleChange =
    (e) => {

      setForm({
        ...form,
        [e.target.name]:
          e.target.value,
      });
    };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        await axios.post(
          "http://localhost:5000/api/auth/register",
          form
        );

        alert(
          "Registration Successful"
        );

        navigate("/");

      } catch (error) {

        console.error(error);

        alert(
          error?.response?.data?.message ||
          "Registration Failed"
        );
      }

      setLoading(false);
    };

  return (
    <div className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-slate-950
    ">

      <div className="
        w-full
        max-w-md
        bg-slate-900
        border
        border-slate-800
        rounded-3xl
        p-8
      ">

        <h1 className="
          text-3xl
          font-bold
          text-white
        ">
          Create Account
        </h1>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            className="
              w-full
              p-3
              rounded-xl
              bg-slate-800
              text-white
            "
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="
              w-full
              p-3
              rounded-xl
              bg-slate-800
              text-white
            "
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="
              w-full
              p-3
              rounded-xl
              bg-slate-800
              text-white
            "
          />

          <button
            type="submit"
            className="
              w-full
              bg-indigo-600
              py-3
              rounded-xl
              text-white
            "
          >
            {
              loading
                ? "Creating..."
                : "Register"
            }
          </button>

        </form>

      </div>

    </div>
  );
}