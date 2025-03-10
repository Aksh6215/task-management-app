import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a ThemeContext with default value
const ThemeContext = createContext();

// Custom hook to use theme context
export const useTheme = () => {
    return useContext(ThemeContext);
};

const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        // Apply theme to body when theme changes
        document.body.className = theme;
        localStorage.setItem('theme', theme); // Store theme in localStorage
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
