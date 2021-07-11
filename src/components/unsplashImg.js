import React from 'react'
import LazyLoad from 'react-lazyload';

const UnsplashImg = ( {img_id, x, y, ...rest} ) => {
    const image_url = `https://source.unsplash.com/${img_id}/${x}x${y}`
    return (
        <LazyLoad height={y}>
            <img alt = "Unsplash" src={image_url} {...rest}></img>
        </LazyLoad>
    )
}

export default UnsplashImg;