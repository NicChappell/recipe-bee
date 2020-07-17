// import dependencies
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import isEmpty from 'lodash.isempty'
import { Link } from 'react-router-dom'

// import components
import Transmitting from '../utility/Transmitting'

// import validation
import { validateSignIn } from '../../validation/signIn'

const Button = props => {
    // destructure props
    const {
        handleClick,
        transmitting
    } = props

    if (transmitting) {
        return (
            <div className="col s12">
                <span className="transmitting">
                    Please wait<Transmitting />
                </span>
            </div>
        )
    }
    return (
        <div className="col s12 button">
            <button
                className="btn-flat btn-small amber lighten-2"
                onClick={handleClick}
            >
                Sign in
            </button>
            <Link className="btn-flat btn-small transparent" to="/forgot-password">Forgot Password</Link>
        </div>
    )
}

Button.propTypes = {
    handleClick: PropTypes.func,
    transmitting: PropTypes.bool
}

const EmailAddress = props => {
    // destructure props
    const {
        errors,
        liftState,
        resolveErrors
    } = props

    // state hook variables
    const [emailAddress, setEmailAddress] = useState('')
    const [valid, setValid] = useState(true)

    const handleBlur = e => e.target.value ? setValid(true) : setValid(false)

    const handleChange = e => {
        // destructure event
        const { value } = e.target

        // update state
        setEmailAddress(value)
        value
            ? setValid(true)
            : setValid(false)
    }

    const handleFocus = () => setValid(true)

    // update state when errors value changes
    useEffect(() => {
        errors.emailAddress
            ? setValid(false)
            : setValid(true)
    }, [errors.emailAddress])

    // lift state and resolve errors when email changes
    useEffect(() => {
        liftState(emailAddress)
        if (errors.emailAddress) {
            resolveErrors('emailAddress')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [emailAddress])

    return (
        <div className={`input-field col s12 email-address ${!valid ? 'invalid-input' : ''}`}>
            <span>Email Address</span>
            <input
                autoComplete="email"
                name="emailAddress"
                onBlur={handleBlur}
                onChange={handleChange}
                onFocus={handleFocus}
                placeholder="Email address"
                type="text"
                value={emailAddress}
            />
            {valid ? null : <span className="error-message">{errors.emailAddress}</span>}
        </div>
    )
}

EmailAddress.propTypes = {
    errors: PropTypes.object,
    liftState: PropTypes.func,
    resolveErrors: PropTypes.func
}

const Password = props => {
    // destructure props
    const {
        errors,
        liftState,
        resolveErrors
    } = props

    // state hook variables
    const [password, setPassword] = useState('')
    const [valid, setValid] = useState(true)

    const handleBlur = e => e.target.value ? setValid(true) : setValid(false)

    const handleChange = e => {
        // destructure event
        const { value } = e.target

        // update state
        setPassword(value)
        value
            ? setValid(true)
            : setValid(false)
    }

    const handleFocus = () => setValid(true)

    // update state when errors value changes
    useEffect(() => {
        errors.password
            ? setValid(false)
            : setValid(true)
    }, [errors.password])

    // lift state and resolve errors when password changes
    useEffect(() => {
        liftState(password)
        if (errors.password) {
            resolveErrors('password')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [password])

    return (
        <div className={`input-field col s12 password ${!valid ? 'invalid-input' : ''}`}>
            <span>Password</span>
            <input
                autoComplete="current-password"
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                onFocus={handleFocus}
                placeholder="Password"
                type="password"
                value={password}
            />
            {valid ? null : <span className="error-message">{errors.password}</span>}
        </div>
    )
}

Password.propTypes = {
    errors: PropTypes.object,
    liftState: PropTypes.func,
    resolveErrors: PropTypes.func
}

const SignInForm = ({ signInUser }) => {
    // state hook variables
    const [applicationErrors, setApplicationErrors] = useState({})
    const [emailAddress, setEmailAddress] = useState('')
    const [password, setPassword] = useState('')
    const [transmitting, setTransmitting] = useState(false)
    const [validationErrors, setValidationErrors] = useState({})

    const resolveValidationErrors = (...keys) => {
        keys.forEach(key => delete validationErrors[key])
        setValidationErrors(validationErrors)
    }

    const handleClick = () => {
        // create payload
        const payload = {
            emailAddress,
            password
        }

        // validate user input
        const validate = validateSignIn(payload)

        // check for validation errors
        if (!validate.isValid) {
            setValidationErrors(validate.errors)
        } else {
            setTransmitting(true)
            signIn(payload)
        }
    }

    const signIn = payload => {
        axios.post('/api/v1/users/sign-in', payload)
            .then(res => {
                // destructure response
                const { token } = res.data

                // update state
                setTransmitting(false)
                signInUser(token)
            })
            .catch(err => {
                if (err.response.status === 400) {
                    // update state
                    setTransmitting(false)
                    setValidationErrors(err.response.data)
                } else if (err.response.status === 404) {
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
            <p className="error-message center-align">
                An error occurred, please try again later
            </p>
        )
    }

    return (
        <div className="card-panel">
            <div className="row left-align">
                <div className="col s12">
                    <h5>Sign In</h5>
                </div>
                <form>
                    <EmailAddress
                        errors={validationErrors}
                        liftState={setEmailAddress}
                        resolveErrors={resolveValidationErrors}
                    />
                    <Password
                        errors={validationErrors}
                        liftState={setPassword}
                        resolveErrors={resolveValidationErrors}
                    />
                </form>
                <Button
                    handleClick={handleClick}
                    transmitting={transmitting}
                />
            </div>
        </div>
    )
}

SignInForm.propTypes = { signInUser: PropTypes.func }

export default SignInForm
