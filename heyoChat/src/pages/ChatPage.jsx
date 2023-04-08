import axios from "axios";

export const ChatPage = () => {
  const logOut = () => {
    window.open("http://localhost:8000/auth/logout", "_self");
  };
  return (
    <div>
      <h1 className="chat">This is ChatPage</h1>
      <button onClick={logOut}>LogOut</button>
    </div>
  );
};
