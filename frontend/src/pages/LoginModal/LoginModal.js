import React, { useState, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { FaGoogle, FaTwitter, FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import { useAuth0 } from "@auth0/auth0-react";
import "./LoginModal.css";

const SITE_KEY = "6LcfXQIrAAAAAA68SEFqOqX6naSN8RgBm36qf5Du";

const LoginModal = ({ isOpen, onClose }) => {
    const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
    const [isRegistering, setIsRegistering] = useState(false);
    const [captchaValue, setCaptchaValue] = useState(null);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    useEffect(() => {
        if (!onClose) return;

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

    const handleInputChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!captchaValue) {
            alert("Please complete the CAPTCHA.");
            return;
        }

        if (isRegistering && formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        const endpoint = isRegistering
            ? "http://localhost:5000/api/auth/register"
            : "http://localhost:5000/api/auth/login";

        const requestData = isRegistering
            ? { username: formData.username, email: formData.email, password: formData.password }
            : { email: formData.email, password: formData.password };

        try {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestData),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Error response:", errorText);
                alert("Something went wrong: " + errorText);
                return;
            }

            const data = await response.json();
            if (!isRegistering) {
                localStorage.setItem("token", data.token);
                alert("Login successful!");
            } else {
                alert("Registration successful! Please log in.");
                setIsRegistering(false);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Server error. Try again later.");
        }
    };

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>{isRegistering ? "Register" : "Login"}</h2>

                {isAuthenticated ? (
                    <div className="user-profile">
                        <img src={user.picture} alt={user.name} />
                        <h3>{user.name}</h3>
                        <p>{user.email}</p>
                        <button className="logout-btn" onClick={() => logout({ returnTo: window.location.origin })}>
                            Logout
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        {isRegistering && (
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={formData.username}
                                onChange={handleInputChange}
                                required
                            />
                        )}
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                        {isRegistering && (
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                required
                            />
                        )}

                        {/* New Login and Logout Buttons */}
                        {/* <div className="auth-buttons">
                            <button type="button" onClick={() => loginWithRedirect()}>
                                Login 
                            </button>
                            <button type="button" onClick={() => logout({ returnTo: window.location.origin })}>
                                Logout
                            </button>
                        </div> */}

                        {/* Social Login Section */}
                        

                    <div className="social-login">
                        <span>{isRegistering ? "Or Register With" : "Or Login With"}</span>
                        <div className="social-icons">
                            <FaGoogle className="social-icon" onClick={() => loginWithRedirect({ connection: "google-oauth2" })} />
                            <FaTwitter className="social-icon" onClick={() => loginWithRedirect({ connection: "twitter" })} />
                            <FaFacebook className="social-icon" onClick={() => loginWithRedirect({ connection: "facebook" })} />
                            <FaGithub className="social-icon" onClick={() => loginWithRedirect({ connection: "github" })} />
                            <FaLinkedin className="social-icon" onClick={() => loginWithRedirect({ connection: "linkedin" })} />
                        </div>
                </div>

                        {/* reCAPTCHA */}
                        <div className="captcha-container">
                            <ReCAPTCHA sitekey={SITE_KEY} onChange={(value) => setCaptchaValue(value)} />
                        </div>

                        <button type="submit">{isRegistering ? "Register" : "Login"}</button>
                    </form>
                )}

                {!isAuthenticated && (
                    <button type="button" onClick={() => setIsRegistering(!isRegistering)}>
                        {isRegistering ? "Already have an account? Login here" : "Don't have an account yet? Register here"}
                    </button>
                )}
            </div>
        </div>
    );
};

export default LoginModal;

