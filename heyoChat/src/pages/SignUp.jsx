import backG from "../assets/Path426.svg";
import bitmoji from "../assets/sureboy@2x.png";
import logoNameSk from "../assets/Group 477@2x.png";
import logoName from "../assets/Group 478@2x.png";
import google from "../assets/icons8-google-480.png";

export const SignUp = () => {
  const googleF = () => {
    window.open("http://localhost:8000/auth/google", "_self");
  };

    
  return (
    <>
      <div className="backG">
        <img className="bitmoji" src={bitmoji}></img>
        <img src={backG}></img>
        <img className="LN" src={logoName}></img>
        <img className="LNS" src={logoNameSk}></img>
      </div>
      <div className="container">
        <div className="left">
          <h2>Stay connected, anytime, anywhere with the heyo! app</h2>
        </div>
        <div className="right">
          <h2>Welcome Back!😁</h2>
          <button onClick={googleF} className="google">
            <a href="">
              <img src={google} className="googleImg"></img>
            </a>
            <h3>Sign up with your Google account</h3>
          </button>
          <a href="" className="email">
            Sign In with your Email Instead
          </a>
        </div>
      </div>
    </>
  );
};

const SignWithEmail = () => {
  return <form method="" action=""></form>;
};
