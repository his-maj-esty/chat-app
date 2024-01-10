import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import Chat from "../components/Chat";
import "./App.css";

function App() {
  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path=":roomId" element={<Chat />} />
            </Route>
          </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
