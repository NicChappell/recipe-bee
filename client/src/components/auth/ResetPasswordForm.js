// import dependencies
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import axios from 'axios'
import isEmpty from 'lodash.isempty'

// import components
import NewPassword1 from './NewPassword1'
import NewPassword2 from './NewPassword2'
import Preloader from '../utility/Preloader'
import Transmitting from '../utility/Transmitting'

// import validation
import { validateResetPasswordInput } from '../../validation/password'

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
                    Saving new password<Transmitting />
                </span>
            </div>
        )
    }
    if (success) {
        return (
            <div className="col s12">
                <span className="success">
                    Password successfully reset
                </span>
                <Link className="black-text btn-flat grey lighten-2" to="/sign-in">Sign In</Link>
            </div>
        )
    }
    return (
        <div className="col s12">
            <button
                className="black-text btn-small btn-flat grey lighten-2"
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

const Inputs = props => {
    // destructure props
    const {
        disabled,
        newPassword1,
        newPassword2,
        resolveValidationErrors,
        setNewPassword1,
        setNewPassword2,
        userEmail,
        validationErrors
    } = props

    return (
        <div className="col s12 password-inputs">
            <form>
                <input
                    autoComplete="username"
                    className="hide"
                    name="username"
                    readOnly={true}
                    type="text"
                    value={userEmail}
                />
                <NewPassword1
                    disabled={disabled}
                    errors={validationErrors}
                    liftState={setNewPassword1}
                    resolveErrors={resolveValidationErrors}
                    value={newPassword1}
                />
                <NewPassword2
                    disabled={disabled}
                    errors={validationErrors}
                    liftState={setNewPassword2}
                    resolveErrors={resolveValidationErrors}
                    value={newPassword2}
                />
            </form>
        </div>
    )
}

Inputs.propTypes = {
    disabled: PropTypes.bool,
    newPassword1: PropTypes.string,
    newPassword2: PropTypes.string,
    resolveValidationErrors: PropTypes.func,
    setNewPassword1: PropTypes.func,
    setNewPassword2: PropTypes.func,
    userEmail: PropTypes.string,
    validationErrors: PropTypes.object
}

const ResetPasswordForm = props => {
    // destructure props
    const {
        errors,
        token
    } = props

    // state hook variables
    const [applicationErrors, setApplicationErrors] = useState({})
    const [newPassword1, setNewPassword1] = useState('')
    const [newPassword2, setNewPassword2] = useState('')
    const [success, setSuccess] = useState(false)
    const [transmitting, setTransmitting] = useState(false)
    const [user, setUser] = useState({})
    const [validationErrors, setValidationErrors] = useState({})

    const resolveValidationErrors = (...keys) => {
        keys.forEach(key => delete validationErrors[key])
        setValidationErrors(validationErrors)
    }

    const handleClick = () => {
        // collect password data
        const passwordData = {
            userId: user.id,
            newPassword1,
            newPassword2
        }

        // validate user input
        const validate = validateResetPasswordInput(passwordData)

        // check for validation errors
        if (!validate.isValid) {
            setValidationErrors(validate.errors)
        } else {
            // update state
            setTransmitting(true)

            // reset password
            axios.post('/api/v1/users/password/reset-password', passwordData)
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
                    } else {
                        // update state
                        setApplicationErrors(err)
                        setTransmitting(false)
                    }
                })
        }
    }

    // update state if validation errors
    useEffect(() => setTransmitting(false), [validationErrors])

    // update state if application errors
    useEffect(() => {
        setApplicationErrors(errors)
        setTransmitting(false)
    }, [errors])

    // verfiy token when component mounts
    useEffect(() => {
        axios.post('/api/v1/users/password/verify-token', { token })
            .then(res => {
                // destructure response
                const { user } = res.data

                // update state
                setUser(user)
            })
            .catch(err => setApplicationErrors(err))
    }, [])

    if (!isEmpty(applicationErrors)) {
        return (
            <p className="error-message">
                An error occurred, please try again later
            </p>
        )
    }
    if (isEmpty(user)) {
        return (
            <p className="error-message">
                Password reset link is invalid or has expired
            </p>
        )
    }
    if (!isEmpty(user)) {
        return (
            <div className="card-panel">
                <div className="row left-align">
                    <div className="col s12">
                        <h5>Reset Password</h5>
                    </div>
                    <Inputs
                        disabled={success}
                        newPassword1={newPassword1}
                        newPassword2={newPassword2}
                        resolveValidationErrors={resolveValidationErrors}
                        setNewPassword1={setNewPassword1}
                        setNewPassword2={setNewPassword2}
                        userEmail={user.email}
                        validationErrors={validationErrors}
                    />
                    <Button
                        handleClick={handleClick}
                        success={success}
                        transmitting={transmitting}
                    />
                </div>
            </div>
        )
    }
    return <Preloader />
}

ResetPasswordForm.propTypes = {
    errors: PropTypes.object,
    token: PropTypes.string
}

export default ResetPasswordForm
