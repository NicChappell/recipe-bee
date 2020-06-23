// import dependencies
import React from 'react'

// import components
import ByTheNumbers from '../components/about/ByTheNumbers'
import HowItWorks from '../components/about/HowItWorks'
import Location from '../components/about/Location'
import Mission from '../components/about/Mission'
import Recipes from '../components/about/Recipes'

const About = () => {
    return (
        <div className="container" id="about">
            <div className="row center-align">
                <div className="col s12">
                    <div className="card-panel">
                        <Recipes />
                        <HowItWorks />
                        <ByTheNumbers />
                        <div className="row">
                            <div className="col s6">
                                <Mission />
                            </div>
                            <div className="col s6">
                                <Location />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About
