// import dependencies
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import isEmpty from 'lodash.isempty'

// import components
import Transmitting from '../utility/Transmitting'

// import validation
import { validateEmailAddress } from '../../validation/email'

const Button = props => {
    // destructure props
    const {
        handleClick,
        success,
        transmitting
    } = props

    if (transmitting) {
        return (
            <div className="col s12">
                <span className="transmitting">
                    Sending password reset email<Transmitting />
                </span>
            </div>
        )
    }
    if (success) {
        return (
            <div className="col s12">
                <span className="success">
                    Password reset email sent
                </span>
            </div>
        )
    }
    return (
        <div className="col s12">
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

const ForgotPasswordForm = () => {
    // state hook variables
    const [applicationErrors, setApplicationErrors] = useState({})
    const [value, setValue] = useState('')
    const [success, setSuccess] = useState(false)
    const [transmitting, setTransmitting] = useState(false)
    const [validationErrors, setValidationErrors] = useState({})
    console.log(validationErrors)

    const handleBlur = e => {
        // destructure event
        const { value } = e.target

        // update state
        value
            ? setValidationErrors({})
            : setValidationErrors({ email: 'email address is required' })
    }

    const handleChange = e => setValue(e.target.value)

    const handleClick = () => {
        // validate user input
        const validate = validateEmailAddress(value)

        // check for validation errors
        if (!validate.isValid) {
            setValidationErrors(validate.errors)
        } else {
            setTransmitting(true)
            sendEmail(value)
        }
    }

    const handleFocus = () => setValidationErrors({})

    const sendEmail = email => {
        axios.post('/api/v1/users/password/forgot-password', { email })
            .then(res => {
                // update state
                setSuccess(true)
                setTransmitting(false)
            })
            .catch(err => {
                if (err.response.status === 400) {
                    // update state
                    setTransmitting(false)
                    setValidationErrors(err.response.data)
                } else if (err.response.status === 403) {
                    // update state
                    setTransmitting(false)
                    setValidationErrors(err.response.data)
                } else {
                    // update state
                    setApplicationErrors(err)
                    setTransmitting(false)
                }
            })
    }

    if (!isEmpty(applicationErrors)) {
        return (
            <p className="error-message">
                An error occurred, please try again later
            </p>
        )
    }
    return (
        <div className="card-panel">
            <div className="row left-align">
                <div className="col s12">
                    <h5>Forgot Password</h5>
                </div>
                <div className={`input-field col s12 email-input ${isEmpty(validationErrors) ? '' : 'invalid-input'}`}>
                    <span>Email Address</span>
                    <input
                        autoComplete="username"
                        name="forgotPassword"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        type="text"
                        value={value}
                    />
                    {isEmpty(validationErrors) ? null : <span className="error-message">{validationErrors.email}</span>}
                </div>
                <Button
                    handleClick={handleClick}
                    success={success}
                    transmitting={transmitting}
                />
            </div>
        </div>
    )
}

export default ForgotPasswordForm
