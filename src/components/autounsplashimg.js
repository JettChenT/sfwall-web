import React from 'react'
import UnsplashImg from './unsplashImg'

const AutoLoadUnsplashImg = ({img_id, blur_hash, x, y, ...rest}) => {
    let [loading, setLoading] = React.useState(true)
    return (
        <UnsplashImg
            img_id={img_id}
            blur_hash={blur_hash}
            x={x}
            y={y}
            loading={loading}
            loadFunc={() => setLoading(false)}
            {...rest}
        />
    )
}

export default AutoLoadUnsplashImg
