import React from "react";
import "./LandingPage.css";
import Footer from "../Footer/Footer"; // Import Footer
import { PROJECT_NAME } from "../../config";  // Correct relative path

const LandingPage = () => {
    return (
        <div>
            <section className="hero">
                <div className="hero-content">
                    <h1>Welcome to {PROJECT_NAME}</h1>
                    <p>Discover and explore your favorite music.</p>
                    <a href="#" className="cta-button">Get Started</a>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
