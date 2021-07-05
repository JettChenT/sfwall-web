import React from 'react'
import { ScaleLoader } from "react-spinners";

const Loader = ({loading, ...params}) => {
    return (
        <ScaleLoader loading={loading} height={100} width={3} margin={10} color="#50E3C2" {...params}/>
    )
}

export default Loader
