import React, { useState } from "react";
import { Eye, GraduationCap } from "lucide-react";

const Register = () => {
  const [data, setData] = useState({
    fullname: "",
    email: "",
    password: "",
    repassword: "",
  });

  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password !== data.repassword) {
      return setFormError("Passwords do not match");
    }

    if (data.password.length < 6) {
      return setFormError("Password must be at least 6 characters");
    }

    try {
      // Example API call
      console.log("Registering:", data);

      // await axios.post("/api/register", data);

      setSuccess("Registration successful!");
      setData({
        fullname: "",
        email: "",
        password: "",
        repassword: "",
      });
    } catch (err) {
      setError("Something went wrong",err);
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
          <form onSubmit={handleSubmit}>
            <span className="flex flex-col gap-2 mt-2">
              <label className="text-sm font-medium">Full Name</label>
              <input
                type="text"
                name="fullname"
                value={data.fullname}
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
                  type={showRePassword ? "text" : "password"}
                  name="repassword"
                  value={data.repassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  required
                  className="w-full bg-transparent focus:outline-none"
                />

                <Eye
                  size={16}
                  className="cursor-pointer text-gray-400 hover:text-blue-600"
                  onClick={() => setShowRePassword(!showRePassword)}
                />
              </div>
            </span>

            <button
              type="submit"
              className=" w-full text-white btn btn-primary bg-blue-600 border-0 rounded-lg mt-4 hover:bg-blue-700"
            >
              Register
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center w-full mt-6 pt-6 border-t border-gray-700">
          <p className="text-sm opacity-70">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 font-semibold hover:underline">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
