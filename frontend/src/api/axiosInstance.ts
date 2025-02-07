import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000', // Change this to match your backend port
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
