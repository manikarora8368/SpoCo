import React from 'react';
import './Landing.css';

// assets
import Bird from '../../assets/svgComponents/Bird';
import HumanNotes from '../../assets/svgComponents/HumanNotes';
const Landing=()=>{
    return(
        <div className="container">
            <div className="landing-left">
                <Bird />
            </div>
            <div className="landing-right">
                <HumanNotes />
            </div>
        </div>
    )
}
export default Landing;