// import dependencies
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

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
                Saving new password<Transmitting />
            </div>
        )
    }
    if (success) {
        return (
            <div className="col s12 success">
                <span>Password successfully reset</span>
                <Link className="btn-flat black-text grey lighten-2" to="/sign-in">Sign In</Link>
            </div>
        )
    }
    return (
        <div className="col s12 button">
            <button
                className="btn-flat btn-small black-text grey lighten-2"
                onClick={handleClick}
            >
                <i className="material-icons left">refresh</i>
                Reset Password
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
