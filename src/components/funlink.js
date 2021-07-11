import React from 'react'
import { Link } from 'react-router-dom'

const FunLink = ( {title, description, to, linkDesc, fcolor="purple", tcolor="indigo"} ) => {
    return (
        <div className={`bg-gradient-to-br from-${fcolor}-500 to-${tcolor}-500 p-8 text-white rounded-3xl mt-10 mr-10 w-auto transition duration-200 ease-in-out transform hover:-translate-y-1 flex-1`}>
           <div>
               <span className="block mb-3 font-bold text-xl md:text-2xl">
                    {title}
               </span>
               <span className="block font-semibold font-sans text-md">
                    {description}
               </span>
            </div> 
            <Link to={to} className={`mt-5 py-2 px-4 bg-${fcolor}-900 bg-opacity-50 hover:bg-opacity-70 rounded-xl inline-block font-bold`}>
                {linkDesc}
            </Link>
        </div>
    )
}

export default FunLink
