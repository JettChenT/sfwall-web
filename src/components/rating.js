import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const marks = {
  0: "Hideous",
  1: "Breathtaking",
  0.5: "Neutral",
};

const Rater = () => {
  const [imageid, setImageid] = useState("");
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const { getAccessTokenSilently } = useAuth0();
  let [loading, setLoading] = useState(true);
  let [started, setStarted] = useState(false);
  let [rating, setRating] = useState(0.5);
  let [msg, setMsg] = useState("Press Start to start ranking images!");

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

  const makerank = async (score) => {
    setLoading(true);
    try {
      const token = await getAccessTokenSilently();
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const data = {
        rating: score,
        photo_id: imageid,
      };
      UpdateImgId();
      setRating(0.5);
      axios
        .post(`${serverUrl}/rate`, data, { headers: headers })
        .then((res) => {
          console.log(res.data);
          //   setLoading(false);
        });
    } catch (error) {
      alert(error.message);
    }
  };

  const start = async () => {
    await UpdateImgId();
    setStarted(true);
    setMsg("Loading image...");
    //   setLoading(false)
  };

  const load = async () => {
    if (started) {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen my-auto items-center">
      <img
        className="w-3/5"
        src={`https://source.unsplash.com/${imageid}/1600x900`}
        style={loading ? { display: "none" } : {}}
        className="object-contain h-2/3 w-full"
        onLoad={() => load()}
      ></img>
      <span>{loading && msg}</span>
      <ClipLoader loading={loading} size={150} />
      {
        started && 
        <Slider
          min={0}
          max={1}
          step={0.1}
          startPoint={0.5}
          dots={true}
          marks={marks}
          value={rating}
          className="max-w-md m-5 mb-10"
          onChange={(value) => setRating(value)}
          disabled={!started||loading}
        />
      }

      {started ? (
        <div className="flex">
          <button
            className="bg-blue-300 hover:bg-blue-500 disabled:opacity-50 transform hover:scale-105  text-gray-800 font-bold py-2 px-4 rounded"
            onClick={() => makerank(rating)}
            disabled={!started||loading}
          >
            RATE
          </button>
          <br />
        </div>
      ) : (
        <button
          className="bg-red-300 hover:bg-red-500 text-gray-800 font-bold py-2 px-4 rounded"
          onClick={() => start()}
        >
          START
        </button>
      )}
    </div>
  );
};

export default Rater;
