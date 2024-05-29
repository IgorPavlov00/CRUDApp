// contexts/UserContext.js
import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Retrieve user data from local storage when the component mounts
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const setUserAndStore = (user) => {
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
    };

    const clearUser = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <UserContext.Provider value={{ user, setUser: setUserAndStore, clearUser }}>
            {children}
        </UserContext.Provider>
    );
};
