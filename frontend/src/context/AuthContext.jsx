import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        
        const checkLoggedIn = async () => {
            try {
              
                axios.defaults.withCredentials = true;
                const response = await axios.get('http://localhost:5000/api/users/profile');
                setUser(response.data);
            } catch (err) {
              
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkLoggedIn();
    }, []);

   const login = (userData) => {
        setUser(userData);
    }; 

    const logout = async () => {
        try {
            await axios.post('http://localhost:5000/api/users/logout');
            setUser(null);
        } catch (err) {
            console.error("Logout failed", err);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
