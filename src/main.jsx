import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

import { HelmetProvider } from "react-helmet-async";
import ErrorBoundary from "./components/ui/ErrorBoundary";

// DISABLE BROWSER SCROLL MEMORY
if ("scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

const rootElement = document.getElementById("root");

const app = (
  <HelmetProvider>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </HelmetProvider>
);

// Puppeteer prerendering produces HTML that won't match the client React tree
// (framer-motion, dynamic state, lazy components). hydrateRoot with mismatches
// is slower than createRoot because it compares then re-renders anyway.
ReactDOM.createRoot(rootElement).render(app);