import { useEffect } from "react";
import { axiosPrivate } from "../api/axios";
import { useAuth } from "../context/AuthContext";

const useAxiosPrivate = () => {
    const { auth } = useAuth();

    useEffect(() => {
        // 1. Request Interceptor: Attaches the Token
        const requestIntercept = axiosPrivate.interceptors.request.use(
            (config) => {
                // If header is missing, add it
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth.accessToken}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        // Cleanup: Remove interceptor when component unmounts
        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
        }
    }, [auth]); // Re-run if auth state changes

    return axiosPrivate;
}

export default useAxiosPrivate;