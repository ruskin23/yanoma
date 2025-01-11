import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    console.log('initiated')
    const [ isLoggedIn, setIsLoggedIn ] = useState(
        () => localStorage.getItem("isLoggedIn") === 'true'
    );
    const [ accessToken, setAccessToken ] = useState(null);
    
    useEffect(() => {
        localStorage.setItem("isLoggedIn", isLoggedIn);
    }, [isLoggedIn])

    const login = (token) => {
        setIsLoggedIn(true)
        setAccessToken(token)
        console.log("token recieved in login function", token)
        console.log("access token after set token", accessToken)
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