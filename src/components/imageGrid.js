import React, { useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import UnsplashImg from "./unsplashImg";

const ImageGrid = () => {
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const { getAccessTokenSilently } = useAuth0();
  let [loading, setLoading] = useState(true);
  let [started, setStarted] = useState(false);
  let [msg, setMsg] = useState("Press Start to start ranking images!");
  let [current, setCurrent] = useState("")
  let [images, setImages] = useState([]);

  const updateImg = async () => {
    const token = await getAccessTokenSilently();
    setLoading(true);
    axios
      .get(`${serverUrl}/random?n=9`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((resp) => {
        const data = resp.data;
        console.log(data);
        let tmpimages = data["result"].map((img) => img["img_id"]);
        console.log(tmpimages);
        setImages(tmpimages);
        console.log(images);
      });
    setStarted(true);
    setLoading(false);
  };

  if (!started) {
    updateImg();
  }

  const reco = async(img_id) => {
    const token = await getAccessTokenSilently();
    setCurrent(img_id)
    axios.get(`${serverUrl}/similar`,{
        params: {
            img_id: img_id,
            n: 9
        },
        headers: {
            Authorization: `Bearer ${token}`
        },
    }).then(
        (resp) => {
            const data = resp.data;
            console.log(data);
            let tmpimages = data["response"].map((img) => img["img_id"]);
            console.log(tmpimages);
            setImages(tmpimages);
            console.log(images);
        }
    )
  } 

  return (
  <>
      <div className="relative grid grid-cols-3 gap-4 mx-auto max-h-screen lg:w-3/5 md:w-4/5 sm:w-4/5">
        {images.map((img) => {
          return <button onClick={()=>reco(img)} className={`rounded-md ${current==img?"ring-4 ring-blue-600":""}`}>
              <UnsplashImg img_id={img} x={1024} y={720} key={img}/>
        </button>
        })}
      </div>
    </>
  );
};

export default ImageGrid;
