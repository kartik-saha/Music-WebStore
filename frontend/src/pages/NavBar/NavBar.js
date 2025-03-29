import React, { useState, useEffect } from "react";
import "./NavBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUser, faCog, faUpload } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import LoginModal from "../../pages/LoginModal/LoginModal";
import { PROJECT_NAME } from "../../config";

const NavBar = () => {
    const [isLoginOpen, setIsLoginOpen] = useState(false); // State to control modal
    const navigate = useNavigate(); // Navigation hook
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    const [accent, setAccent] = useState(localStorage.getItem("accent") || "accent1");

    // Update theme dynamically
    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        document.documentElement.setAttribute("data-accent", accent);
    }, [theme, accent]);

    return (
        <>
            <header className="navbar">
                <div className="logo">{PROJECT_NAME}</div>
                <nav>
                    <ul>
                        {/* Home Button (Navigates to UploadPage) */}
                        <li><button onClick={() => navigate("/upload-song")}>
                            <FontAwesomeIcon icon={faUpload} />
                        </button></li>

                        {/* Home Button (Navigates to LandingPage) */}
                        <li><button onClick={() => navigate("/")}>
                            <FontAwesomeIcon icon={faHome} />
                        </button></li>
                        
                        {/* Settings Button (Navigates to Settings Page) */}
                        <li><button onClick={() => navigate("/settings")}>
                            <FontAwesomeIcon icon={faCog} />
                        </button></li>

                        {/* Login Button (Opens LoginModal) */}
                        <li><button onClick={() => setIsLoginOpen(true)}>
                            <FontAwesomeIcon icon={faUser} />
                        </button></li>                        
                    </ul>
                </nav>
            </header>

            {/* Login Modal Component */}
            <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
        </>
    );
};

export default NavBar;
