import axios from "axios";
import { auth } from "../auth";

const api = axios.create({
  baseURL: "https://carrentalsystem-9hm5.onrender.com/api",
  withCredentials: true, 
});

api.interceptors.request.use(
  async (config) => {
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
