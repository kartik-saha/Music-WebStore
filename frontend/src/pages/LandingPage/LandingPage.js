import React from "react";
import "./LandingPage.css";
import Footer from "../Footer/Footer"; // Import Footer

const LandingPage = () => {
    return (
        <div>
            <section className="hero">
                <div className="hero-content">
                    <h1>Welcome to MusicApp</h1>
                    <p>Discover and explore your favorite music.</p>
                    <a href="#" className="cta-button">Get Started</a>
                </div>
            </section>
            <Footer /> {/* Add Footer component */}
        </div>
    );
};

export default LandingPage;
