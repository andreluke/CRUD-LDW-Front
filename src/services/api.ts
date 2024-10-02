import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3040', // Base URL for your API
    headers: {
        'Content-Type': 'application/json',
    },
});

// Optional: Set up an interceptor for requests or responses if needed
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle errors globally here if necessary
        return Promise.reject(error);
    }
);

export default api;
