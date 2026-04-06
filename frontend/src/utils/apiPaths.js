const BASE = import.meta.env.VITE_API_BASE_URL;

if (!BASE) {
  console.error("❌ VITE_API_BASE_URL is not defined in .env");
}

const BASE_URL = `${BASE || "https://interview-backend-vkln.onrender.com"}/api`;

console.log("BASE_URL:", BASE_URL);

export const API_PATHS = {
  AUTH: {
    LOGIN: `${BASE_URL}/auth/login`,
    SIGNUP: `${BASE_URL}/auth/signup`,
  },
  SESSION: {
    CREATE: `${BASE_URL}/sessions/create`,
    GET_ALL: `${BASE_URL}/sessions/my-sessions`,
    GET_ONE: `${BASE_URL}/sessions`,
  },
  AI: {
    GENERATE_QUESTIONS: `${BASE_URL}/ai/generate-questions`,
    EXPLAIN: `${BASE_URL}/ai/generate-explanation`,
  },
};
