import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_PATHS } from "../utils/apiPaths";
import axiosInstance from "../utils/axiosInstance";

const Dashboard = () => {
  const [sessions, setSessions] = useState([]);
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      console.log("Logout Done");
    } catch (err) {
      console.log(err);
    }

    localStorage.removeItem("token");
    navigate("/login");
  };

  const fetchSessions = async () => {
    try {
      const res = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
      setSessions(res.data.sessions);
    } catch (error) {
      console.log(error.response);
    }
  };

  const createSession = async () => {
    if (!role || !experience) return alert("Fill all fields");

    try {
      await axiosInstance.post(API_PATHS.SESSION.CREATE, {
        role,
        experience,
        questions: [],
      });
    } catch (error) {
      console.log(error.response);
    }

    setRole("");
    setExperience("");
    fetchSessions();
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-black to-gray-800 text-white px-4 py-10">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-gray-400 mt-1">
              Manage your interview preparation sessions
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="bg-gray-800 text-gray-300 px-4 py-2 rounded-lg border border-gray-700 hover:bg-gray-700 hover:text-white hover:scale-105 transition"
          >
            Logout
          </button>
        </div>

        {/* CREATE SESSION */}
        <div className="bg-gray-900/80 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-gray-700 mb-8">
          <h2 className="text-lg font-semibold mb-4">Create New Session</h2>

          <div className="flex flex-col md:flex-row gap-4">
            <input
              placeholder="Enter Role (Frontend Developer)"
              value={role}
              className="bg-gray-800 border border-gray-700 p-3 rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder-gray-400"
              onChange={(e) => setRole(e.target.value)}
            />

            <input
              placeholder="Experience (2 yrs)"
              value={experience}
              className="bg-gray-800 border border-gray-700 p-3 rounded-lg w-full md:w-40 focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder-gray-400"
              onChange={(e) => setExperience(e.target.value)}
            />

            <button
              onClick={createSession}
              className="bg-linear-to-r from-cyan-400 to-blue-500 text-black px-6 py-3 rounded-lg hover:scale-105 transition duration-300 shadow-lg hover:shadow-cyan-500/40"
            >
              + Create
            </button>
          </div>
        </div>

        {/* SESSIONS */}
        {sessions.length === 0 ? (
          <div className="text-center text-gray-400 mt-20">
            <p className="text-lg">No sessions yet 😕</p>
            <p className="text-sm">Create your first session to get started</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {sessions.map((s) => (
              <div
                key={s._id}
                onClick={() => navigate(`/interview/${s._id}`)}
                className="bg-gray-900/80 backdrop-blur-lg p-5 rounded-2xl border border-gray-700 hover:shadow-xl hover:shadow-cyan-500/10 hover:scale-[1.03] transition cursor-pointer"
              >
                <h2 className="font-semibold text-lg mb-2 text-white">
                  {s.role}
                </h2>
                <p className="text-gray-400 text-sm">
                  {s.experience} experience
                </p>
                <div className="mt-4 text-xs text-cyan-400">
                  Click to start →
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
