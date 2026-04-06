import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { API_PATHS } from "../utils/apiPaths";
import axios from "../utils/axiosInstance";
import Lottie from "lottie-react";
import animationData from "../assets/login-animation.json"; // add your json

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleForm = (e) => {
    let { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(API_PATHS.AUTH.LOGIN, form);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (error) {
      alert("Invalid email and password");
      console.log(error.response);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 via-black to-gray-800 px-4">
      <div className="flex w-full max-w-5xl items-center justify-between gap-8">
        {/* LEFT: LOGIN FORM */}
        <div className="w-full max-w-md bg-gray-900/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-gray-700">
          <h2 className="text-2xl font-bold text-center mb-2 text-white">
            Welcome Back 👋
          </h2>
          <p className="text-gray-400 text-center mb-6 text-sm">
            Login to continue your interview preparation
          </p>

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder-gray-400"
            onChange={handleForm}
          />

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder-gray-400"
            onChange={handleForm}
          />

          <button
            onClick={handleLogin}
            className="w-full bg-linear-to-r from-cyan-400 to-blue-500 text-black py-3 rounded-lg hover:scale-105 transition duration-300 shadow-lg hover:shadow-cyan-500/40"
          >
            Login
          </button>

          <div className="flex items-center my-5">
            <div className="flex-1 h-px bg-gray-700"></div>
            <p className="px-3 text-gray-500 text-sm">OR</p>
            <div className="flex-1 h-px bg-gray-700"></div>
          </div>

          <p className="text-center text-sm text-gray-400">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent font-medium hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>

        {/* RIGHT: ANIMATION */}
        <div className="hidden md:flex w-1/2 justify-center items-center">
          <Lottie animationData={animationData} loop={true} className="w-80" />
        </div>
      </div>
    </div>
  );
};

export default Login;
