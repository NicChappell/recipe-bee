// import dependencies
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

// import components
import NewPassword1 from './NewPassword1'
import NewPassword2 from './NewPassword2'
import Transmitting from '../utility/Transmitting'

// import validation
import { validateResetPasswordInput } from '../../validation/password'

const Buttons = props => {
    // destructure props
    const {
        disabled,
        handleGoBackClick,
        handleConfirmChangeClick,
        handleChangeClick,
        success,
        transmitting
    } = props

    if (!disabled) {
        return (
            <div className="col s12 confirm-change">
                <button
                    className="black-text btn-small btn-flat grey lighten-2"
                    onClick={handleGoBackClick}
                >
                    <i className="material-icons left">undo</i>
                    Go Back
                </button>
                <button
                    className="black-text btn-small btn-flat light-green lighten-2"
                    onClick={handleConfirmChangeClick}
                >
                    <i className="material-icons left">save</i>
                    Change Password
                </button>
            </div>
        )
    }
    if (transmitting) {
        return (
            <div className="col s12 transmitting">
                Saving changes<Transmitting />
            </div>
        )
    }
    if (success) {
        return (
            <div className="col s12 success">
                Password successfully reset
            </div>
        )
    }
    return (
        <div className="col s12 change">
            <button
                className="black-text btn-small btn-flat grey lighten-2"
                onClick={handleChangeClick}
            >
                Change Password
            </button>
        </div>
    )
}

Buttons.propTypes = {
    disabled: PropTypes.bool,
    handleGoBackClick: PropTypes.func,
    handleConfirmChangeClick: PropTypes.func,
    handleChangeClick: PropTypes.func,
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

    if (!disabled) {
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
    return null
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

const ChangePassword = props => {
    // destructure props
    const {
        applicationErrors,
        setApplicationErrors,
        user
    } = props

    // state hook variables
    const [disabled, setDisabled] = useState(true)
    const [newPassword1, setNewPassword1] = useState('')
    const [newPassword2, setNewPassword2] = useState('')
    const [success, setSuccess] = useState(false)
    const [transmitting, setTransmitting] = useState(false)
    const [validationErrors, setValidationErrors] = useState({})

    const resolveValidationErrors = (...keys) => {
        keys.forEach(key => delete validationErrors[key])
        setValidationErrors(validationErrors)
    }

    const handleChangeClick = () => setDisabled(false)

    const handleConfirmChangeClick = () => {
        // collect password data
        const passwordData = {
            userId: user._id,
            newPassword1,
            newPassword2
        }

        // validate user input
        const validate = validateResetPasswordInput(passwordData)

        // check for validation errors
        if (!validate.isValid) {
            setValidationErrors(validate.errors)
        }
        else {
            // update state
            setDisabled(true)
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

    const handleGoBackClick = () => {
        // update state
        setDisabled(true)
        setNewPassword1('')
        setNewPassword2('')
        setSuccess(false)
        setTransmitting(false)
        setValidationErrors({})
    }

    // update state if errors
    useEffect(() => setTransmitting(false), [applicationErrors, validationErrors])

    return (
        <div className="row change-password">
            <div className="col s12">
                <h5>Password</h5>
            </div>
            <Inputs
                disabled={disabled}
                newPassword1={newPassword1}
                newPassword2={newPassword2}
                resolveValidationErrors={resolveValidationErrors}
                setNewPassword1={setNewPassword1}
                setNewPassword2={setNewPassword2}
                userEmail={user.email}
                validationErrors={validationErrors}
            />
            <Buttons
                disabled={disabled}
                handleChangeClick={handleChangeClick}
                handleConfirmChangeClick={handleConfirmChangeClick}
                handleGoBackClick={handleGoBackClick}
                success={success}
                transmitting={transmitting}
            />
        </div>
    )
}

ChangePassword.propTypes = {
    applicationErrors: PropTypes.object,
    setApplicationErrors: PropTypes.func,
    user: PropTypes.object
}

export default ChangePassword
