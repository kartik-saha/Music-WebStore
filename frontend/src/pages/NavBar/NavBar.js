import React, { useState } from "react";
import "./NavBar.css";
import { PROJECT_NAME } from "../../config";
import LoginModal from "../../pages/LoginModal/LoginModal"; // Import the modal

const NavBar = () => {
    const [isLoginOpen, setIsLoginOpen] = useState(false); // State to control modal

    return (
        <>
            <header className="navbar">
                <div className="logo">🎵 {PROJECT_NAME}</div>
                <nav>
                    <ul>
                        <li><button onClick={() => window.location.href = "/"}>Home</button></li>
                        <li><button onClick={() => window.location.href = "/genres"}>Genres</button></li>
                        <li><button onClick={() => window.location.href = "/charts"}>Top Charts</button></li>
                        <li><button onClick={() => setIsLoginOpen(true)}>Login</button></li>
                    </ul>
                </nav>
            </header>

            {/* Login Modal Component */}
            <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
        </>
    );
};

export default NavBar;
