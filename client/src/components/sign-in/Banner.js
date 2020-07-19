// import dependencies
import React from 'react'
import PropTypes from 'prop-types'

const Banner = ({ location }) => {
    // destructure location
    const { state } = location

    // display banner if new user
    if (state && state.newUser) {
        return (
            <div className="card-panel banner">
                <span>Welcome to RecipeBee!</span> <span>Please sign in to continue.</span>
            </div>
        )
    }
    return null
}

Banner.propTypes = { location: PropTypes.object }

export default Banner
