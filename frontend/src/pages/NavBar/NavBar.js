import React, { useState, useEffect } from "react";
import "./NavBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUser, faCog, faUpload, faSearch, faList } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import LoginModal from "../../pages/LoginModal/LoginModal";
import { PROJECT_NAME } from "../../config";

const NavBar = () => {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [username, setUsername] = useState(null); // Store the username after login
    const [profilePic, setProfilePic] = useState(null); // Store the profile picture
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    };

    // This function generates a placeholder with the first letter of the username
    const generateProfileImage = () => {
        if (profilePic) {
            return <img src={profilePic} alt="Profile" className="profile-img" />;
        }
        if (username) {
            const firstLetter = username.charAt(0).toUpperCase(); // Get first letter of username
            return <div className="profile-placeholder">{firstLetter}</div>;
        }
        return <FontAwesomeIcon icon={faUser} />;
    };

    const handleLoginSuccess = (userData) => {
        setUsername(userData.username); // Set username after successful login
        setProfilePic(userData.profilePic || null); // Set profile picture
        setIsLoginOpen(false); // Close the login modal
    };

    return (
        <>
            <header className="navbar">
                <div className="logo">{PROJECT_NAME}</div>

                {/* Search Bar */}
                <form className="search-bar" onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder="Lookup for your favorite song or artist..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit">
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </form>

                <nav>
                    <ul>
                        <li>
                            <button onClick={() => navigate("/")}>
                                <FontAwesomeIcon icon={faHome} />
                            </button>
                        </li>
                        {/* Show only if user is logged in */}
                        {username && (
                            <>
                                <li>
                                    <button onClick={() => navigate("/upload-song")}>
                                        <FontAwesomeIcon icon={faUpload} />
                                    </button>
                                </li>
                                <li>
                                    <button onClick={() => navigate("/playlist")}>
                                        <FontAwesomeIcon icon={faList} />
                                    </button>
                                </li>
                                <li>
                                    <button onClick={() => navigate("/settings")}>
                                        <FontAwesomeIcon icon={faCog} />
                                    </button>
                                </li>
                            </>
                        )}
                        {/* Account/Profile button */}
                        <li>
                            <button onClick={() => setIsLoginOpen(true)}>
                                {username ? generateProfileImage() : <FontAwesomeIcon icon={faUser} />}
                            </button>
                        </li>
                    </ul>
                </nav>
            </header>

            {/* Login Modal */}
            <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} onLoginSuccess={handleLoginSuccess} />
        </>
    );
};

export default NavBar;
