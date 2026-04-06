import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_PATHS } from "../utils/apiPaths";
import axios from "../utils/axiosInstance";
import Lottie from "lottie-react";
import animationData from "../assets/login-animation.json"; // same animation

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await axios.post(API_PATHS.AUTH.SIGNUP, form);
      navigate("/login");
    } catch (error) {
      console.log(error.response);
      alert("Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 via-black to-gray-800 px-4">
      <div className="flex w-full max-w-5xl items-center justify-between gap-8">
        {/* LEFT: SIGNUP FORM */}
        <div className="w-full max-w-md bg-gray-900/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-gray-700">
          <h2 className="text-2xl font-bold text-center mb-2 text-white">
            Create Account 🚀
          </h2>
          <p className="text-gray-400 text-center mb-6 text-sm">
            Start your AI-powered interview preparation
          </p>

          <input
            type="text"
            placeholder="Enter your name"
            className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder-gray-400"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder-gray-400"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            type="password"
            placeholder="Create a password"
            className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder-gray-400"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button
            onClick={handleSignup}
            className="w-full bg-linear-to-r from-cyan-400 to-blue-500 text-black py-3 rounded-lg hover:scale-105 transition duration-300 shadow-lg hover:shadow-cyan-500/40"
          >
            Sign Up
          </button>

          <div className="flex items-center my-5">
            <div className="flex-1 h-px bg-gray-700"></div>
            <p className="px-3 text-gray-500 text-sm">OR</p>
            <div className="flex-1 h-px bg-gray-700"></div>
          </div>

          <p className="text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent font-medium hover:underline"
            >
              Login
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

export default SignUp;
