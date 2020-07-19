
// import dependencies
import React from 'react'
import PropTypes from 'prop-types'

// import components
import Transmitting from '../utility/Transmitting'

const Button = props => {
    // destructure props
    const {
        handleClick,
        success,
        transmitting
    } = props

    if (transmitting) {
        return (
            <div className="col s12 transmitting">
                Sending password reset email<Transmitting />
            </div>
        )
    }
    if (success) {
        return (
            <div className="col s12 success">
                Password reset email sent
            </div>
        )
    }
    return (
        <div className="col s12 button">
            <button
                className="black-text btn-small btn-flat grey lighten-2"
                onClick={handleClick}
            >
                <i className="material-icons left">email</i>
                Send Password Reset Email
            </button>
        </div>
    )
}

Button.propTypes = {
    handleClick: PropTypes.func,
    success: PropTypes.bool,
    transmitting: PropTypes.bool
}

export default Button
