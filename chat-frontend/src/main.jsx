import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ThemeProvider } from "../shad/components/theme-provider";
import "./index.css";
import { RecoilRoot } from "recoil";
import { ModeToggle } from "../shad/components/darkmode-toggle";

ReactDOM.createRoot(document.getElementById("root")).render(
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RecoilRoot>
          <App />
      </RecoilRoot>
    </ThemeProvider>
);
