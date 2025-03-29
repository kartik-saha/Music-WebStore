import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AppWithRouter from "./App"; // ✅ Use new wrapper function
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppWithRouter /> {/* ✅ Ensures Router is always wrapped */}
  </React.StrictMode>
);

reportWebVitals();
