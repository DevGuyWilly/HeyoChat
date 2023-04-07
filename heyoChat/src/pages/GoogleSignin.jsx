import { useEffect } from "react";


export const GoogleSignin = () => {
  const handleCallbackResponse = (response) => {
    console.log(`jwt tokekn : ${response.credential}`);
  };
  console.log(import.meta.env.VITE_CLIENT_ID); ///this is how to enviromental variables in vite react app
  useEffect(() => {
    /* global google */
    if (google?.accounts?.id) {
      google?.accounts.id.initialize({
        client_id: import.meta.env.VITE_CLIENT_ID,
        callback: handleCallbackResponse,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("signInDiv"),
        { width: "300", color: "blue" }
      );
    }
  }, []);

  
  return (
    <span style={{display:"flex",justifyContent:"center"}}>
      <div id="signInDiv" >
      </div>
    </span>
  );
};