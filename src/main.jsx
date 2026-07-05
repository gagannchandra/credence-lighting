import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

import { HelmetProvider } from "react-helmet-async";

// DISABLE BROWSER SCROLL MEMORY
if ("scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

const rootElement = document.getElementById("root");

const app = (
  <HelmetProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </HelmetProvider>
);

if (rootElement.hasChildNodes()) {
  ReactDOM.hydrateRoot(rootElement, app);
} else {
  ReactDOM.createRoot(rootElement).render(app);
}