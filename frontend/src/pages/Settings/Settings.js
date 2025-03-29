import React, { useState } from "react";
import "./Settings.css";

const settingsData = [
    { id: "language-preference", label: "Language", type: "select", options: ["English", "Spanish", "French"] },
    { id: "change-email", label: "Change Email", type: "input-button" },
    { id: "change-password", label: "New Password", type: "input-button" },
    { id: "current-password", label: "Current Password", type: "input-button" },
    { id: "enable-mfa", label: "Enable MFA", type: "button" },
    { id: "delete-account", label: "Delete Account", type: "button" },
    { id: "manage-subscription", label: "Manage Subscription", type: "button" },
    { id: "playback-quality", label: "Playback Quality", type: "select", options: ["Low", "Medium", "High"], default: "Medium" },
    { id: "inactivity-timer", label: "Inactivity Timer", type: "custom-slider" },
    { id: "enable-artist-mode", label: "Enable Artist Mode", type: "custom-slider" },
];

const Settings = () => {
    const [settings, setSettings] = useState({});

    const handleToggle = (id) => {
        setSettings((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const handleSelectChange = (id, value) => {
        setSettings((prev) => ({ ...prev, [id]: value }));
    };

    const handleInputChange = (id, value) => {
        setSettings((prev) => ({ ...prev, [id]: value }));
    };

    return (
        <div className="settings-container">
            <div className="settings-box">
                {settingsData.map((setting) => (
                    <div key={setting.id} className="setting-item">
                        <label className={setting.type === "select" ? "inline-label" : ""}>{setting.label}</label>

                        {setting.type === "select" && (
                            <select
                                value={settings[setting.id] || setting.default || setting.options[0]}
                                onChange={(e) => handleSelectChange(setting.id, e.target.value)}
                                className="select-box"
                            >
                                {setting.options.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        )}

                        {setting.id === "inactivity-timer" && (
                            <div className="number-input-group">
                                <input
                                    type="number"
                                    placeholder="Enter time (mins)"
                                    value={settings[setting.id] || ""}
                                    onChange={(e) => handleInputChange(setting.id, e.target.value)}
                                    className="number-input"
                                    min="1"
                                />
                            </div>
                        )}

                        {setting.type === "custom-slider" && (
                            <label className="custom-slider-label">
                                <input
                                    type="checkbox"
                                    checked={settings[setting.id] || false}
                                    onChange={() => handleToggle(setting.id)}
                                    className="custom-slider"
                                />
                                <span className="custom-slider-track"></span>
                            </label>
                        )}

                        {setting.type === "input-button" && (
                            <div className="input-button-group">
                                <input
                                    type={setting.id === "change-email" ? "text" : "password"} 
                                    placeholder={setting.label}
                                    value={settings[setting.id] || ""}
                                    onChange={(e) => handleInputChange(setting.id, e.target.value)}
                                    className="small-input"
                                />
                                <button className="small-button">→</button>
                            </div>
                        )}

                        {setting.type === "button" && (
                            <button className="small-btn">{setting.label}</button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Settings;
