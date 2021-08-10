import React from 'react'
import { useState } from 'react';
import LazyLoad from 'react-lazyload';
import { Blurhash } from 'react-blurhash';

const UnsplashImg = ( {img_id, blurhash, x, y, loading, loadFunc=()=>{}, ...rest} ) => {
    const image_url = `https://ik.imagekit.io/sfwall/https://source.unsplash.com/${img_id}/${x}x${y}`
    return (
        <LazyLoad height={y}>
            {
                loading &&
            <div
                className="rounded-md"
            >
                <Blurhash 
                    hash={blurhash}
                    height={y}
                    width={x}
                />
            </div>
            }  
            <img 
                alt = "Unsplash" 
                src={image_url} 
                className={`${loading && 'hidden'}`}
                onLoad={() => loadFunc()}
                {...rest}
            >
            </img>
        </LazyLoad>
    )
}

export default UnsplashImg;