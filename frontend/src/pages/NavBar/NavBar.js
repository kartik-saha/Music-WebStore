import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css"; // Import styles

const NavBar = () => {
    return (
        <header className="navbar">
            <div className="logo">🎵 MusicWave</div>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/genres">Genres</Link></li>
                    <li><Link to="/charts">Top Charts</Link></li>
                    <li><Link to="/login">Profile</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default NavBar;
