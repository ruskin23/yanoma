import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAccessToken } from '../api/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [ isLoggedIn, setIsLoggedIn ] = useState(
        () => localStorage.getItem("isLoggedIn") === 'true'
    );
    const [ accessToken, setAccessToken ] = useState(null);
    
    useEffect(() => {
        localStorage.setItem("isLoggedIn", isLoggedIn);
    }, [isLoggedIn])

    useEffect(() => {
        if (isLoggedIn) {
            const refreshToken = async () => {
                try {
                    const newToken = await getAccessToken();
                    setAccessToken(newToken);
                    // console.log("Got New Access Token: ", newToken)
                } catch (err) {
                    // If refresh fails, maybe log them out
                    // setIsLoggedIn(false);
                    console.log("Error fetching new token: ", err)
                }
            };
            refreshToken();
        }
    }, []);

    const login = (token) => {
        setIsLoggedIn(true)
        setAccessToken(token)
        // console.log("token recieved in login function", token)
        // console.log("access token after set token", accessToken)
    };
    const logout = () => {
        setIsLoggedIn(false)
        setAccessToken(null)
    };

    return (
        <AuthContext.Provider value={{ 
            isLoggedIn, 
            login, 
            logout,
            accessToken,
            setAccessToken 
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);