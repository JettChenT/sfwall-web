/* This example requires Tailwind CSS v2.0+ */
import SignupButton from "../components/signupbtn";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Signup from "../components/waitlist";
import SigninButton from "../components/signinbtn";
import FAQIndex from "./FAQ";
import ReactPlayer from "react-player/wistia";
import StepsPage from "../components/steps";

export default function Home() {
  const { isAuthenticated } = useAuth0();
  return (
    <>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react/16.6.3/umd/react.production.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.6.3/umd/react-dom.production.min.js"></script>
    <div className="relative">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl">
                <span className="block">Wallpapers</span>{" "}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-400">
                  Personalized.
                </span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl">
                Scan for wallpapers utilizes AI algorithms to provide you with personalized wallpapers you love.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center">
                <div className="rounded-md shadow">
                  {isAuthenticated ? (
                    <Link
                      to="/recommend"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                    >
                      Simulator
                    </Link>
                  ) : (
                    <SignupButton> Sign up </SignupButton>
                  )}
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  {
                    isAuthenticated?
                    <Link
                      to="/rating"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
                    >
                      Rate images
                    </Link>
                    :
                    <SigninButton>Log in</SigninButton>
                  }
                </div>
              </div>
              <span className="text-sm text-gray-500">
                  Avaliable in Web,  Mac,  and iPhone
              </span>
            </div>
          </main>
        </div>
      </div>
    </div>
    <div className="w-full">
      <ReactPlayer  
        url="https://jettchen12345.wistia.com/medias/dt810ffoyb"
        className="container mx-auto md:px-32 lg:px-64"
        width="100%"
      />
    </div>
    {/* <StepsPage/> */}
    <FAQIndex/>
  </>
  );
}
