import axios from "axios";

export const ChatPage = () => {
  // logout = async () => {
  //   try {
  //     const response = await axios("/users/logout", { method: "POST" });

  //     // remove token from local storage and redirect to login page
  //     localStorage.setItem("token", null);
  //     this.props.history.push("/login");
  //   } catch (e) {
  //     console.log(error);
  //   }
  // };
  return (
    <div>
      <h1 className="chat">This is ChatPage</h1>
      <button>LogOut</button>
    </div>
  );
};
