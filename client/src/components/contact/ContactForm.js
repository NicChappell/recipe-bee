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
            <div className="col s12 transmitting">
                Sending message<Transmitting />
            </div>
        )
    }
    if (success) {
        return (
            <div className="col s12 success">
                Your message has been sent
            </div>
        )
    }
    return (
        <div className="col s12 button">
            <button
                className="btn-flat btn-small black-text grey lighten-2"
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

const Email = props => {
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [email])

    // update state when success changes
    useEffect(() => {
        if (success) {
            setEmail('')
        }
    }, [success])

    return (
        <div className={`input-field col s12 email ${valid ? '' : 'invalid-input'}`}>
            <span>Email Address</span>
            <input
                autoComplete="email"
                name="emailAddress"
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

Email.propTypes = {
    errors: PropTypes.object,
    liftState: PropTypes.func,
    resolveErrors: PropTypes.func,
    success: PropTypes.bool
}

const Message = props => {
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
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

Message.propTypes = {
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

        axios.post('/api/v1/contact', { email, message })
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
        <div className="card-panel contact-form">
            <div className="row left-align">
                <div className="col s12">
                    <h5>Contact Us</h5>
                </div>
                <form>
                    <Email
                        errors={validationErrors}
                        liftState={setEmail}
                        resolveErrors={resolveValidationErrors}
                        success={success}
                    />
                    <Message
                        errors={validationErrors}
                        liftState={setMessage}
                        resolveErrors={resolveValidationErrors}
                        success={success}
                    />
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

export default ContactForm
