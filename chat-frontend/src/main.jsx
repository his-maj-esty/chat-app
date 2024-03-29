import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ThemeProvider } from "../shad/components/theme-provider";
import "./index.css";
import { RecoilRoot } from "recoil";
import NavBar from "../components/NavBar";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <RecoilRoot>
      <div className="relative">
        <NavBar />
        <App />
      </div>
    </RecoilRoot>
  </ThemeProvider>
);
