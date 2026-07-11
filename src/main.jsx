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

// Since we are using Puppeteer to prerender the fully-loaded client app for SEO,
// hydration will always fail (Error #418). We just use createRoot to take over.
ReactDOM.createRoot(rootElement).render(app);