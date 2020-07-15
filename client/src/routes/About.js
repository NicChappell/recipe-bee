// import dependencies
import React from 'react'

// import components
import ByTheNumbers from '../components/about/ByTheNumbers'
import HowItWorks from '../components/about/HowItWorks'
import Mission from '../components/about/Mission'

const About = () => {
    return (
        <div className="container" id="about">
            <div className="row center-align">
                <div className="col s12">
                    <div className="card-panel">
                        <HowItWorks />
                        <ByTheNumbers />
                        <Mission />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About
