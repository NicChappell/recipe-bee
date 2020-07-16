// import dependencies
import React from 'react'

// import images
import logo from '../images/logos/logo.svg'

const NoMatch = () => {
    return (
        <div className="container" id="no-match">
            <div className="row">
                <div className="col s12">
                    <div className="error">
                        <span>4</span>
                        <img src={logo} alt="0" />
                        <span>4</span>
                    </div>
                    <p className="flow-text message">The page you're looking for can't be found</p>
                </div>
            </div>
        </div>
    )
}

export default NoMatch
