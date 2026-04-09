import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log("📤 Request:", config.method.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error("📤 Request Error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log("📥 Response:", response.status, response.data);
    return response;
  },
  (error) => {
    console.error("📥 Response Error:", error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

// ✅ Submit application
export const submitLoanApplication = async (formData) => {
  const response = await api.post('/api/decision', formData);
  return response;
};

// ✅ Get all applications
export const getAllApplications = async () => {
  const response = await api.get('/api/applications');
  return response;
};

// ✅ Get single application by ID
export const getApplicationById = async (id) => {
  const response = await api.get(`/api/applications/${id}`);
  return response;
};

// ✅ Delete application by ID
export const deleteApplication = async (id) => {
  const response = await api.delete(`/api/applications/${id}`);
  return response;
};

// ✅ Update application by ID
export const updateApplication = async (id, data) => {
  const response = await api.put(`/api/applications/${id}`, data);
  return response;
};

export default api;