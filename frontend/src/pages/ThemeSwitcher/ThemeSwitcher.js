import React, { useState, useEffect } from "react";
import "./ThemeSwitcher.css";

const ThemeSwitcher = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [accentColor, setAccentColor] = useState("#007bff"); // Default accent color

    // Apply theme mode and accent color
    useEffect(() => {
        document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
        localStorage.setItem("theme", darkMode ? "dark" : "light");
        document.documentElement.style.setProperty("--accent-color", accentColor);
    }, [darkMode, accentColor]);

    // Load saved theme on initial render
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "light";
        setDarkMode(savedTheme === "dark");
    }, []);

    return (
        <div 
            className={`theme-container ${menuOpen ? "open" : ""}`} 
            onMouseEnter={() => setMenuOpen(true)} 
            onMouseLeave={() => setMenuOpen(false)}
        >
            {/* Morphing Button */}
            <div className="toggle-btn">
                {!menuOpen && <span className="icon">{darkMode ? "🌙" : "☀️"}</span>}
            </div>

            {/* Expanding Menu */}
            <div className="theme-content">
                {/* Light/Dark Mode Toggle */}
                <label className="switch">
                    <input 
                        type="checkbox" 
                        checked={darkMode} 
                        onChange={() => setDarkMode(!darkMode)} 
                    />
                    <span className="slider"></span>
                </label>

                {/* Theme Color Options */}
                <div className="theme-options">
                    <button className="theme-btn theme-blue" onClick={() => setAccentColor("#007bff")}>Blue</button>
                    <button className="theme-btn theme-green" onClick={() => setAccentColor("#28a745")}>Green</button>
                    <button className="theme-btn theme-red" onClick={() => setAccentColor("#dc3545")}>Red</button>
                    <button className="theme-btn theme-purple" onClick={() => setAccentColor("#6f42c1")}>Purple</button>
                    <button className="theme-btn theme-orange" onClick={() => setAccentColor("#fd7e14")}>Orange</button>
                    <button className="theme-btn theme-pink" onClick={() => setAccentColor("#e83e8c")}>Pink</button>
                </div>
            </div>
        </div>
    );
};

export default ThemeSwitcher;
