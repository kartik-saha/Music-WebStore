import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./pages/NavBar/NavBar";
import Footer from "./pages/Footer/Footer";
import ThemeSwitcher from "./pages/ThemeSwitcher/ThemeSwitcher";

// Lazy load LandingPage for performance optimization
const LandingPage = lazy(() => import("./pages/LandingPage/LandingPage"));

function App() {
    return (
        <>
            <ThemeSwitcher /> {/* Theme toggle always accessible */}

            <Router>
                <NavBar /> {/* Navbar always visible */}

                <Suspense fallback={<div className="loader">Loading...</div>}>
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        {/* Add more routes as needed */}
                    </Routes>
                </Suspense>

                <Footer /> {/* Footer at the bottom */}
            </Router>
        </>
    );
}

export default App;
