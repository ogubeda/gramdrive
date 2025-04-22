import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./pages/App";

import "./styles/globals.css";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
