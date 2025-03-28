import React, { useState, useEffect } from "react";
import "./ThemeSwitcher.css";

const ThemeSwitcher = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [accent, setAccent] = useState("accent1"); // Default accent color (blue)

    // Apply theme mode and accent color
    useEffect(() => {
        document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
        document.documentElement.setAttribute("data-accent", accent);
        localStorage.setItem("theme", darkMode ? "dark" : "light");
        localStorage.setItem("accent", accent);
    }, [darkMode, accent]);

    // Load saved theme and accent on initial render
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "light";
        const savedAccent = localStorage.getItem("accent") || "accent1";
        setDarkMode(savedTheme === "dark");
        setAccent(savedAccent);
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
                    <button className="theme-btn" style={{ backgroundColor: "#1e90ff" }} onClick={() => setAccent("accent1")}>Ocean</button>
                    <button className="theme-btn" style={{ backgroundColor: "#28a745" }} onClick={() => setAccent("accent3")}>Sage</button>
                    <button className="theme-btn" style={{ backgroundColor: "#dc3545" }} onClick={() => setAccent("accent2")}>Cherry</button>
                    <button className="theme-btn" style={{ backgroundColor: "#6f42c1" }} onClick={() => setAccent("accent5")}>Plum</button>
                    <button className="theme-btn" style={{ backgroundColor: "#fd7e14" }} onClick={() => setAccent("accent4")}>Amber</button>
                </div>
            </div>
        </div>
    );
};

export default ThemeSwitcher;
