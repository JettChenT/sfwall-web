import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = ( ) => {
  const { loginWithRedirect } = useAuth0();
  const style = "font-medium text-indigo-600 hover:text-indigo-500"
  return <a className={style} href="#" onClick={() => loginWithRedirect()} >Log in</a>;
};

export default LoginButton;