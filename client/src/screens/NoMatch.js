// import dependencies
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// import images
import icon from '../images/icons/icon.png'

const NoMatch = ({ utilities }) => {
    // destructure utilities
    const { routerHeight } = utilities

    return (
        <div className="container router" id="no-match" style={{ height: routerHeight }}>
            <div className="x">
                <img className="y" src={icon} alt="" />
            </div>
        </div>
    )
}

NoMatch.propTypes = {
    auth: PropTypes.object.isRequired,
    utilities: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    utilities: state.utilities
})

export default connect(
    mapStateToProps
)(NoMatch)
