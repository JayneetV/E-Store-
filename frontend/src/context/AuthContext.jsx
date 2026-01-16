import { createContext, useState, useContext, useEffect } from 'react';
import api, { ACCESS_TOKEN, REFRESH_TOKEN } from '../api';
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            try {
                setUser(jwtDecode(token));
            } catch (e) {
                // Token invalid
                localStorage.removeItem(ACCESS_TOKEN);
                localStorage.removeItem(REFRESH_TOKEN);
            }
        }
    }, [])

    const loginUser = async (username, password) => {
        try {
            const response = await api.post('token/', { username, password });

            localStorage.setItem(ACCESS_TOKEN, response.data.access);
            localStorage.setItem(REFRESH_TOKEN, response.data.refresh);

            setUser(jwtDecode(response.data.access));
            return true;
        } catch (error) {
            console.error("Login failed", error);
            return false;
        }
    };

    const registerUser = async (username, email, password) => {
        try {
            await api.post('accounts/register/', { username, email, password });
            return true;
        } catch (error) {
            console.error("Registration failed", error);
            return false;
        }
    };

    const logoutUser = () => {
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loginUser, logoutUser, registerUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);