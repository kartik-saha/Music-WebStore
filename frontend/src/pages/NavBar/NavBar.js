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
    const [user, setUser] = useState(null);
    const [showAccountModal, setShowAccountModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");

    const accountRef = useRef(null);
    const hideTimeout = useRef(null);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            setIsLoading(false);
            return;
        }

        fetchUserData(token);
    }, []);

    const fetchUserData = async (token) => {
        try {
            const response = await fetch("http://localhost:5000/api/users/me", {
                method: "GET",
                headers: { "Authorization": `Bearer ${token}` },
            });

            if (response.ok) {
                const data = await response.json();
                setUser({ 
                    username: data.username, 
                    email: data.email, 
                    profilePic: data.profilePic 
                });

                // Store user data locally
                localStorage.setItem("username", data.username);
                localStorage.setItem("email", data.email);
                localStorage.setItem("profilePic", data.profilePic || "");
            } else {
                autoLogout();
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            autoLogout();
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    };

    const handleLoginSuccess = (userData) => {
        setUser(userData);
        setIsLoginOpen(false);
    };

    const autoLogout = () => {
        if (localStorage.getItem("accessToken")) {
            alert("Session expired. Please log in again.");
        }
        handleLogout();
    };

    const handleLogout = async () => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            try {
                await fetch("http://localhost:5000/api/auth/logout", {
                    method: "POST",
                    headers: { "Authorization": `Bearer ${token}` },
                });
            } catch (error) {
                console.error("Logout error:", error);
            }
        }

        localStorage.removeItem("accessToken");
        localStorage.removeItem("username");
        localStorage.removeItem("email");
        localStorage.removeItem("profilePic");

        setUser(null);
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

    if (isLoading) return null;

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
                        {user && (
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
                            <button onClick={() => !user && setIsLoginOpen(true)}>
                                {user ? (
                                    user.profilePic ? (
                                        <img src={user.profilePic} alt="Profile" className="profile-img" />
                                    ) : (
                                        <div className="profile-placeholder">{user.username.charAt(0).toUpperCase()}</div>
                                    )
                                ) : (
                                    <FontAwesomeIcon icon={faUser} />
                                )}
                            </button>
                            {user && (
                                <AccountModal
                                    username={user.username}
                                    email={user.email}
                                    profilePic={user.profilePic}
                                    onLogout={handleLogout}
                                    show={showAccountModal}
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
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
