import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import { SignUp } from "./pages/SignUp";
import { ChatPage } from "./pages/ChatPage";
import PrivateRoute from "./pages/PrivateRoute";
import { useSelector } from "react-redux";


function App() {

    const users = useSelector((state) => state.user);
    console.log(users)
    
    
  return (
    <div className="App">
      
        <Router>
          <Routes>
            <Route path="/" element={<SignUp />} />
            <Route path="/chatPage" element={<ChatPage /> } />
          </Routes>
        </Router>
      
    </div>
  );
}

export default App;
