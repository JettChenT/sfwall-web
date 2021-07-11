import f from "compose-function";
import React from "react";
import FunLink from "../components/funlink";
import 'intro.js/introjs.css';
import { Steps } from 'intro.js-react';
import { useCookies } from 'react-cookie';

const steps = [
    {
        element: "#HomeBtn",
        intro: "Welcome to Scan-For-Wallpapers! This is also the home button."
    },
    {
      element: '#RateImg',
      intro: "Rate 10+ images first if you don't want completely random recommendations!",
    },
    {
      element: '#Simulator',
      intro: 'Behold the magic of Scan-For-Wallpapers here!',
    },
    {
      element: '#TopImg',
      intro: 'View the top 99 images that best fits your interest!',
    },
    {
        element: '#SimImg',
        intro: "This is just a fun interactive program!"
    }
  ];
  

const Dashboard = () => {
    const [cookies, setCookie] = useCookies(['isIntroduced']);
  return (
    <>
      <Steps
        enabled={!cookies.isIntroduced}
        steps={steps}
        initialStep={0}
        onExit={()=>setCookie('isIntroduced',true,{ path:'/' })}
    />
      <div className="container mx-auto flex flex-row flex-wrap">
        <FunLink
          title="Rate Images"
          description="Rate images in order for system to learn your preferences. "
          to="/rating"
          linkDesc="Start rating"
          fcolor="purple"
          tcolor="blue"
          id="RateImg"
        />
        <FunLink
          title="Simulator"
          description="A simulation of the desktop, where the wallpaper recommendation happens."
          to="/recommend"
          linkDesc="Start simulating"
          fcolor="red"
          tcolor="yellow"
          id="Simulator"
        />
        <FunLink
          title="Top Images"
          description="View the top images among the 25,000 images in our dataset selected by your interest."
          to="/top"
          linkDesc="Start exploring"
          fcolor="pink"
          tcolor="purple"
          id="TopImg"
        />
        <FunLink
          title="Simillar Images"
          description="A grid of images in which simillar images shows up upon clicking on one."
          to="/imgrid"
          linkDesc="Start experimenting"
          fcolor="green"
          tcolor="indigo"
          id="SimImg"
        />
    </div>
    </>
  );
};

export default Dashboard;
