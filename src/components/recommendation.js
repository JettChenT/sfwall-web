import React, { useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import UnsplashImg from "./unsplashImg";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import Loader from "./loader";

const Recommendation = () => {
  let [imageid, setImageid] = useState("");
  let [loading, setLoading] = useState(true);
  let [started, setStarted] = useState(false);
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const { getAccessTokenSilently } = useAuth0();
  const handle = useFullScreenHandle();

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
        setLoading(false);
      });
  };

  if (!started) {
    getRecommendation();
    setStarted(true);
  }

  return (
    <FullScreen handle={handle} className="h-full">
      <div className="flex flex-col h-full mt-5 my-auto items-center" style={{ backgroundImage: `url(https://source.unsplash.com/${imageid}/${window.innerWidth}x${window.innerHeight})` }}>
        <Loader loading={loading}/>
        <button
          className= "mt-5 rounded-full nm-flat-gray-200 hover:nm-flat-gray-200-lg leading-5 px-8 py-4 uppercase font-bold tracking-widest transition duration-200 ease-in-out transform disabled:opacity-25"
          onClick={() => getRecommendation()}
          disabled={loading}
        >
          GET RECOMMENDATION
        </button>
        {
          !handle.active &&
          <button 
          className="rounded-full mt-3 nm-flat-gray-200 hover:nm-flat-gray-200-lg leading-5 px-8 py-4 uppercase font-bold tracking-widest transition duration-200 ease-in-out transform disabled:opacity-25"
          onClick={handle.enter}
          >
            FullScreen
          </button>
        }
      </div>
    </FullScreen>
  );
};

export default Recommendation;
