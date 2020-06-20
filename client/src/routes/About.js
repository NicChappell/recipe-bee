// import dependencies
import React from 'react'
import isEmpty from 'lodash.isempty'

// import components
import ByTheNumbers from '../components/about/ByTheNumbers'
import HowItWorks from '../components/about/HowItWorks'
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
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About
