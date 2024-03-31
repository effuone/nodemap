import axios from 'axios';
export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const backendApiInstance = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default backendApiInstance;
