import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeSwitcher = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="theme-switcher">
            <span>{theme === 'light' ? 'Light Mode' : 'Dark Mode'}</span>
            <button onClick={toggleTheme}>Switch Theme</button>
        </div>
    );
};

export default ThemeSwitcher;
