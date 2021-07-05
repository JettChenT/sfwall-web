import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const SigninButton = ( { children } ) => {
  const { loginWithRedirect } = useAuth0();
  const style = "w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
  return <a className={style} href="#" onClick={() => loginWithRedirect()} 
    >{children}</a>;
};

export default SigninButton;