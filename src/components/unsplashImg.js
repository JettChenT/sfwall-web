import React from 'react'

const UnsplashImg = ( {img_id, x, y, ...rest} ) => {
    const image_url = `https://source.unsplash.com/${img_id}/${x}x${y}`
    return (
        <img alt = "Unsplash" src={image_url} {...rest}></img>
    )
}

export default UnsplashImg;