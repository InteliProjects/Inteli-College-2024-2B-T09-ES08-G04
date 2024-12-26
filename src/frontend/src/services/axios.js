import axios from "axios";

let idToken = null;

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, 
  timeout: 5000, 
});

export const setIdToken = (token) => {
  idToken = token;
};

api.interceptors.request.use(
  async (config) => {
    if (idToken) {
      config.headers.Authorization = `Bearer ${idToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
