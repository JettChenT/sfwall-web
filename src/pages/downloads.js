import React from "react";
import axios from "axios";
import Loader from "../components/loader";
import FunLink from "../components/funlink";
import { Macos } from "@icons-pack/react-simple-icons";
import { Windows } from "@icons-pack/react-simple-icons";
import { Ios } from "@icons-pack/react-simple-icons";
import TokenField from "../components/acctoken";

const APPLICON = (
  <Macos color="white" className="inline-block mr-3" size={48} />
);
const IOSICON = <Ios color="white" className="inline-block mr-3" size={56} />;
const MSICON = (
  <Windows color="white" className="inline-block mr-2" size={32} />
);

const DownloadPage = () => {
  let [version, setVersion] = React.useState("");
  if (version == "") {
    axios
      .get(
        "https://api.github.com/repos/jettchent/sfwall-native/releases/latest"
      )
      .then((response) => {
        setVersion(response.data.name);
      })
      .catch((error) => {
        console.log(error);
        setVersion("v0.1.0");
      });
  }
  return (
    <div>
      <h1 className="text-3xl text-center mt-5">Downloads</h1>
      <Loader loading={version == ""} />
      {version && (
        <>
        <div className="mt-5 mx-auto md:w-2/3 lg:w-1/2">
              <label>
                Paste your SFW token into your desktop client to enable
                wallpaper recommendations!
              </label>
              <TokenField />
            </div>
          <div className="container mx-auto flex flex-row flex-wrap">
            <FunLink
              title={<span>{APPLICON} Download for macOS</span>}
              description={
                <span>Download the latest version of the Mac OS app</span>
              }
              to={`https://github.com/JettChenT/sfwall-native/releases/download/v${version}/sfwall-native-${version}.dmg`}
              linkDesc="Download"
              fcolor="blue"
              remote={true}
            />
            <FunLink
              title={<span>{IOSICON} Download for iPhone</span>}
              description={
                <span>
                  Download the latest version of the iOS shortcut for your
                  iPhone
                </span>
              }
              to={`https://www.icloud.com/shortcuts/b701a114084e4e8ebcd0f0a91190a086`}
              linkDesc="Download"
              remote={true}
            />
            <FunLink
              title={<span>{MSICON} Download for PC</span>}
              description={
                <span>
                  Download the latest version of the Windows app for your PC.
                </span>
              }
              to={`https://github.com/JettChenT/sfwall-native/releases/download/v${version}/sfwall-native-Setup-${version}.exe`}
              linkDesc="Download"
              fcolor="red"
              tcolor="yellow"
              remote={true}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default DownloadPage;
