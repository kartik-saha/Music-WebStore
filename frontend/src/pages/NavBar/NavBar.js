import React, { useState, useEffect, useRef } from "react";
import "./NavBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUser, faUpload, faSearch, faList } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import LoginModal from "../../pages/LoginModal/LoginModal";
import { PROJECT_NAME } from "../../config";
import AccountModal from "../../pages/AccountModal/AccountModal";

const NavBar = () => {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [username, setUsername] = useState(null);
    const [profilePic, setProfilePic] = useState(null);
    const [showAccountModal, setShowAccountModal] = useState(false);
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");

    const accountRef = useRef(null);
    const modalRef = useRef(null);
    let hideTimeout = useRef(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            fetchUserData(token);
        }
    }, []);

    const fetchUserData = async (token) => {
        try {
            const response = await fetch("http://localhost:5000/api/auth/user", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setUsername(data.username);
                setProfilePic(data.profilePic);
            } else {
                console.error("Failed to fetch user data");
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    };

    const generateProfileImage = () => {
        if (profilePic) {
            return <img src={profilePic} alt="Profile" className="profile-img" />;
        }
        if (username) {
            return <div className="profile-placeholder">{username.charAt(0).toUpperCase()}</div>;
        }
        return <FontAwesomeIcon icon={faUser} />;
    };

    const handleLoginSuccess = (userData) => {
        setUsername(userData.username);
        setProfilePic(userData.profilePic || null);
        localStorage.setItem("token", userData.token);
        setIsLoginOpen(false);
    };

    const handleLogout = () => {
        setUsername(null);
        setProfilePic(null);
        localStorage.removeItem("token");
        navigate("/");
    };

    const handleMouseEnter = () => {
        clearTimeout(hideTimeout.current);
        setShowAccountModal(true);
    };

    const handleMouseLeave = () => {
        hideTimeout.current = setTimeout(() => {
            setShowAccountModal(false);
        }, 200);
    };

    return (
        <>
            <header className="navbar">
                <div className="logo">{PROJECT_NAME}</div>

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
                            </>
                        )}
                        <li
                            className="profile-button"
                            ref={accountRef}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <button onClick={() => !username && setIsLoginOpen(true)}>
                                {generateProfileImage()}
                            </button>
                            {username && (
                                <AccountModal
                                    username={username}
                                    profilePic={profilePic}
                                    onLogout={handleLogout}
                                    show={showAccountModal}
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                    modalRef={modalRef}
                                />
                            )}
                        </li>
                    </ul>
                </nav>
            </header>

            {isLoginOpen && (
                <LoginModal
                    isOpen={isLoginOpen}
                    onClose={() => setIsLoginOpen(false)}
                    onLoginSuccess={handleLoginSuccess}
                />
            )}
        </>
    );
};

export default NavBar;