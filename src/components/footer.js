import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../SFWLogo.svg";
const Footer = () => {
  const [mode, setMode] = useState("auto");
  return (
    <div className="pt-12">
      <footer id="footer" className="relative z-50 dark:bg-gray-900 pt-24">
        <div className=" border-t border-b border-gray-200 dark:border-gray-700 py-16">
          <div className="mx-auto container px-4 xl:px-12 2xl:px-4">
            <div className="lg:flex">
              <div className="w-full lg:w-1/2 mb-16 lg:mb-0 flex">
                <div className="w-full lg:w-1/2 px-6">
                  <ul>
                    <li>
                      <Link href="/faq">
                        <a className="text-xs lg:text-sm leading-none hover:text-brand dark:hover:text-brand text-gray-800 dark:text-gray-50">
                          FAQ
                        </a>
                      </Link>
                    </li>
                    <li>
                        <a 
                            className="text-xs mt-3 lg:text-sm leading-none hover:text-brand dark:hover:text-brand text-gray-800 dark:text-gray-50"
                            href="https://jettchen.me"    
                        >
                          Jett Chen
                        </a>
                    </li>
                  </ul>
                </div>
                <div className="w-full lg:w-1/2 px-6">
                  <ul>
                    <li>
                        <a 
                            className="text-xs lg:text-sm leading-none hover:text-brand dark:hover:text-brand text-gray-800 dark:text-gray-50"
                            href="https://info.scan4wall.xyz"    
                        >
                          Blog&Help
                        </a>
                    </li>
                    <li>
                        <a 
                            className="text-xs mt-3 lg:text-sm leading-none hover:text-brand dark:hover:text-brand text-gray-800 dark:text-gray-50"
                            href="https://scanforwallpapers.noticeable.news/"
                        >
                          Changelog
                        </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="w-full lg:w-1/2 flex">
                <div className="w-full lg:w-1/2 px-6">
                  <ul>
                    <li>
                      <a
                        href="https://www.privacypolicygenerator.info/live.php?token=zyCEhs8ebMh6J0cbsoBkYYcV2JGEfGLU"
                        className="text-xs lg:text-sm leading-none hover:text-brand dark:hover:text-brand text-gray-800 dark:text-gray-50"
                      >
                        Privacy policy
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.termsofservicegenerator.net/live.php?token=PDvge4ACkCqZHCATs4UYXAkKh5sQXUQP"
                        className="text-xs mt-3 lg:text-sm leading-none hover:text-brand dark:hover:text-brand text-gray-800 dark:text-gray-50"
                      >
                        Terms of service
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="py-16 flex flex-col justify-center items-center">
          <Link href="javascript:void(0)">
            <img
              className="h-8 w-auto sm:h-10 inline font-semibold"
              src={logo}
            />{" "}
            can for Wallpapers
          </Link>
          <p className="mt-6 text-xs lg:text-sm leading-none text-gray-900 dark:text-gray-50">
            2021 Scan For Wallpapers. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};
export default Footer;
