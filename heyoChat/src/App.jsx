import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { ChatPage } from "./pages/ChatPage";
import { useSelector } from "react-redux";
import { NextPage } from "./pages/Nextpage";


function App() {
  // const isAuth = Boolean(useSelector((state) => state.user?.user));
  const isAuth = true;
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route
            path="/chatPage"
            element={ <ChatPage /> }
          />
          <Route path="/nextpage" element={<NextPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
