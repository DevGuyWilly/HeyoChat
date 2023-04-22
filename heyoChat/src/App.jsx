import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import { SignUp } from "./pages/SignUp";
import { ChatPage } from "./pages/ChatPage";
import PrivateRoute from "./pages/PrivateRoute";
import { useSelector } from "react-redux";
import { NextPage } from "./pages/nextpage";


function App() {


    const isAuth = Boolean(useSelector((state) => state.user?.user));
    console.log(isAuth)
    
    
  return (
    <div className="App">
      
        <Router>
          <Routes>
            <Route path="/" element={<SignUp />} />
            <Route path="/chatPage" element={isAuth ? <ChatPage /> :<Navigate to ="/" /> } />
            <Route path="/nextpage" element={<NextPage />} />
          </Routes>
        </Router>
      
    </div>
  );
}

export default App;
