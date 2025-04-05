import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import NavBar from "./pages/NavBar/NavBar";
import Footer from "./pages/Footer/Footer";
import ThemeSwitcher from "./pages/ThemeSwitcher/ThemeSwitcher";
import MediaPlayerModal from "./pages/MediaPlayerModal/MediaPlayerModal"; 
import { PROJECT_NAME } from "./config";
import PageNotFound from "./PageNotFound";
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
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "light";
        const savedAccent = localStorage.getItem("accent") || "accent1";

        document.documentElement.setAttribute("data-theme", savedTheme);
        document.documentElement.setAttribute("data-accent", savedAccent);
    }, []);

    return (
        <>
            <ThemeSwitcher />
            <NavBar />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/upload-song" element={<UploadSong />} />
                <Route path="/playlist" element={<Playlists />} />
                <Route path="*" element={<PageNotFound />} /> {/* Catch-all route for 404 */}
            </Routes>
            <Footer />
            <MediaPlayerModal />
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