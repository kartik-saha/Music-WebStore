import React, { useState, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { FaGoogle, FaTwitter, FaFacebook } from "react-icons/fa"; // Import icons
import "./LoginModal.css";

const SITE_KEY = "6LcfXQIrAAAAAA68SEFqOqX6naSN8RgBm36qf5Du"; // Replace with your actual reCAPTCHA site key

const LoginModal = ({ isOpen, onClose }) => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [captchaValue, setCaptchaValue] = useState(null);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    if (!isOpen) return null;

    const handleOverlayClick = (e) => {
        if (e.target.classList.contains("modal-overlay")) {
            onClose();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!captchaValue) {
            alert("Please complete the CAPTCHA.");
            return;
        }

        console.log("Form submitted with CAPTCHA:", captchaValue);
    };

    // Placeholder functions for OAuth login
    const handleOAuthLogin = (provider) => {
        console.log(`${isRegistering ? "Registering" : "Logging in"} with ${provider}`);
        // Add real OAuth login logic here
    };

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-content">
                <h2>{isRegistering ? "Register" : "Login"}</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Username" required />
                    <input type="email" placeholder="Email" required />
                    <input type="password" placeholder="Password" required />
                    {isRegistering && <input type="password" placeholder="Confirm Password" required />}

                    {/* Social Login Section */}
                    <div className="social-login">
                        <span>{isRegistering ? "Or Register With" : "Or Login With"}</span>
                        <div className="social-icons">
                            <FaGoogle className="social-icon" on5Click={() => handleOAuthLogin("Google")} />
                            <FaTwitter className="social-icon" onClick={() => handleOAuthLogin("Twitter")} />
                            <FaFacebook className="social-icon" onClick={() => handleOAuthLogin("Facebook")} />
                        </div>
                    </div>

                    {/* reCAPTCHA */}
                    <div className="captcha-container">
                        <ReCAPTCHA sitekey={SITE_KEY} onChange={(value) => setCaptchaValue(value)} />
                    </div>

                    <button type="submit">{isRegistering ? "Register" : "Login"}</button>
                </form>

                <button onClick={() => setIsRegistering(!isRegistering)}>
                    {isRegistering ? "Already have an account? Login here" : "Don't have an account yet? Register here"}
                </button>
            </div>
        </div>
    );
};

export default LoginModal;
