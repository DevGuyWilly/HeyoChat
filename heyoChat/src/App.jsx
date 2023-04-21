import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { SignUp } from "./pages/SignUp";
import { ChatPage } from "./pages/ChatPage";
import PrivateRoute from "./pages/PrivateRoute";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route element={<PrivateRoute />}>
            <Route path="/chatPage" element={<ChatPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
