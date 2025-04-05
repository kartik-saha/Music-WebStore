import React, { useState } from "react";
import "./NavBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUser, faCog, faUpload, faSearch, faList } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import LoginModal from "../../pages/LoginModal/LoginModal"; // ✅ Ensure the path is correct
import { PROJECT_NAME } from "../../config"; // ✅ Ensure `PROJECT_NAME` is correctly imported

const NavBar = () => {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim() === "") return; // ✅ Prevent empty search
        navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    };

    return (
        <>
            <header className="navbar">
            <div className="logo">
                    {PROJECT_NAME}
            </div>


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
                        <li>
                            <button onClick={() => setIsLoginOpen(true)}>
                                <FontAwesomeIcon icon={faUser} />
                            </button>
                        </li>
                    </ul>
                </nav>
            </header>

            {/* Login Modal */}
            {isLoginOpen && <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />}
        </>
    );
};

export default NavBar;
