import axios from "axios";
import { RootState, store } from "../redux/store";
const BASEMENTORURL = 'https://mentorapi.leadlly.in'
const axiosClient = axios.create({
  baseURL: BASEMENTORURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  async (config) => {
    const state: RootState = store.getState();
    const token = state.user.user?.token;

    config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;
