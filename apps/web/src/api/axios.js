import axios from "axios"; // Axios is a promise-based HTTP client for the browser and Node.js. It provides an easy-to-use API to send asynchronous HTTP requests to REST endpoints and perform CRUD operations. It can be used in both frontend and backend applications.

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,  // This allows cookies to be sent with requests 
  headers: {
    "Content-Type": "application/json", // This sets the default Content-Type header for all requests to "application/json", indicating that the request body will be in JSON format.
  },
});
// axiosinstance is an instance of axios with predefined configuration. It sets the base URL for all requests, allows sending cookies with requests, and sets the content type to JSON.
// Add a request interceptor to include the access token in the Authorization header of each request

export default axiosInstance;