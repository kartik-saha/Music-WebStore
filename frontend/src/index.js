

import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <Auth0Provider
    domain="dev-dpngzka6og8x8sba.us.auth0.com"
    clientId="e42OhhbD0HmEG863T7Oxw3fh3ESF96dC"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
  <App/>
  </Auth0Provider>
);
