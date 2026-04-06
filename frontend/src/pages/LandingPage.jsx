import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-linear-to-r from-gray-900 via-black to-gray-800 flex flex-col justify-center items-center text-center px-4">
      <h1 className="text-5xl font-bold mb-6 text-white">
        Ace Interviews with{" "}
        <span className="bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          AI-Powered
        </span>{" "}
        Learning
      </h1>

      <button
        onClick={() => navigate("/login")}
        className="bg-linear-to-r from-cyan-400 to-blue-500 text-black px-6 py-3 rounded-lg hover:scale-105 transition duration-300 shadow-lg hover:shadow-cyan-500/50"
      >
        Get Started
      </button>
    </div>
  );
};

export default LandingPage;
