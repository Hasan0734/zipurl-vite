
import axios from "axios";

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL, withCredentials: true });

// api.interceptors.response.use((response) => {
//   return response;
// }, async (error) => {

//   if (error.response && error.response.status !== 401) {
//     return Promise.resolve(error.response);
//   }
//   return Promise.reject(error)
// });


export default api;
