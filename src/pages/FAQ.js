import React, { useState } from "react";

const FAQS = [
  {
    qid: 0,
    q: "Is Scan For Wallpapers free?",
    a: "Yes, currently, Scan For Wallpapers is totally free.",
  },
  {
    qid: 1,
    q: "Why not other wallpaper applications?",
    a: "Scan For Wallpapers is the only wallaper application that utilizes AI algorithms to provied a personalize wallpaper experience.",
  },
  {
    qid: 2,
    q: "Is there a desktop application?",
    a: "Yes! there is a desktop application for MacOS, iOS, and Windows.",
  },
];

function FAQIndex() {
  const [question, setquestion] = useState(0);
  return (
    <div className="pt-16">
      <div className="container mx-auto pt-16 pb-16 bg-gray-100 rounded-3xl">
        <div className="text-center pb-3 md:pb-10 xl:pb-20">
          <h1 className="px-2 xl:px-0 xl:text-5xl md:text-3xl text-2xl font-extrabold text-gray-800">
            Frequently Asked Questions
          </h1>
        </div>
        <div className="w-10/12 mx-auto">
          <ul>
            {FAQS.map((item) => (
              <li className="py-6 border-gray-200 border-solid border-b">
                <div className="flex justify-between items-center">
                  <h3 className="text-gray-800 text-base  md:text-xl  xl:text-2xl w-10/12">
                    {item.q}
                  </h3>
                  <div
                    className="cursor-pointer"
                    onClick={() =>
                      question === item.qid
                        ? setquestion(null)
                        : setquestion(item.qid)
                    }
                  >
                    {question === item.qid ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={36}
                        height={36}
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="#A0AEC0"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-label="Close"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <circle cx={12} cy={12} r={9} />
                        <line x1={9} y1={12} x2={15} y2={12} />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={36}
                        height={36}
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="#A0AEC0"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-label="Open"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <circle cx={12} cy={12} r={9} />
                        <line x1={9} y1={12} x2={15} y2={12} />
                        <line x1={12} y1={9} x2={12} y2={15} />
                      </svg>
                    )}
                  </div>
                </div>
                {question === item.qid && (
                  <p className="pt-2 md:pt-3  lg:pt-5 text-gray-800 bg-gray-100 text-sm md:text-base  xl:text-lg rounded-b-lg">
                    {item.a}{" "}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default FAQIndex;
