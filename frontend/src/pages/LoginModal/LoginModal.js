import React from "react";
import "./LoginModal.css"; // Ensure styles are applied correctly

const LoginModal = ({ isOpen }) => {
    if (!isOpen) return null; // Don't render if modal is closed

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Login</h2>
                <form>
                    <input type="email" placeholder="Email" required />
                    <input type="password" placeholder="Password" required />
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default LoginModal;
