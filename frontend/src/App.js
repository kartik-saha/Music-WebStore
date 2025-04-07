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

        checkLoginStatus();
    }, []);

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
                    email: data.email,
                    profilePic: data.profilePic,
                });
            } else {
                console.warn("Access token might be expired. Attempting to refresh...");
                await tryRefreshToken();
            }
        } catch (error) {
            console.error("Error verifying token:", error);
            await tryRefreshToken();
        }
    };

    const tryRefreshToken = async () => {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
            handleLogout();
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/auth/refresh-token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ refreshToken }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("accessToken", data.accessToken);
                localStorage.setItem("refreshToken", data.refreshToken);
                await checkLoginStatus(); // Try again with new access token
            } else {
                console.error("Refresh token invalid or expired. Logging out.");
                handleLogout();
            }
        } catch (error) {
            console.error("Refresh token error:", error);
            handleLogout();
        }
    };

    const handleLoginSuccess = (userData) => {
        setUser(userData);
        setIsLoginOpen(false);
        localStorage.setItem("accessToken", userData.accessToken);
        localStorage.setItem("refreshToken", userData.refreshToken);
    };

    const handleLogout = async () => {
        const token = localStorage.getItem("accessToken");

        try {
            if (token) {
                await fetch("http://localhost:5000/api/auth/logout", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ userId: user?._id }), // optional
                });
            }
        } catch (error) {
            console.error("Logout error:", error);
        }

        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setUser(null);
    };

    return (
        <>
            <ThemeSwitcher />
            <NavBar user={user} onLogout={handleLogout} />

            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/upload-song" element={<UploadSong />} />
                <Route path="/playlist" element={<Playlists />} />
            </Routes>
            <Footer />
            <MediaPlayerModal />
            <LoginModal
                isOpen={isLoginOpen}
                onClose={() => setIsLoginOpen(false)}
                onLoginSuccess={handleLoginSuccess}
            />
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

