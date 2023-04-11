import axios from "axios";
import { useEffect } from "react";
export const ChatPage = () => {
  const logOut = () => {
    window.open("http://localhost:8000/auth/logout", "_self");
  };

  useEffect(() => {
    console.log("hello")
    const getUser = async () => {
      const response = await axios.get(
        "http://localhost:8000/auth/login/sucess"
      );
      console.log(response);
      
    };
    getUser()
  }, []);


  return (
    <div>
      <h1 className="chat">This is ChatPage</h1>
      <button onClick={logOut}>LogOut</button>
    </div>
  );
};
