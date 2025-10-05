import axios from 'axios';

const base = axios.create({ baseURL: import.meta.env.VITE_API_BASE || 'http://localhost:5000/api' });
let token = null;
base.interceptors.request.use(config => {
  if(token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default {
  get: (url, opts) => base.get(url, opts),
  post: (url, data, opts) => base.post(url, data, opts),
  setToken: (t) => { token = t; }
}
