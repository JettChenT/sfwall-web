import f from 'compose-function'
import React from 'react'
import FunLink from '../components/funlink'

const Dashboard = () => {
    return (
        <div className="container mx-auto flex flex-row flex-wrap">
            <FunLink 
                title="Rate Images" 
                description="Rate images in order for system to learn your preferences. "
                to="/rating"
                linkDesc="Start rating"
                fcolor="purple"
                tcolor="blue"
            />
            <FunLink
                title="Simulator"
                description="A simulation of the desktop, where the wallpaper recommendation happens."
                to="/recommend"
                linkDesc="Start simulating"
                fcolor="red"
                tcolor="yellow"
            />
            <FunLink
                title="Simillar Images"
                description="A grid of images in which simillar images shows up upon clicking on one."
                to="/imgrid"
                linkDesc="Start experimenting"
                fcolor="green"
                tcolor="indigo"
            />
            <FunLink
                title="Top Images"
                description="View the top images among the 25,000 images in our dataset selected by your interest."
                to="/top"
                linkDesc="Start exploring"
                fcolor="pink"
                tcolor="purple"
            />
        </div>
    )
}

export default Dashboard
