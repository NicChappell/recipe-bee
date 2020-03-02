// import dependencies
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// import images
import icon from '../images/icons/icon.png'

const NoMatch = () => {
    return (
        <div id="no-match">
            <div className="x">
                <img className="y" src={icon} alt="" />
            </div>
        </div>
    )
}

NoMatch.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(
    mapStateToProps
)(NoMatch)
