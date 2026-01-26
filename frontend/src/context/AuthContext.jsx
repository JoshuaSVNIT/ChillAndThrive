// import { createContext, useState, useEffect, useContext } from 'react';
// import api from '../api/axios';
// import { jwtDecode } from "jwt-decode"; // Decode the token Joshua sends


// const AuthContext = createContext({});

// export const AuthProvider = ({ children }) => {
//     const [auth, setAuth] = useState({
//         user: null,
//         roles: [],
//         accessToken: null,
//         isLoggedIn: false
//     });
//     const [loading, setLoading] = useState(true);

//     // Replace the base URL in your API instance with the Render backend URL
//     api.defaults.baseURL = 'https://chillandthrive.onrender.com/'; // Replace with your actual Render backend URL

//     // 1. LOGIN FUNCTION
//     const login = async (email, password) => {
//         // Send credentials to Joshua's backend
//         const response = await api.post('/auth', { email, password }); // Use updated baseURL

//         // Joshua sends { accessToken: "..." }
//         const { accessToken } = response.data;

//         // We decode it to get the data he hid inside
//         const decoded = jwtDecode(accessToken);

//         // Extract user info from the token payload
//         const userDetails = {
//             firstname: decoded.UserInfo.firstname,
//             email: decoded.UserInfo.email,
//             // NOTE: These will be undefined until Joshua updates the backend (see Step 3)
//             lastname: decoded.UserInfo.lastname,
//             phoneNumber: decoded.UserInfo.phoneNumber,
//             id: decoded.UserInfo.id
//         };

//         const roles = decoded.UserInfo.roles || [];

//         // Update global state so the whole app knows we are logged in
//         setAuth({
//             user: userDetails,
//             roles: roles,
//             accessToken: accessToken,
//             isLoggedIn: true
//         });

//         // Return user object so Login.jsx can check for Admin status immediately
//         return { ...userDetails, roles };
//     };

//     // 2. LOGOUT FUNCTION
//     const logout = async () => {
//         setAuth({ user: null, roles: [], accessToken: null, isLoggedIn: false });
//         try {
//             await api.post('/logout', {}, { withCredentials: true }); // Use updated baseURL
//         } catch (err) {
//             console.error("Logout failed", err);
//         }
//     };

//     // 3. REFRESH ON LOAD (Keeps user logged in on refresh)
//     useEffect(() => {
//         const persistLogin = async () => {
//             try {
//                 // Ask for a new token using the cookie
//                 const response = await api.get('/refresh'); // Use updated baseURL
//                 const { accessToken } = response.data;
//                 const decoded = jwtDecode(accessToken);

//                 setAuth({
//                     user: {
//                         firstname: decoded.UserInfo.firstname,
//                         email: decoded.UserInfo.email,
//                         lastname: decoded.UserInfo.lastname,
//                         phoneNumber: decoded.UserInfo.phoneNumber,
//                         id: decoded.UserInfo.id
//                     },
//                     roles: decoded.UserInfo.roles,
//                     accessToken: accessToken,
//                     isLoggedIn: true
//                 });
//             } catch (err) {
//                 console.log("No persistent session found. Error: ", err);
//                 // Not logged in or session expired
//                 setAuth({ user: null, roles: [], accessToken: null, isLoggedIn: false });
//             } finally {
//                 setLoading(false);
//             }
//         };

//         persistLogin();
//     }, []); // Empty dependency array = Run once on mount




//     return (
//         <AuthContext.Provider value={{ auth, login, logout, loading }}>
//             {!loading && children}
//         </AuthContext.Provider>
//     );
// };

// export const useAuth = () => useContext(AuthContext);

import { createContext, useState, useEffect, useContext } from 'react';
import api from '../api/axios';
import { jwtDecode } from "jwt-decode"; 

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        user: null,
        roles: [],
        accessToken: null,
        isLoggedIn: false
    });
    const [loading, setLoading] = useState(true);

    // ❌ DELETED LINE: api.defaults.baseURL = ... 
    // We trust axios.js to handle the URL!

    // 1. LOGIN FUNCTION
    const login = async (email, password) => {
        const response = await api.post('/auth', { email, password }); 
        const { accessToken } = response.data;
        const decoded = jwtDecode(accessToken);

        const userDetails = {
            firstname: decoded.UserInfo.firstname,
            email: decoded.UserInfo.email,
            lastname: decoded.UserInfo.lastname,
            phoneNumber: decoded.UserInfo.phoneNumber,
            id: decoded.UserInfo.id
        };

        const roles = decoded.UserInfo.roles || [];

        setAuth({
            user: userDetails,
            roles: roles,
            accessToken: accessToken,
            isLoggedIn: true
        });

        return { ...userDetails, roles };
    };

    // 2. LOGOUT FUNCTION
    const logout = async () => {
        setAuth({ user: null, roles: [], accessToken: null, isLoggedIn: false });
        try {
            await api.post('/logout', {}, { withCredentials: true });
        } catch (err) {
            console.error("Logout failed", err);
        }
    };

    // 3. REFRESH ON LOAD 
    useEffect(() => {
        const persistLogin = async () => {
            try {
                const response = await api.get('/refresh');
                const { accessToken } = response.data;
                const decoded = jwtDecode(accessToken);

                setAuth({
                    user: {
                        firstname: decoded.UserInfo.firstname,
                        email: decoded.UserInfo.email,
                        lastname: decoded.UserInfo.lastname,
                        phoneNumber: decoded.UserInfo.phoneNumber,
                        id: decoded.UserInfo.id
                    },
                    roles: decoded.UserInfo.roles,
                    accessToken: accessToken,
                    isLoggedIn: true
                });
            } catch (err) {
                console.log("No persistent session found.");
                setAuth({ user: null, roles: [], accessToken: null, isLoggedIn: false });
            } finally {
                setLoading(false);
            }
        };

        persistLogin();
    }, []); 

    return (
        <AuthContext.Provider value={{ auth, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);