import React, { useState } from "react";
import { Eye, GraduationCap } from "lucide-react";
import { registerUser } from "../api/authService";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [formError, setFormError] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showpassword_confirmation, setShowpassword_confirmation] =
    useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormError("");
    setError("");
    setSuccess("");

    if (
      !data.name ||
      !data.email ||
      !data.password ||
      !data.password_confirmation
    ) {
      return setFormError("All fields are required.");
    }

    if (data.password.length <= 8) {
      return setFormError("Password must be at least 8 characters.");
    }

    if (data.password !== data.password_confirmation) {
      return setFormError("Passwords do not match.");
    }

    try {
      setLoading(true);

      const response = await registerUser(data);

      const { token, message } = response.data;

      if (!token) {
        throw new Error("Token not received");
      }

      localStorage.setItem("token", token);

      setSuccess(message || "Registration successful!");

      setData({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
      });

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      setFormError(
        err.response?.data?.message || err.message || "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-100">
      <div className="w-full max-w-sm gap-2 flex flex-col items-start p-8 rounded-2xl bg-base-200/50 border border-gray-700">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-600 rounded-lg text-white">
            <GraduationCap size={32} />
          </div>
          <div>
            <h1 className="text-2xl font-black">EduConsult</h1>
          </div>
        </div>

        <header className="text-2xl font-black ">
          <h1>Register.</h1>
        </header>
        <p className="text-sm opacity-70 mb-6">
          Create your account to get started
        </p>

        <div className="flex flex-col gap-4 w-full">
          {formError && (
            <div className="w-full p-2 rounded-lg bg-red-500/10 border border-red-500 text-red-500 text-sm">
              {formError}
            </div>
          )}

          {error && (
            <div className="w-full p-2 rounded-lg bg-red-500/10 border border-red-500 text-red-500 text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="w-full p-2 rounded-lg bg-green-500/10 border border-green-500 text-green-500 text-sm">
              {success}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <span className="flex flex-col gap-2 mt-2">
              <label className="text-sm font-medium">Full Name</label>
              <input
                type="text"
                name="name"
                value={data.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="input input-bordered rounded-lg w-full focus:outline-0 focus:border-blue-600"
                required
              />
            </span>
            <span className="flex flex-col gap-2 mt-2">
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={data.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="input input-bordered rounded-lg w-full focus:outline-0 focus:border-blue-600"
                required
              />
            </span>

            <span className="flex flex-col gap-2 mt-2">
              <label className="text-sm font-medium">Password</label>

              <div className="flex items-center w-full px-3 input input-bordered rounded-lg focus-within:border-blue-600 focus:outline-0">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  placeholder="Password"
                  required
                  className="w-full bg-transparent focus:outline-none"
                />

                <Eye
                  size={16}
                  className="cursor-pointer text-gray-400 hover:text-blue-600"
                  onClick={() => setShowPassword(!showPassword)}
                />
              </div>
            </span>

            <span className="flex flex-col gap-2 mt-2">
              <label className="text-sm font-medium">Confirm Password</label>

              <div className="flex items-center w-full px-3 input input-bordered rounded-lg focus-within:border-blue-600">
                <input
                  type={showpassword_confirmation ? "text" : "password"}
                  name="password_confirmation"
                  value={data.password_confirmation}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  required
                  className="w-full bg-transparent focus:outline-none"
                />

                <Eye
                  size={16}
                  className="cursor-pointer text-gray-400 hover:text-blue-600"
                  onClick={() =>
                    setShowpassword_confirmation(!showpassword_confirmation)
                  }
                />
              </div>
            </span>

            <button
              type="submit"
              disabled={loading}
              className="w-full text-white btn btn-primary bg-blue-600 border-0 rounded-lg mt-4 hover:bg-blue-700"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center w-full mt-6 pt-6 border-t border-gray-700">
          <p className="text-sm opacity-70">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-blue-600 font-semibold hover:underline"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
