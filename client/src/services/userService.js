import axios from 'axios';

// For Vite
const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// For CRA
// const API = axios.create({
//   baseURL: process.env.REACT_APP_API_BASE_URL,
// });

export const fetchUsers = () => API.get('/');
export const createUser = (data) => API.post('/', data);
export const updateUser = (id, data) => API.put(`/${id}`, data);
export const deleteUser = (id) => API.delete(`/${id}`);
