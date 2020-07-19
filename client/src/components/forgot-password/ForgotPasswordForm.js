// import dependencies
import React, { useState } from 'react'
import axios from 'axios'
import isEmpty from 'lodash.isempty'

// import components
import Button from './Button'

// import validation
import { validateEmailAddress } from '../../validation/email'

const ForgotPasswordForm = () => {
    // state hook variables
    const [applicationErrors, setApplicationErrors] = useState({})
    const [value, setValue] = useState('')
    const [success, setSuccess] = useState(false)
    const [transmitting, setTransmitting] = useState(false)
    const [validationErrors, setValidationErrors] = useState({})

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
        <div className="card-panel forgot-password-form">
            <div className="row left-align">
                <div className="col s12">
                    <h5>Forgot Password</h5>
                </div>
                <form>
                    <div className={`input-field col s12 email-input ${isEmpty(validationErrors) ? '' : 'invalid-input'}`}>
                        <span>Email Address</span>
                        <input
                            autoComplete="email"
                            name="emailAddress"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            placeholder="Email address"
                            type="text"
                            value={value}
                        />
                        {isEmpty(validationErrors) ? null : <span className="error-message">{validationErrors.email}</span>}
                    </div>
                </form>
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
