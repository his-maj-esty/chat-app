import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import Chat from "../components/Chat";
import "./App.css";
import React from "react";

function App() {
  return (
    <>
      <React.StrictMode>
        <BrowserRouter>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path=":roomId" element={<Chat />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </React.StrictMode>
    </>
  );
}

export default App;
