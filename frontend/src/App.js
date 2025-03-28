import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import NavBar from "./pages/NavBar/NavBar";
import Footer from "./pages/Footer/Footer";
import ThemeSwitcher from "./pages/ThemeSwitcher/ThemeSwitcher";
import { PROJECT_NAME } from "./config"; // Import project name

// Lazy load pages for performance optimization
const LandingPage = lazy(() => import("./pages/LandingPage/LandingPage"));
const Settings = lazy(() => import("./pages/Settings/Settings")); // ✅ New Settings Page

const PageTitleUpdater = () => {
    const location = useLocation();

    useEffect(() => {
        // Set title based on route
        const titles = {
            "/": `Home | ${PROJECT_NAME}`,
            "/about": `About | ${PROJECT_NAME}`,
            "/contact": `Contact | ${PROJECT_NAME}`,
            "/settings": `Settings | ${PROJECT_NAME}` // ✅ Added settings title
        };

        document.title = titles[location.pathname] || PROJECT_NAME;
    }, [location.pathname]);

    return null; // This component does not render anything
};

function App() {
    return (
        <>
            <ThemeSwitcher /> {/* ✅ Theme toggle always accessible */}

            <Router>
                <PageTitleUpdater /> {/* ✅ Dynamically update tab title */}
                <NavBar /> {/* ✅ Navbar always visible */}

                <Suspense fallback={<div className="loader">Loading...</div>}>
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/settings" element={<Settings />} /> {/* ✅ New Settings Route */}
                        {/* Add more routes here as needed */}
                    </Routes>
                </Suspense>

                <Footer /> {/* ✅ Footer at the bottom */}
            </Router>
        </>
    );
}

export default App;
