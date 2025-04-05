import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import NavBar from "./pages/NavBar/NavBar";
import Footer from "./pages/Footer/Footer";
import ThemeSwitcher from "./pages/ThemeSwitcher/ThemeSwitcher";
import MediaPlayerModal from "./pages/MediaPlayerModal/MediaPlayerModal";
import { PROJECT_NAME } from "./config";
import LoginModal from "./pages/LoginModal/LoginModal";

// Import pages
import LandingPage from "./pages/LandingPage/LandingPage";
import Settings from "./pages/Settings/Settings";
import UploadSong from "./pages/UploadSong/UploadSong";
import Playlists from "./pages/Playlists/Playlists";

const PageTitleUpdater = () => {
    const location = useLocation();

    useEffect(() => {
        const titles = {
            "/": `Home | ${PROJECT_NAME}`,
            "/settings": `Settings | ${PROJECT_NAME}`,
            "/upload-song": `Upload Song | ${PROJECT_NAME}`,
            "/playlist": `Playlists | ${PROJECT_NAME}`,
        };

        document.title = titles[location.pathname] || PROJECT_NAME;
    }, [location.pathname]);

    return null;
};

function App() {
    const [user, setUser] = useState(null);
    const [isLoginOpen, setIsLoginOpen] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "light";
        const savedAccent = localStorage.getItem("accent") || "accent1";

        document.documentElement.setAttribute("data-theme", savedTheme);
        document.documentElement.setAttribute("data-accent", savedAccent);

        const checkLoginStatus = async () => {
            const token = localStorage.getItem("accessToken"); 
            if (!token) return;

            try {
                const response = await fetch("http://localhost:5000/api/users/me", {
                    method: "GET",
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (response.ok) {
                    const data = await response.json();
                    setUser({ 
                        username: data.username, 
                        email: data.email,  // ✅ Now includes email
                        profilePic: data.profilePic 
                    });
                } else {
                    localStorage.removeItem("accessToken"); 
                }
            } catch (error) {
                console.error("Error verifying token:", error);
                localStorage.removeItem("accessToken");
            }
        };

        checkLoginStatus();
    }, []);

    const handleLoginSuccess = (userData) => {
        setUser(userData);
        setIsLoginOpen(false);
    };

    const handleLogout = async () => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            try {
                await fetch("http://localhost:5000/api/auth/logout", {
                    method: "POST",
                    headers: { Authorization: `Bearer ${token}` },
                });
            } catch (error) {
                console.error("Logout error:", error);
            }
        }
        
        localStorage.removeItem("accessToken");
        setUser(null);
    };

    return (
        <>
            <ThemeSwitcher />
            <NavBar user={user} onLogout={handleLogout} /> {/* ✅ Passing email to NavBar */}

            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/upload-song" element={<UploadSong />} />
                <Route path="/playlist" element={<Playlists />} />
            </Routes>
            <Footer />
            <MediaPlayerModal />

            <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} onLoginSuccess={handleLoginSuccess} />
        </>
    );
}

export default function AppWithRouter() {
    return (
        <Router>
            <PageTitleUpdater />
            <App />
        </Router>
    );
}