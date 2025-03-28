import React, { useState } from "react";
import "./NavBar.css";
import { PROJECT_NAME } from "../../config";
import LoginModal from "../../pages/LoginModal/LoginModal"; // Import the modal
import { useNavigate } from "react-router-dom"; // For navigation

const NavBar = () => {
    const [isLoginOpen, setIsLoginOpen] = useState(false); // State to control modal
    const navigate = useNavigate(); // Navigation hook

    return (
        <>
            <header className="navbar">
                <div className="logo">🎵 {PROJECT_NAME}</div>
                <nav>
                    <ul>
                        <li><button onClick={() => navigate("/")}>Home</button></li>
                        <li><button onClick={() => navigate("/genres")}>Genres</button></li>
                        <li><button onClick={() => navigate("/charts")}>Top Charts</button></li>
                        <li><button onClick={() => setIsLoginOpen(true)}>Login</button></li>
                        <li><button className="settings-btn" onClick={() => navigate("/settings")}>⚙️ Settings</button></li>
                    </ul>
                </nav>
            </header>

            {/* Login Modal Component */}
            <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
        </>
    );
};

export default NavBar;
