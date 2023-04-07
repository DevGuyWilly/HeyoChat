import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import "./App.css";
import { SignUp } from "./pages/SignUp";
import { ChatPage } from "./pages/ChatPage";
import axios from "axios";

function App() {
  useEffect(() => {
    // axios.get();
  }, []);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/chatPage" element={<ChatPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
