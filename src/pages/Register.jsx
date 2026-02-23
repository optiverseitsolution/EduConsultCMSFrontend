import React, { useState } from "react";
import { Eye, GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/authService";

const Register = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    fullname: "",
    email: "",
    password: "",
    repassword: "",
  });

  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const handleChange = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setSuccess("");

    if (data.password !== data.repassword) {
      return setFormError("Passwords do not match");
    }

    if (data.password.length < 6) {
      return setFormError("Password must be at least 6 characters");
    }

    try {
      setLoading(true);

      const response = await registerUser({
        name: data.fullname,
        email: data.email,
        password: data.password,
        password_confirmation: data.repassword,
      });

      setSuccess("Registration successful!");

      setData({
        fullname: "",
        email: "",
        password: "",
        repassword: "",
      });

      // Redirect to login after 1.5s
      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {
      setFormError(
        error.response?.data?.message ||
        "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-100">
      <div className="w-full max-w-sm p-8 rounded-2xl bg-base-200/50 border border-gray-700">

        {/* Logo */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-600 rounded-lg text-white">
            <GraduationCap size={32} />
          </div>
          <h1 className="text-2xl font-black">EduConsult</h1>
        </div>

        <h1 className="text-2xl font-black mb-2">Register</h1>
        <p className="text-sm opacity-70 mb-6">
          Create your account to get started
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <input
            type="text"
            name="fullname"
            value={data.fullname}
            onChange={handleChange}
            placeholder="Full Name"
            className="input input-bordered rounded-lg w-full"
            required
          />

          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            placeholder="Email"
            className="input input-bordered rounded-lg w-full"
            required
          />

          {/* Password */}
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

          {/* Confirm Password */}
          <div className="flex items-center w-full px-3 input input-bordered rounded-lg">
            <input
              type={showRePassword ? "text" : "password"}
              name="repassword"
              value={data.repassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="w-full bg-transparent focus:outline-none"
              required
            />
            <Eye
              size={16}
              className="cursor-pointer text-gray-400"
              onClick={() => setShowRePassword(!showRePassword)}
            />
          </div>

          {formError && (
            <p className="text-red-500 text-sm">{formError}</p>
          )}

          {success && (
            <p className="text-green-500 text-sm">{success}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn bg-blue-600 text-white rounded-lg"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="text-center mt-6 pt-6 border-t border-gray-700">
          <p className="text-sm opacity-70">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 font-semibold">
              Sign in
            </a>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Register;