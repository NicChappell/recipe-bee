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
    const email = useEmailValue('')
    const firstName = useTextValue('')
    const lastName = useTextValue('')
    const password = usePasswordValue('')
    const password2 = usePasswordValue('')

    // destructure props
    const {
        errors,
        history,
        signUpUser
    } = props

    const handleClick = () => {
        // create payload object
        const payload = {
            email: email.value,
            firstName: firstName.value,
            lastName: lastName.value,
            password: password.value,
            password2: password2.value
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
                    <div className={`input-field col s6 ${authErrors.firstName ? "invalid-input" : null}`}>
                        <i className="material-icons prefix">account_circle</i>
                        <input
                            {...firstName}
                            name="firstName"
                            onFocus={handleFocus}
                            placeholder="First Name"
                        />
                        {authErrors.firstName ? <span className="invalid-span">{authErrors.firstName}</span> : null}
                    </div>
                    <div className={`input-field col s6 ${authErrors.lastName ? "invalid-input" : null}`}>
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
                    <div className={`input-field col s12 ${authErrors.email ? "invalid-input" : null}`}>
                        <i className="material-icons prefix">email</i>
                        <input
                            {...email}
                            name="email"
                            onFocus={handleFocus}
                            placeholder="Email Address"
                        />
                        {authErrors.email ? <span className="invalid-span">{authErrors.email}</span> : null}
                    </div>
                </div>
                <div className="row">
                    <div className={`input-field col s6 ${authErrors.password ? "invalid-input" : null}`}>
                        <i className="material-icons prefix">lock</i>
                        <input
                            {...password}
                            name="password"
                            onFocus={handleFocus}
                            placeholder="Password"
                        />
                        {authErrors.password ? <span className="invalid-span">{authErrors.password}</span> : null}
                    </div>
                    <div className={`input-field col s6 ${authErrors.password2 ? "invalid-input" : null}`}>
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
