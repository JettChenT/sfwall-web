import React, { useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import AutoLoadUnsplashImg from "./autounsplashimg";
import Loader from "./loader";

const TopGrid = () => {
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const { getAccessTokenSilently } = useAuth0();
  const N=99;
  let [loading, setLoading] = useState(true);
  let [started, setStarted] = useState(false);
  let [loadTarget, setLoad] = useState("");
  let [images, setImages] = useState([]);

  const updateImg = async () => {
    const token = await getAccessTokenSilently();
    axios
      .get(`${serverUrl}/top?n=${N}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((resp) => {
        const data = resp.data;
        console.log(data);
        let tmpimages = data["response"];
        console.log(tmpimages);
        setImages(tmpimages);
        console.log(images);
        setLoading(false);
      });
    setStarted(true);
  };

  const downloadImg = async (img_id) => {
      setLoad(img_id);
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
            setLoad("");
        })
        .catch((error) => console.log(error));
  }

  if (!started) {
    updateImg();
  }
  return (
  <div className="relative mx-auto w-11/12 mt-10">
      <span className="text-4xl text-gray-700 font-extrabold">Your top {N} images: (Click to download)</span>
      <br/>
      <Loader loading={loading}/>
      <div className="grid grid-cols-3 gap-4 mt-5">
        {images.map((img) => {
          return( 
            <button 
                onClick={ () => downloadImg(img.img_id)}
                className="transform transition-transform ease-in-out hover:scale-105"
            >
                <AutoLoadUnsplashImg 
                    img_id={img.img_id}
                    blurhash={img.blur_hash}
                    x={Math.round(window.innerWidth/3)} 
                    y={Math.round(window.innerHeight/3)} 
                    key={img.img_id} 
                    className={`rounded-md ${(loadTarget==img.img_id) && "opacity-20"}`}
                />
            </button>
          )
        })}
      </div>
    </div>
  );
};

export default TopGrid;