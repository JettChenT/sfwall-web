import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const Ranker = () => {
  const [imageid, setImageid] = useState("");
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const { getAccessTokenSilently } = useAuth0();
  const [initialized, setInit] = useState(false);

  const UpdateImgId = async () => {
    try {
      const token = await getAccessTokenSilently();
      axios
        .get(`${serverUrl}/random`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          const responseData = res.data;
          setImageid(responseData["img_id"]);
        });
    } catch (error) {
      alert(error.message);
    }
  };
  if (!initialized) {
    UpdateImgId();
    setInit(true);
  }

  const makerank = async (score) => {
    try {
      const token = await getAccessTokenSilently();
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const data = {
        rating: score,
        photo_id: imageid,
      };
      axios
        .post(`${serverUrl}/rate`, data, { headers: headers })
        .then((res) => {
          console.log(res.data);
          UpdateImgId();
        });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex flex-col h-screen my-auto items-center">
      <img className="w-3/5" src={`https://source.unsplash.com/${imageid}/1600x900`}></img>
      <div className="inline-flex">
        <button className="bg-blue-300 hover:bg-blue-400 text-gray-800 font-bold py-2 px-4 rounded-l" onClick={() => makerank(1)}>
          Like
        </button>
        <button className="bg-red-300 hover:bg-red-400 text-gray-800 font-bold py-2 px-4 rounded-r" onClick={() => makerank(0)}>
          Dislike
        </button>
      </div>
    </div>
  );
};

export default Ranker;
