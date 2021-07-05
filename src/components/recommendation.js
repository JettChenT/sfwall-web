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
        className="object-contain h-2/3"
      />
      <button
        className="bg-red-300 hover:bg-red-500 text-gray-800 font-bold my-10 py-2 px-4 rounded disabled:opacity-30"
        onClick={() => getRecommendation()}
        disabled={loading}
      >
        GET RECOMMENDATION
      </button>
    </div>
  );
};

export default Recommendation;
