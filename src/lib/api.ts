import { useAuth } from "@/hooks/use-auth";
import axios from "axios";

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL, withCredentials: true });

// api.interceptors.request.use((config) => {
//   // const auth = useAuth()

//   const auth = { accessToken: '' }

//   if (auth.accessToken) {
//     config.headers.set("Authorization", `Bearer ${"auth.accessToken"}`);
//   }
//   return config;
// },
//   async (error) => {

//     return Promise.reject(error)
//   }
// );


api.interceptors.response.use((response) => {
  return response;
}, async (error) => {

  if (error.response && error.response.status !== 201) {
    return Promise.resolve(error.response);
  }
  return Promise.reject(error)
});


export default api;



// (response) => response,  (error) => {

//   if (error.response && error.response.status === 404) {
//     // Resolve the promise with the error response object
//     // React Router will NOT trigger the ErrorBoundary
//     return Promise.resolve(error.response);
//   }
//   // For other errors (like 500), you might still want to reject
//   return Promise.reject(error);
// }