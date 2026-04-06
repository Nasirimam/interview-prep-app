import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";

import QAItem from "../components/QAItems";
import EmptyState from "../components/EmptyState";
import ErrorBanner from "../components/ErrorBanner";
import GenerateButton from "../components/GenerateButton";
import SkeletonCard from "../components/SkeletonCard";
import { API_PATHS } from "../utils/apiPaths";

import axios from "../utils/axiosInstance";
import axiosInstance from "../utils/axiosInstance";

const parseError = (err) => {
  console.log(err);
  if (err.response)
    return (
      err.response.data?.message ||
      err.response.data?.error ||
      `Server error: ${err.response.status}`
    );
  if (err.request) return "Cannot reach server. Check your connection.";
  return err.message || "Something went wrong.";
};

const InterviewPrep = () => {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  const fetchQuestions = useCallback(async () => {
    setLoading(true);
    setFetchError(null);
    try {
      const res = await axios.get(`${API_PATHS.SESSION.GET_ONE}/${id}`);
      setQuestions(res.data.session.questions || []);
    } catch (err) {
      console.log(err.response);
      setFetchError(parseError(err));
    } finally {
      setLoading(false);
    }
  }, [id]);

  const generateQuestions = async () => {
    setGenerating(true);
    try {
      await axiosInstance.post(API_PATHS.AI.GENERATE_QUESTIONS, {
        sessionId: id,
      });
      await fetchQuestions();
      toast.success("Questions generated!");
    } catch (err) {
      toast.error(parseError(err));
    } finally {
      setGenerating(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  return (
    <div className="w-full min-h-screen bg-linear-to-br from-gray-900 via-black to-gray-800 text-white">
      <Toaster
        position="top-right"
        toastOptions={{
          className:
            "!bg-gray-900 !text-white !border !border-gray-700 !shadow-lg",
        }}
      />

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs text-gray-400 font-medium tracking-wide uppercase mb-1">
              Session ID: {id?.slice(0, 8)}
            </p>

            <h1 className="text-2xl font-bold text-white">
              Interview Questions
            </h1>

            {!loading && !fetchError && (
              <p className="text-sm text-gray-400 mt-0.5">
                {questions.length > 0
                  ? `${questions.length} question${questions.length !== 1 ? "s" : ""} ready`
                  : "No questions yet"}
              </p>
            )}
          </div>

          <GenerateButton
            onClick={generateQuestions}
            generating={generating}
            loading={loading}
          />
        </div>

        {/* DIVIDER */}
        <div className="border-t border-gray-700 mb-8" />

        {/* CONTENT */}
        {loading ? (
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : fetchError ? (
          <ErrorBanner message={fetchError} onRetry={fetchQuestions} />
        ) : questions.length === 0 ? (
          <EmptyState onGenerate={generateQuestions} generating={generating} />
        ) : (
          <AnimatePresence>
            <div className="space-y-4">
              {questions.map((q, i) => (
                <motion.div
                  key={q._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: i * 0.05 }}
                  className="bg-gray-900/80 backdrop-blur-lg border border-gray-700 rounded-xl p-4 shadow-lg hover:shadow-cyan-500/10 transition"
                >
                  <QAItem item={q} />
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default InterviewPrep;
