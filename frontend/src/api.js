import axios from 'axios';

export const ACCESS_TOKEN = "access";
export const REFRESH_TOKEN = "refresh";

const BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api/';

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


// Response interceptor to handle errors (specifically 401 Unauthorized)
api.interceptors.response.use(  // .use( handleSuccess, handleError )
  function (response) {
    // If the response is successful, just return it
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    // Check if the error is 401 (Unauthorized) and we haven't already tried to refresh
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark this request as retried

      const refreshToken = localStorage.getItem(REFRESH_TOKEN);

      try {
        // Use a fresh axios instance to avoid infinite loops if this request fails
        // Note: BASE_URL already includes '/api/', so we just append 'token/refresh/'
        const response = await axios.post(`${BASE_URL}token/refresh/`, { refresh: refreshToken });

        // If successful, save the new access token
        localStorage.setItem(ACCESS_TOKEN, response.data.access);

        // Update the header of the original request with the new token
        originalRequest.headers['Authorization'] = `Bearer ${response.data.access}`;

        // Retry the original request using the main 'api' instance
        return api(originalRequest);
      } catch (refreshError) {
        // If refresh fails (token expired or invalid), force logout
        console.error("Session expired, logging out...");
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        window.location.href = "/login";

        // Reject the promise to ensure the calling code knows it failed
        return Promise.reject(refreshError);
      }
    }

    // For all other errors, just return the error
    return Promise.reject(error);
  }
);

export default api;
