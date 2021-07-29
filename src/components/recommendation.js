import React, { useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import UnsplashImg from "./unsplashImg";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { ArrowCircleDownIcon } from "@heroicons/react/outline";
import Loader from "./loader";

const Recommendation = () => {
  let [imageid, setImageid] = useState("");
  let [loading, setLoading] = useState(true);
  let [started, setStarted] = useState(false);
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const { getAccessTokenSilently } = useAuth0();
  const handle = useFullScreenHandle();

  const downloadImg = async (img_id) => {
    setLoading(true);
    let target = `https://source.unsplash.com/${img_id}/${window.screen.width * window.devicePixelRatio}x${window.screen.height * window.devicePixelRatio}`
    axios.get(target,
      {
          responseType: 'arraybuffer',
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/jpg'
          }
      })
      .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `${img_id}.jpg`); //or any other extension
          document.body.appendChild(link);
          link.click();
          setLoading(false);
      })
      .catch((error) => console.log(error));
}

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
      <div className="flex flex-col h-full mt-5 my-auto items-center" style={{ backgroundImage: `url(https://ik.imagekit.io/sfwall/https://source.unsplash.com/${imageid}/${window.innerWidth}x${window.innerHeight})` }}>
        <Loader loading={loading}/>
        <button
          className= "mt-5 opacity-80 rounded-full nm-flat-gray-200 hover:nm-flat-gray-200-lg leading-5 px-8 py-4 uppercase font-bold tracking-widest transition duration-200 ease-in-out transform disabled:opacity-25"
          onClick={() => getRecommendation()}
          disabled={loading}
        >
          GET RECOMMENDATION
        </button>
        {
          !handle.active &&
          <button 
          className="opacity-80 rounded-full mt-3 nm-flat-gray-200 hover:nm-flat-gray-200-lg leading-5 px-8 py-4 uppercase font-bold tracking-widest transition duration-200 ease-in-out transform disabled:opacity-25"
          onClick={handle.enter}
          >
            FullScreen
          </button>
        }
        <button 
          className="opacity-80 rounded-full mt-3 nm-flat-gray-200 hover:nm-flat-gray-200-lg leading-5 px-8 py-4 uppercase font-bold tracking-widest transition duration-200 ease-in-out transform disabled:opacity-25"
          onClick={()=>downloadImg(imageid)}
          disabled={loading}
          >
            <ArrowCircleDownIcon className="h-5 w-5 text-blue-500"/>
          </button>
      </div>
    </FullScreen>
  );
};

export default Recommendation;
