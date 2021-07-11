import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Auth0ProviderWithHistory from "./auth/auth0-provider-with-history";
import { BrowserRouter as Router } from "react-router-dom";
import splitbee from "@splitbee/web";
import { CookiesProvider } from "react-cookie";

splitbee.init();

ReactDOM.render(
  <Router>
    <Auth0ProviderWithHistory>
      <CookiesProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </CookiesProvider>
    </Auth0ProviderWithHistory>
  </Router>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
