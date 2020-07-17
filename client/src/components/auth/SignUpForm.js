// import dependencies
import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import axios from 'axios'
import isEmpty from 'lodash.isempty'

// import components
import Transmitting from '../utility/Transmitting'

// import validation
import { validateSignUp } from '../../validation/signUp'

const Address1 = props => {
    // destructure props
    const {
        errors,
        liftState,
        resolveErrors
    } = props

    // state hook variables
    const [address1, setAddress1] = useState('')
    const [valid, setValid] = useState(true)

    const handleBlur = e => e.target.value ? setValid(true) : setValid(false)

    const handleChange = e => {
        // destructure event
        const { value } = e.target

        // update state
        setAddress1(value)
        value
            ? setValid(true)
            : setValid(false)
    }

    const handleFocus = () => setValid(true)

    // update state when errors value changes
    useEffect(() => {
        errors.address1
            ? setValid(false)
            : setValid(true)
    }, [errors.address1])

    // lift state and resolve errors when address changes
    useEffect(() => {
        liftState(address1)
        if (errors.address1) {
            resolveErrors('address1')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [address1])

    return (
        <div className={`input-field col s12 address ${!valid ? 'invalid-input' : ''}`}>
            <span>Street Address</span>
            <input
                autoComplete="address-line1"
                name="address1"
                onBlur={handleBlur}
                onChange={handleChange}
                onFocus={handleFocus}
                placeholder="Street address"
                type="text"
                value={address1}
            />
            {valid ? null : <span className="error-message">{errors.address1}</span>}
        </div>
    )
}

Address1.propTypes = {
    errors: PropTypes.object,
    liftState: PropTypes.func,
    resolveErrors: PropTypes.func
}

const Address2 = ({ liftState }) => (
    <div className="input-field col s12 address">
        <input
            autoComplete="address-line2"
            name="address2"
            onChange={e => liftState(e.targetvalue)}
            type="text"
        />
    </div>
)

Address2.propTypes = { liftState: PropTypes.func }

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
                className="black-text btn-small btn-flat amber lighten-2"
                onClick={handleClick}
            >
                Sign up
            </button>
        </div>
    )
}

Button.propTypes = {
    handleClick: PropTypes.func,
    transmitting: PropTypes.bool
}

