import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./pages/NavBar/NavBar"; // Import NavBar component
import LandingPage from "./pages/LandingPage/LandingPage"; // Import LandingPage component

function App() {
    return (
        <Router>
            <NavBar /> {/* Display NavBar on all pages */}
            <Routes>
                <Route path="/" element={<LandingPage />} />
                {/* Add more routes here as you expand your app */}
            </Routes>
        </Router>
    );
}

export default App;
