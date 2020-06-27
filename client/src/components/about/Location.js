// import dependencies
import React from 'react'

// import images
import flatirons from '../../images/photography/boulder-flatirons.jpg'

const Location = () => {
    return (
        <div className="row location">
            <div className="col s12">
                <img src={flatirons} alt="The Flatirons" />
                <p className="flow-text">RecipeBee is located in Boulder, Colorado, and a proud member of the Front Range community</p>
            </div>
        </div>
    )
}

export default Location
