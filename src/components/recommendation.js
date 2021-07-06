import React, { useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import UnsplashImg from "./unsplashImg";
import Loader from "./loader";

const Recommendation = () => {
  let [imageid, setImageid] = useState("");
  let [loading, setLoading] = useState(true);
  let [started, setStarted] = useState(false);
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const { getAccessTokenSilently } = useAuth0();

  const getRecommendation = async () => {
    const token = await getAccessTokenSilently();
    setLoading(true);
    axios
      .get(`${serverUrl}/recommendation`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const responseData = res.data;
        setImageid(responseData["recommendation"]);
      });
  };

  if (!started) {
    getRecommendation();
    setStarted(true);
  }

  return (
    <div className="flex flex-col h-5/6 my-auto items-center">
      <Loader loading={loading}/>
      <UnsplashImg
        img_id={imageid}
        x={2048}
        y={1024}
        style={loading ? { display: "none" } : {}}
        onLoad={()=>setLoading(false)}
        className="object-contain mt-5 h-5/6"
      />
      <button
        className= "mt-5 rounded-full nm-flat-gray-200 hover:nm-flat-gray-200-lg leading-5 px-8 py-4 uppercase font-bold tracking-widest transition duration-200 ease-in-out transform hover:scale-110"
        onClick={() => getRecommendation()}
        disabled={loading}
      >
        GET RECOMMENDATION
      </button>
    </div>
  );
};

export default Recommendation;
