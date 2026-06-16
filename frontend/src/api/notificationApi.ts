import axios from "axios";

export const notificationApi = axios.create({
  baseURL: import.meta.env.VITE_NOTIFICATION_API_URL,
  withCredentials: true,
});
