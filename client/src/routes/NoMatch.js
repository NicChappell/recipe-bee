// import dependencies
import React from 'react'
import PropTypes from 'prop-types'

// import images
import logo from '../images/logos/logo.svg'

const NoMatch = ({ history }) => {
    return (
        <div className="container" id="no-match">
            <div className="row center-align">
                <div className="col s12">
                    <div className="error">
                        <span>4</span>
                        <img src={logo} alt="0" />
                        <span>4</span>
                    </div>
                    <p className="flow-text">The page you're looking for can't be found</p>
                    <button className="btn-flat amber lighten-2" onClick={() => history.goBack()}>Go Back</button>
                </div>
            </div>
        </div>
    )
}

NoMatch.propTypes = { history: PropTypes.object }

export default NoMatch