const City = props => {
    // destructure props
    const {
        errors,
        liftState,
        resolveErrors
    } = props

    // state hook variables
    const [city, setCity] = useState('')
    const [valid, setValid] = useState(true)

    const handleBlur = e => e.target.value ? setValid(true) : setValid(false)

    const handleChange = e => {
        // destructure event
        const { value } = e.target

        // update state
        setCity(value)
        value
            ? setValid(true)
            : setValid(false)
    }

    const handleFocus = () => setValid(true)

    // update state when errors value changes
    useEffect(() => {
        errors.city
            ? setValid(false)
            : setValid(true)
    }, [errors.city])

    // lift state and resolve errors when city changes
    useEffect(() => {
        liftState(city)
        if (errors.city) {
            resolveErrors('city')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [city])

    return (
        <div className={`input-field col s12 m6 city ${!valid ? 'invalid-input' : ''}`}>
            <span>City</span>
            <input
                autoComplete="address-level2"
                name="city"
                onBlur={handleBlur}
                onChange={handleChange}
                onFocus={handleFocus}
                placeholder="City"
                type="text"
                value={city}
            />
            {valid ? null : <span className="error-message">{errors.city}</span>}
        </div>
    )
}

City.propTypes = {
    errors: PropTypes.object,
    liftState: PropTypes.func,
    resolveErrors: PropTypes.func
}

const Email = props => {
    // destructure props
    const {
        errors,
        liftState,
        resolveErrors
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

    return (
        <div className={`input-field col s12 email ${!valid ? 'invalid-input' : ''}`}>
            <span>Email Address</span>
            <input
                autoComplete="email"
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                onFocus={handleFocus}
                placeholder="Email Address"
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
    resolveErrors: PropTypes.func
}

const FirstName = props => {
    // destructure props
    const {
        errors,
        liftState,
        resolveErrors
    } = props

    // state hook variables
    const [firstName, setFirstName] = useState('')
    const [valid, setValid] = useState(true)

    const handleBlur = e => e.target.value ? setValid(true) : setValid(false)

    const handleChange = e => {
        // destructure event
        const { value } = e.target

        // update state
        setFirstName(value)
        value
            ? setValid(true)
            : setValid(false)
    }

    const handleFocus = () => setValid(true)

    // update state when errors value changes
    useEffect(() => {
        errors.firstName
            ? setValid(false)
            : setValid(true)
    }, [errors.firstName])

    // lift state and resolve errors when name changes
    useEffect(() => {
        liftState(firstName)
        if (errors.firstName) {
            resolveErrors('firstName')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [firstName])

    return (
        <div className={`input-field col s6 first-name ${!valid ? 'invalid-input' : ''}`}>
            <span>First Name</span>
            <input
                autoComplete="given-name"
                name="firstName"
                onBlur={handleBlur}
                onChange={handleChange}
                onFocus={handleFocus}
                placeholder="First name"
                type="text"
                value={firstName}
            />
            {valid ? null : <span className="error-message">{errors.firstName}</span>}
        </div>
    )
}

FirstName.propTypes = {
    errors: PropTypes.object,
    liftState: PropTypes.func,
    resolveErrors: PropTypes.func
}

const LastName = props => {
    // destructure props
    const {
        errors,
        liftState,
        resolveErrors
    } = props

    // state hook variables
    const [lastName, setLastName] = useState('')
    const [valid, setValid] = useState(true)

    const handleBlur = e => e.target.value ? setValid(true) : setValid(false)

    const handleChange = e => {
        // destructure event
        const { value } = e.target

        // update state
        setLastName(value)
        value
            ? setValid(true)
            : setValid(false)
    }

    const handleFocus = () => setValid(true)

    // update state when errors value changes
    useEffect(() => {
        errors.lastName
            ? setValid(false)
            : setValid(true)
    }, [errors.lastName])

    // lift state and resolve errors when name changes
    useEffect(() => {
        liftState(lastName)
        if (errors.lastName) {
            resolveErrors('lastName')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lastName])

    return (
        <div className={`input-field col s6 last-name ${!valid ? 'invalid-input' : ''}`}>
            <span>Last Name</span>
            <input
                autoComplete="family-name"
                name="lastName"
                onBlur={handleBlur}
                onChange={handleChange}
                onFocus={handleFocus}
                placeholder="Last name"
                type="text"
                value={lastName}
            />
            {valid ? null : <span className="error-message">{errors.lastName}</span>}
        </div>
    )
}

LastName.propTypes = {
    errors: PropTypes.object,
    liftState: PropTypes.func,
    resolveErrors: PropTypes.func
}

const Password1 = props => {
    // destructure props
    const {
        errors,
        liftState,
        resolveErrors
    } = props

    // state hook variables
    const [password1, setPassword1] = useState('')
    const [valid, setValid] = useState(true)

    const handleBlur = e => e.target.value ? setValid(true) : setValid(false)

    const handleChange = e => {
        // destructure event
        const { value } = e.target

        // update state
        setPassword1(value)
        value
            ? setValid(true)
            : setValid(false)
    }

    const handleFocus = () => setValid(true)

    // update state when errors value changes
    useEffect(() => {
        errors.password1
            ? setValid(false)
            : setValid(true)
    }, [errors.password1])

    // lift state and resolve errors when password changes
    useEffect(() => {
        liftState(password1)
        if (errors.password1) {
            resolveErrors('password1')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [password1])

    return (
        <div className={`input-field col s12 m6 password ${!valid ? 'invalid-input' : ''}`}>
            <span>Password</span>
            <input
                autoComplete="new-password"
                name="password1"
                onBlur={handleBlur}
                onChange={handleChange}
                onFocus={handleFocus}
                placeholder="Password"
                type="password"
                value={password1}
            />
            {valid ? null : <span className="error-message">{errors.password1}</span>}
        </div>
    )
}

Password1.propTypes = {
    errors: PropTypes.object,
    liftState: PropTypes.func,
    resolveErrors: PropTypes.func
}

const Password2 = props => {
    // destructure props
    const {
        errors,
        liftState,
        resolveErrors
    } = props

    // state hook variables
    const [password2, setPassword2] = useState('')
    const [valid, setValid] = useState(true)

    const handleBlur = e => e.target.value ? setValid(true) : setValid(false)

    const handleChange = e => {
        // destructure event
        const { value } = e.target

        // update state
        setPassword2(value)
        value
            ? setValid(true)
            : setValid(false)
    }

    const handleFocus = () => setValid(true)

    // update state when errors value changes
    useEffect(() => {
        errors.password2
            ? setValid(false)
            : setValid(true)
    }, [errors.password2])

    // lift state and resolve errors when password changes
    useEffect(() => {
        liftState(password2)
        if (errors.password2) {
            resolveErrors('password2')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [password2])

    return (
        <div className={`input-field col s12 m6 password ${!valid ? 'invalid-input' : ''}`}>
            <span>Confirm Password</span>
            <input
                autoComplete="new-password"
                name="password2"
                onBlur={handleBlur}
                onChange={handleChange}
                onFocus={handleFocus}
                placeholder="Confirm password"
                type="password"
                value={password2}
            />
            {valid ? null : <span className="error-message">{errors.password2}</span>}
        </div>
    )
}

Password2.propTypes = {
    errors: PropTypes.object,
    liftState: PropTypes.func,
    resolveErrors: PropTypes.func
}

const PostalCode = props => {
    // destructure props
    const {
        errors,
        liftState,
        resolveErrors
    } = props

    // state hook variables
    const [postalCode, setPostalCode] = useState('')
    const [valid, setValid] = useState(true)

    const handleBlur = e => e.target.value ? setValid(true) : setValid(false)

    const handleChange = e => {
        // destructure event
        const { value } = e.target

        // update state
        setPostalCode(value)
        value
            ? setValid(true)
            : setValid(false)
    }

    const handleFocus = () => setValid(true)

    // update state when errors value changes
    useEffect(() => {
        errors.postalCode
            ? setValid(false)
            : setValid(true)
    }, [errors.postalCode])

    // lift state and resolve errors when postal code changes
    useEffect(() => {
        liftState(postalCode)
        if (errors.postalCode) {
            resolveErrors('postalCode')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [postalCode])

    return (
        <div className={`input-field col s8 m4 postal-code ${!valid ? 'invalid-input' : ''}`}>
            <span>Postal Code</span>
            <input
                autoComplete="postal-code"
                name="postalCode"
                onBlur={handleBlur}
                onChange={handleChange}
                onFocus={handleFocus}
                placeholder="Postal code"
                type="text"
                value={postalCode}
            />
            {valid ? null : <span className="error-message">{errors.postalCode}</span>}
        </div>
    )
}

PostalCode.propTypes = {
    errors: PropTypes.object,
    liftState: PropTypes.func,
    resolveErrors: PropTypes.func
}

const State = props => {
    // destructure props
    const {
        errors,
        liftState,
        resolveErrors
    } = props

    // state hook variables
    const [state, setState] = useState('')
    const [valid, setValid] = useState(true)

    const handleBlur = e => e.target.value ? setValid(true) : setValid(false)

    const handleChange = e => {
        // destructure event
        const { value } = e.target

        // update state
        setState(value)
        value
            ? setValid(true)
            : setValid(false)
    }

    const handleFocus = () => setValid(true)

    // update state when errors value changes
    useEffect(() => {
        errors.state
            ? setValid(false)
            : setValid(true)
    }, [errors.state])

    // lift state and resolve errors when state changes
    useEffect(() => {
        liftState(state)
        if (errors.state) {
            resolveErrors('state')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state])

    return (
        <div className={`input-field col s4 m2 state ${!valid ? 'invalid-input' : ''}`}>
            <span>State</span>
            <input
                autoComplete="address-level1"
                name="state"
                onBlur={handleBlur}
                onChange={handleChange}
                onFocus={handleFocus}
                placeholder="State"
                type="text"
                value={state}
            />
            {valid ? null : <span className="error-message">{errors.state}</span>}
        </div>
    )
}

State.propTypes = {
    errors: PropTypes.object,
    liftState: PropTypes.func,
    resolveErrors: PropTypes.func
}

const Username = props => {
    // destructure props
    const {
        errors,
        liftState,
        resolveErrors
    } = props

    // state hook variables
    const [username, setUsername] = useState('')
    const [valid, setValid] = useState(true)

    const handleBlur = e => e.target.value ? setValid(true) : setValid(false)

    const handleChange = e => {
        // destructure event
        const { value } = e.target

        // update state
        setUsername(value)
        value
            ? setValid(true)
            : setValid(false)
    }

    const handleFocus = () => setValid(true)

    // update state when errors value changes
    useEffect(() => {
        errors.username
            ? setValid(false)
            : setValid(true)
    }, [errors.username])

    // lift state and resolve errors when username changes
    useEffect(() => {
        liftState(username)
        if (errors.username) {
            resolveErrors('username')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [username])

    return (
        <div className={`input-field col s12 username ${!valid ? 'invalid-input' : ''}`}>
            <span>Username</span>
            <input
                autoComplete="username"
                name="username"
                onBlur={handleBlur}
                onChange={handleChange}
                onFocus={handleFocus}
                placeholder="Username"
                type="text"
                value={username}
            />
            {valid ? null : <span className="error-message">{errors.username}</span>}
        </div>
    )
}

Username.propTypes = {
    errors: PropTypes.object,
    liftState: PropTypes.func,
    resolveErrors: PropTypes.func
}

const SignUpForm = ({ history }) => {
    // state hook variables
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')
    const [applicationErrors, setApplicationErrors] = useState({})
    const [city, setCity] = useState('')
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [redirect, setRedirect] = useState(false)
    const [state, setState] = useState('')
    const [transmitting, setTransmitting] = useState(false)
    const [username, setUsername] = useState('')
    const [validationErrors, setValidationErrors] = useState({})

    const resolveValidationErrors = (...keys) => {
        keys.forEach(key => delete validationErrors[key])
        setValidationErrors(validationErrors)
    }

    const handleClick = () => {
        // create payload
        const payload = {
            address1,
            address2,
            city,
            email,
            firstName,
            lastName,
            password1,
            password2,
            postalCode,
            state,
            username
        }
        console.log(payload)

        // validate user input
        const validate = validateSignUp(payload)
        console.log(validate)

        // check for validation errors
        if (!validate.isValid) {
            setValidationErrors(validate.errors)
        } else {
            setTransmitting(true)
            signUp(payload)
        }
    }

    const signUp = payload => {
        axios.post('/api/v1/users/sign-up', payload)
            .then(res => {
                // update state
                setTransmitting(false)
                setRedirect(true)
            })
            .catch(err => {
                if (err.response.status === 400) {
                    console.log(err.response.data)
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

    if (redirect) {
        return (
            <Redirect
                to={{
                    pathname: "/sign-in",
                    state: { newUser: true }
                }}
            />
        )
    }

    return (
        <div className="card-panel">
            <div className="row left-align">
                <div className="col s12">
                    <h5>Sign Up</h5>
                </div>
                <Email
                    errors={validationErrors}
                    liftState={setEmail}
                    resolveErrors={resolveValidationErrors}
                />
                <Username
                    errors={validationErrors}
                    liftState={setUsername}
                    resolveErrors={resolveValidationErrors}
                />
                <Password1
                    errors={validationErrors}
                    liftState={setPassword1}
                    resolveErrors={resolveValidationErrors}
                />
                <Password2
                    errors={validationErrors}
                    liftState={setPassword2}
                    resolveErrors={resolveValidationErrors}
                />
                <FirstName
                    errors={validationErrors}
                    liftState={setFirstName}
                    resolveErrors={resolveValidationErrors}
                />
                <LastName
                    errors={validationErrors}
                    liftState={setLastName}
                    resolveErrors={resolveValidationErrors}
                />
                <Address1
                    errors={validationErrors}
                    liftState={setAddress1}
                    resolveErrors={resolveValidationErrors}
                />
                <Address2 liftState={setAddress2} />
                <City
                    errors={validationErrors}
                    liftState={setCity}
                    resolveErrors={resolveValidationErrors}
                />
                <State
                    errors={validationErrors}
                    liftState={setState}
                    resolveErrors={resolveValidationErrors}
                />
                <PostalCode
                    errors={validationErrors}
                    liftState={setPostalCode}
                    resolveErrors={resolveValidationErrors}
                />
                <Button
                    handleClick={handleClick}
                    transmitting={transmitting}
                />
            </div>
        </div>
    )
}

SignUpForm.propTypes = { history: PropTypes.object }

export default SignUpForm
