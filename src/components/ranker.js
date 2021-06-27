import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";

const Ranker = () => {
  const [imageid, setImageid] = useState("");
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const { getAccessTokenSilently } = useAuth0();
  let [loading, setLoading] = useState(true);
  let [started, setStarted] = useState(false);
  let [msg,setMsg] = useState("Press Start to start ranking images!")

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
      setMsg("Loading image...")
    //   setLoading(false)
  }

  const load = async ()=>{
    if(started){
        setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-screen my-auto items-center">
      <img
        className="w-3/5"
        src={`https://source.unsplash.com/${imageid}/1600x900`}
        style={loading?{display:'none'}:{}}
        onLoad={()=>load()}
      ></img>
      <span>{loading&&msg}</span>
      <ClipLoader loading={loading} size={150} />
      {
    started ?
      <div className="inline-flex">
        <button
          className="bg-blue-300 hover:bg-blue-400 text-gray-800 font-bold py-2 px-4 rounded-l"
          onClick={() => makerank(1)}
        >
          Like
        </button>
        <button
          className="bg-red-300 hover:bg-red-400 text-gray-800 font-bold py-2 px-4 rounded-r"
          onClick={() => makerank(0)}
        >
          Dislike
        </button>
      </div> : <button
          className="bg-red-300 hover:bg-red-400 text-gray-800 font-bold py-2 px-4 rounded"
          onClick={() => start()}>
              START
          </button>
    }
    </div>
  );
};

export default Ranker;
