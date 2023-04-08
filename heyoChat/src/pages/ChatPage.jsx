import axios from "axios";

export const ChatPage = () => {
  const logOut=()=>{
    window.open("http://localhost:8000/auth/logout", "_self");
  }



  
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
      <button onClick={logOut} >LogOut</button>
    </div>
  );
};
