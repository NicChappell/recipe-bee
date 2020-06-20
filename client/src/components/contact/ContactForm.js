// import dependencies
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import isEmpty from 'lodash.isempty'

// import components
import Transmitting from '../utility/Transmitting'

// import validation
import { validateMessageInput } from '../../validation/contact'

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
                    Sending message<Transmitting />
                </span>
            </div>
        )
    }
    if (success) {
        return (
            <div className="col s12">
                <span className="success">
                    Your message has been sent
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
                <i className="material-icons left">send</i>
                Send Message
            </button>
        </div>
    )
}

Button.propTypes = {
    handleClick: PropTypes.func,
    success: PropTypes.bool,
    transmitting: PropTypes.bool
}

const EmailInput = props => {
    // destructure props
    const {
        errors,
        liftState,
        resolveErrors,
        success
    } = props

    // state hook variables
    const [email, setEmail] = useState('')
    const [valid, setValid] = useState(true)

    const handleBlur = e => e.target.value ? setValid(true) : setValid(false)

    const handleChange = e => {
        // destructure event
        const { value } = e.target

        // update state
        setEmail(value)
        value
            ? setValid(true)
            : setValid(false)
    }

    const handleFocus = () => setValid(true)

    // update state when errors value changes
    useEffect(() => {
        errors.email
            ? setValid(false)
            : setValid(true)
    }, [errors.email])

    // lift state and resolve errors when email changes
    useEffect(() => {
        liftState(email)
        if (errors.email) {
            resolveErrors('email')
        }
    }, [email])

    // update state when success changes
    useEffect(() => {
        if (success) {
            setEmail('')
        }
    }, [success])

    return (
        <div className={`input-field col s12 email ${valid ? '' : 'invalid-input'}`}>
            <span>Email</span>
            <input
                autoComplete="off"
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                onFocus={handleFocus}
                placeholder="Your email address"
                type="text"
                value={email}
            />
            {valid ? null : <span className="error-message">{errors.email}</span>}
        </div>
    )
}

EmailInput.propTypes = {
    errors: PropTypes.object,
    liftState: PropTypes.func,
    resolveErrors: PropTypes.func,
    success: PropTypes.bool
}

const MessageInput = props => {
    // destructure props
    const {
        errors,
        liftState,
        resolveErrors,
        success
    } = props

    // state hook variables
    const [message, setMessage] = useState('')
    const [valid, setValid] = useState(true)

    const handleBlur = e => e.target.value ? setValid(true) : setValid(false)

    const handleChange = e => {
        // destructure event
        const { value } = e.target

        // update state
        setMessage(value)
        value
            ? setValid(true)
            : setValid(false)
    }

    const handleFocus = () => setValid(true)

    // update state when errors value changes
    useEffect(() => {
        errors.message
            ? setValid(false)
            : setValid(true)
    }, [errors.message])

    // lift state and resolve errors when message changes
    useEffect(() => {
        liftState(message)
        if (errors.message) {
            resolveErrors('message')
        }
    }, [message])

    // update state when success changes
    useEffect(() => {
        if (success) {
            setMessage('')
        }
    }, [success])

    return (
        <div className={`input-field col s12 message ${valid ? '' : 'invalid-input'}`}>
            <span>Message</span>
            <textarea
                autoComplete="off"
                className="materialize-textarea"
                name="message"
                onBlur={handleBlur}
                onChange={handleChange}
                onFocus={handleFocus}
                placeholder="What's on your mind?"
                value={message}
            >
            </textarea>
            {valid ? null : <span className="error-message">{errors.message}</span>}
        </div>
    )
}

MessageInput.propTypes = {
    errors: PropTypes.object,
    liftState: PropTypes.func,
    resolveErrors: PropTypes.func,
    success: PropTypes.bool
}

const ContactForm = ({ errors }) => {
    // state hook variables
    const [applicationErrors, setApplicationErrors] = useState({})
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [success, setSuccess] = useState(false)
    const [transmitting, setTransmitting] = useState(false)
    const [validationErrors, setValidationErrors] = useState({})

    const resolveValidationErrors = (...keys) => {
        keys.forEach(key => delete validationErrors[key])
        setValidationErrors(validationErrors)
    }

    const handleClick = () => {
        // collect message data
        const messageData = {
            email,
            message
        }

        // validate user input
        const validate = validateMessageInput(messageData)

        // check for validation errors
        if (!validate.isValid) {
            setValidationErrors(validate.errors)
        } else {
            setTransmitting(true)
            sendEmail(messageData)
        }
    }

    const sendEmail = messageData => {
        // destructure message data
        const {
            email,
            message
        } = messageData

        axios.post('/api/v1/contact/', { email, message })
            .then(() => {
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

    // update state when errors value changes
    useEffect(() => {
        setApplicationErrors(errors)
    }, [errors])

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
                    <h5>Contact Us</h5>
                </div>
                <EmailInput
                    errors={validationErrors}
                    liftState={setEmail}
                    resolveErrors={resolveValidationErrors}
                    success={success}
                />
                <MessageInput
                    errors={validationErrors}
                    liftState={setMessage}
                    resolveErrors={resolveValidationErrors}
                    success={success}
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

export default ContactForm
