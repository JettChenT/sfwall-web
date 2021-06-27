import React from "react";

import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user } = useAuth0();
  const { name, picture, email } = user;

  return (
    <>
        <img
          className="inline-block h-32 w-32 rounded-full ring-2 ring-white"
          src={picture}
          alt="Profile pic"
        />
        {" "}
        <p>You are logged in as: <span className="text-blue-600">{name}</span></p>
    </>
  );
};

export default Profile;