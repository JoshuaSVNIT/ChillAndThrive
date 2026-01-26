import axios from 'axios';

const BASE_URL = 'https://chillandthrive.onrender.com/'; // Replace with your actual Render backend URL

// 1. PUBLIC INSTANCE (Default Export)
// Usage: import api from '../../api/axios';
export default axios.create({
    baseURL: BASE_URL,
    withCredentials: true 
});

// 2. PRIVATE INSTANCE (Named Export)
// Usage: import { axiosPrivate } from '../../api/axios';
export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});

// 3. INTERCEPTORS (Attach to axiosPrivate only)
axiosPrivate.interceptors.response.use(
    response => response, // If request is good, just return it
    async (error) => {
        const prevRequest = error.config;
        
        // If error is 403 (Forbidden) AND we haven't tried refreshing yet
        if (error.response?.status === 403 && !prevRequest?.sent) {
            prevRequest.sent = true; // Mark as "retried" to avoid infinite loops

            try {
                // Get new access token
                // NOTE: We use the *public* instance (default export) to refresh
                // because the private one might be stuck in a loop if we aren't careful.
                // But using 'axios' directly here is also fine if imported from 'axios' package.
                const response = await axios.get(`${BASE_URL}/refresh`, { 
                    withCredentials: true 
                });
                
                const newAccessToken = response.data.accessToken;

                // Attach new token to the FAILED request
                prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                
                // Retry the request automatically
                return axiosPrivate(prevRequest);
            } catch (refreshErr) {
                // If refresh fails, session is truly dead.
                return Promise.reject(refreshErr);
            }
        }
        return Promise.reject(error);
    }
);