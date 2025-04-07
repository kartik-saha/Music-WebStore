import React, { useState, useEffect } from "react";
import "./ThemeSwitcher.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

const ThemeSwitcher = () => {
    const [darkMode, setDarkMode] = useState(true);
    const [accent, setAccent] = useState("accent2"); // Default accent color (blue)
    const [menuOpen, setMenuOpen] = useState(false);

    // Load saved theme and accent on initial render
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "light";
        const savedAccent = localStorage.getItem("accent") || "accent1";

        // If no saved theme, default to light theme
        setDarkMode(savedTheme === "dark");
        setAccent(savedAccent);

        // Apply the theme and accent globally
        document.documentElement.setAttribute("data-theme", savedTheme);
        document.documentElement.setAttribute("data-accent", savedAccent);
    }, []); // This effect runs once when the component is mounted

    // Apply theme mode and accent color whenever they change
    useEffect(() => {
        // Apply the theme mode and accent to document element
        document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
        document.documentElement.setAttribute("data-accent", accent);

        // Save the theme and accent to localStorage
        localStorage.setItem("theme", darkMode ? "dark" : "light");
        localStorage.setItem("accent", accent);
    }, [darkMode, accent]); // This effect runs when either darkMode or accent changes

    return (
        <div 
            className={`theme-container ${menuOpen ? "open" : ""}`} 
            onMouseEnter={() => setMenuOpen(true)} 
            onMouseLeave={() => setMenuOpen(false)}
        >
            {/* Morphing Button */}
            <div className="toggle-btn" aria-label="Toggle Theme">                
                <span className="icon">
                    {!menuOpen && <FontAwesomeIcon icon={darkMode ? faMoon : faSun} />}
                </span>
            </div>

            {/* Expanding Menu */}
            <div className="theme-content">
                {/* Light/Dark Mode Toggle */}
                <label className="switch" aria-label="Toggle dark mode">
                    <input 
                        type="checkbox" 
                        checked={darkMode} 
                        onChange={() => setDarkMode(!darkMode)} 
                    />
                    <span className="slider"></span>
                </label>

                {/* Theme Color Options */}
                <div className="theme-options">
                    <button 
                        className="theme-btn" 
                        style={{ backgroundColor: "#1e90ff" }} 
                        onClick={() => setAccent("accent1")}
                        aria-label="Set Ocean Accent"
                    >
                        Ocean
                    </button>
                    <button 
                        className="theme-btn" 
                        style={{ backgroundColor: "#28a745" }} 
                        onClick={() => setAccent("accent3")}
                        aria-label="Set Sage Accent"
                    >
                        Sage
                    </button>
                    <button 
                        className="theme-btn" 
                        style={{ backgroundColor: "#dc3545" }} 
                        onClick={() => setAccent("accent2")}
                        aria-label="Set Cherry Accent"
                    >
                        Cherry
                    </button>
                    <button 
                        className="theme-btn" 
                        style={{ backgroundColor: "#6f42c1" }} 
                        onClick={() => setAccent("accent5")}
                        aria-label="Set Plum Accent"
                    >
                        Plum
                    </button>
                    <button 
                        className="theme-btn" 
                        style={{ backgroundColor: "#fd7e14" }} 
                        onClick={() => setAccent("accent4")}
                        aria-label="Set Amber Accent"
                    >
                        Amber
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ThemeSwitcher;
