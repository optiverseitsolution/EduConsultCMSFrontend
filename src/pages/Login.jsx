import React, { useState } from "react";
import { Eye, GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/authService";

const Login = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!data.email || !data.password) {
      return setFormError("All fields are required");
    }

    try {
      setLoading(true);

      const response = await loginUser({
        email: data.email,
        password: data.password,
      });

      const token = response.data.token;

      if (!token) {
        throw new Error("Token not received");
      }

      localStorage.setItem("authToken", token);

      navigate("/dashboard");

    } catch (error) {
      setFormError(
        error.response?.data?.message || "Invalid credentials"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-100">
      <div className="w-full max-w-sm p-8 rounded-2xl bg-base-200/50 border border-gray-700">

        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-600 rounded-lg text-white">
            <GraduationCap size={32} />
          </div>
          <h1 className="text-2xl font-black">EduConsult</h1>
        </div>

        <h1 className="text-2xl font-black mb-2">Login</h1>
        <p className="text-sm opacity-70 mb-6">
          Sign in to your account
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            placeholder="Email"
            className="input input-bordered rounded-lg w-full"
            required
          />

          <div className="flex items-center w-full px-3 input input-bordered rounded-lg">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={data.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full bg-transparent focus:outline-none"
              required
            />
            <Eye
              size={16}
              className="cursor-pointer text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>

          {formError && (
            <p className="text-red-500 text-sm">{formError}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn bg-blue-600 text-white rounded-lg"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="text-center mt-6 pt-6 border-t border-gray-700">
          <p className="text-sm opacity-70">
            Don't have an account?{" "}
            <a href="/register" className="text-blue-600 font-semibold">
              Register
            </a>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Login;