import React from "react";
import "./Footer.css"; // Import Footer styles
import { PROJECT_NAME } from "../../config";  // Correct relative path

const Footer = () => {
    return (
        <footer>
            <p>&copy; 2025 {PROJECT_NAME}. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
