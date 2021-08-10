import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import Loader from "./loader";
import Slider from "rc-slider";
import { Dialog } from "@headlessui/react";
import "rc-slider/assets/index.css";
import UnsplashImg from "./unsplashImg";

const marks = {
  0: "Hideous",
  1: "Breathtaking",
  0.5: "Neutral",
};

const Rater = () => {
  let [imageid, setImageid] = useState("");
  let [blurhash, setBlurhash] = useState("L#LNrwR*NGWB~XWBWBj[IUayj[j[");
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const { getAccessTokenSilently } = useAuth0();
  let [loading, setLoading] = useState(true);
  let [started, setStarted] = useState(false);
  let [rating, setRating] = useState(0.5);
  let [count, setCount] = useState(0);
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
          setBlurhash(responseData["blur_hash"]);
        });
    } catch (error) {
      alert(error.message);
    }
  };

  const update = async () => {
    const token = await getAccessTokenSilently();
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    axios
      .post(`${serverUrl}/update`, null, { headers: headers })
      .then((res) => {
        console.log(res.data);
        setMsg("Recommendation system updated!")
      });
  };

  const makerank = async (score) => {
    setLoading(true);
    setMsg("Loading...");
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
      setCount(count + 1);
      console.log(count);
      if (count > 0 && count % 10 === 0) {
        update();
      }
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
      if(count%10!==0 || count==0){
        setMsg(
          <span>You have rated <span className="text-green-500">{count}</span> images, rate <span className="text-green-500">{10-count%10}</span> more images to trigger an update in the recommendation system</span>
        )
      }
    }
  };

  return (
    <div className="h-5/6 flex flex-col my-auto items-center">
      <span className="font-sans my-2 text-lg text-blue-500 italic shadow-sm bg-gray-200 py-1 px-2 rounded-md">{msg}</span>
      {
        started &&
      <div className="object-contain h-2/3">
        <UnsplashImg
          x={720}
          y={360}
          img_id={imageid}
          blurhash={blurhash}
          loading={loading}
          loadFunc={()=>load()}
        />
      </div>
      }
      {/* <Loader loading={loading} size={150} /> */}
      {started && (
        <Slider
          min={0}
          max={1}
          step={0.1}
          startPoint={0.5}
          dots={true}
          marks={marks}
          value={rating}
          className="max-w-md mt-3 mb-7"
          onChange={(value) => setRating(value)}
          disabled={!started || loading}
        />
      )}

      {started ? (
        <div className="flex">
          <button
            className="rounded-full nm-flat-gray-200 hover:nm-flat-gray-200-lg leading-5 px-8 py-4 uppercase font-bold tracking-widest transition duration-200 ease-in-out transform hover:scale-110 disabled:opacity-25"
            onClick={() => makerank(rating)}
            disabled={!started || loading}
          >
            RATE
          </button>
          <br />
        </div>
      ) : (
        <button
          className="rounded-full nm-flat-red-200 hover:nm-flat-red-200-lg leading-5 px-8 py-4 uppercase font-bold tracking-widest transition duration-200 ease-in-out transform hover:scale-110"
          onClick={() => start()}
        >
          START
        </button>
      )}
    </div>
  );
};

export default Rater;
