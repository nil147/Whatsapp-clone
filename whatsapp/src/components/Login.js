import { Button } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/userSlice";
import { auth, provider } from "../firebase";
import "../styles/Login.scss";

function Login() {
  const dispatch = useDispatch();

  const loginApp = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch(
          login({
            email: result.user.email,
            uid: result.user.uid,
            displayName: result.user.photoURL,
          })
        );
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <img
        src="https://logo-logos.com/wp-content/uploads/2016/10/WhatsApp_logo_logotype_text.png"
        alt="Logo"
      />
      <h1>Welcome to whatsApp</h1>
      <Button onClick={loginApp}>Sign in with Google</Button>
    </div>
  );
}

export default Login;
