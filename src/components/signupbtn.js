import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const SignupButton = ( { type, children } ) => {
  const { loginWithRedirect } = useAuth0();
  const style = "w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
  return <a className={style} href="#" onClick={() => 
        loginWithRedirect({
            screen_hint:'signup',
        })} 
    >{children}</a>;
};

export default SignupButton;