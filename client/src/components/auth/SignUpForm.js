// import dependencies
import React, { useEffect, useState } from 'react'

// import custom hooks
import {
    useEmailValue,
    usePasswordValue,
    useTextValue
} from '../../helpers/customHooks'

const SignUpForm = props => {
    // useState hook variables
    const [authErrors, setAuthErrors] = useState({})

    // custom hook variables
    const address1 = useTextValue('')
    const address2 = useTextValue('')
    const city = useTextValue('')
    const email = useEmailValue('')
    const firstName = useTextValue('')
    const lastName = useTextValue('')
    const password = usePasswordValue('')
    const password2 = usePasswordValue('')
    const postalCode = useTextValue('')
    const state = useTextValue('')
    const username = useTextValue('')

    // destructure props
    const {
        errors,
        history,
        signUpUser
    } = props

    const handleClick = () => {
        // create payload object
        const payload = {
            address1: address1.value,
            address2: address2.value,
            city: city.value,
            email: email.value,
            firstName: firstName.value,
            lastName: lastName.value,
            password: password.value,
            password2: password2.value,
            postalCode: postalCode.value,
            state: state.value,
            username: username.value
        }

        // sign up user
        signUpUser(payload, history)
    }

    const handleFocus = e => {
        // destructure event
        const { name } = e.target

        // if password or password2
        if (name === 'password' || name === 'password2') {
            // reset password keys in authErrors
            setAuthErrors({ ...authErrors, password: '', password2: '', passwords: '' })
        } else {
            // reset corresponding key in authErrors
            setAuthErrors({ ...authErrors, [name]: '' })
        }
    }

    // update authErrors after change
    useEffect(() => {
        setAuthErrors(errors)
    }, [errors])

    // reset authErrors after mount
    useEffect(() => {
        setAuthErrors({})
    }, [])

    return (
        <div className="col s12">
            <div className="card-panel">
                <div className="row">
                    <div className={`input-field col s12 ${authErrors.email ? 'invalid-input' : null}`}>
                        <i className="material-icons prefix">email</i>
                        <input
                            {...email}
                            name="email"
                            onFocus={handleFocus}
                            placeholder="Email Address"
                        />
                        {authErrors.email ? <span className="invalid-span">{authErrors.email}</span> : null}
                    </div>
                    <div className={`input-field col s12 ${authErrors.username ? 'invalid-input' : null}`}>
                        <i className="material-icons prefix">account_circle</i>
                        <input
                            {...username}
                            name="username"
                            onFocus={handleFocus}
                            placeholder="Username"
                        />
                        {authErrors.username ? <span className="invalid-span">{authErrors.username}</span> : null}
                    </div>
                </div>
                <div className="row">
                    <div className={`input-field col s6 ${authErrors.password ? 'invalid-input' : null}`}>
                        <i className="material-icons prefix">lock</i>
                        <input
                            {...password}
                            name="password"
                            onFocus={handleFocus}
                            placeholder="Password"
                        />
                        {authErrors.password ? <span className="invalid-span">{authErrors.password}</span> : null}
                    </div>
                    <div className={`input-field col s6 ${authErrors.password2 ? 'invalid-input' : null}`}>
                        <input
                            {...password2}
                            name="password2"
                            onFocus={handleFocus}
                            placeholder="Confirm Password"
                        />
                        {authErrors.password2 ? <span className="invalid-span">{authErrors.password2}</span> : null}
                    </div>
                    {authErrors.passwords ? <div className="col s12"><span className="invalid-span">{authErrors.passwords}</span></div> : null}
                </div>
                <div className="row">
                    <div className={`input-field col s6 ${authErrors.firstName ? 'invalid-input' : null}`}>
                        <i className="material-icons prefix">person</i>
                        <input
                            {...firstName}
                            name="firstName"
                            onFocus={handleFocus}
                            placeholder="First Name"
                        />
                        {authErrors.firstName ? <span className="invalid-span">{authErrors.firstName}</span> : null}
                    </div>
                    <div className={`input-field col s6 ${authErrors.lastName ? 'invalid-input' : null}`}>
                        <input
                            {...lastName}
                            name="lastName"
                            onFocus={handleFocus}
                            placeholder="Last Name"
                        />
                        {authErrors.lastName ? <span className="invalid-span">{authErrors.lastName}</span> : null}
                    </div>
                </div>
                <div className="row">
                    <div className={`input-field col s12 ${authErrors.address1 ? 'invalid-input' : null}`}>
                        <i className="material-icons prefix">place</i>
                        <input
                            {...address1}
                            name="address1"
                            onFocus={handleFocus}
                            placeholder="Street Address"
                        />
                        {authErrors.address1 ? <span className="invalid-span">{authErrors.address1}</span> : null}
                    </div>
                    <div className="input-field col s12">
                        <i className="material-icons prefix"></i>
                        <input
                            {...address2}
                            name="lastName"
                            onFocus={handleFocus}
                        />
                    </div>
                    <div className={`input-field col s5 ${authErrors.city ? 'invalid-input' : null}`}>
                        <i className="material-icons prefix"></i>
                        <input
                            {...city}
                            name="city"
                            onFocus={handleFocus}
                            placeholder="City"
                        />
                        {authErrors.city ? <span className="invalid-span">{authErrors.city}</span> : null}
                    </div>
                    <div className={`input-field col s3 ${authErrors.state ? 'invalid-input' : null}`}>
                        <input
                            {...state}
                            name="state"
                            onFocus={handleFocus}
                            placeholder="State"
                        />
                        {authErrors.state ? <span className="invalid-span">{authErrors.state}</span> : null}
                    </div>
                    <div className={`input-field col s4 ${authErrors.postalCode ? 'invalid-input' : null}`}>
                        <input
                            {...postalCode}
                            name="postalCode"
                            onFocus={handleFocus}
                            placeholder="Postal Code"
                        />
                        {authErrors.postalCode ? <span className="invalid-span">{authErrors.postalCode}</span> : null}
                    </div>
                </div>
                <div className="row center-align">
                    <div className="col s12">
                        <button className="black-text btn orange lighten-2" onClick={handleClick}>Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUpForm
