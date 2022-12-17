import axios from 'axios';

const url = import.meta.env.VITE_URL_BACKEND
const instance = axios.create({
  baseURL: /*url ? url :*/ "http://localhost:4000/api",
  timeout: 4000,
  headers: {'Content-Type':'application/json'}
});

export default instance