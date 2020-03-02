// import dependencies
import React, { useEffect, useState } from 'react'

// import custom hooks
import {
    useEmailValue,
    usePasswordValue
} from '../../helpers/customHooks'

const SignInForm = props => {
    // useState hook variables
    const [authErrors, setAuthErrors] = useState({})

    // custom hook variables
    const email = useEmailValue('')
    const password = usePasswordValue('')

    // destructure props
    const {
        errors,
        signInUser
    } = props

    const handleClick = () => {
        // create payload object
        const payload = {
            email: email.value,
            password: password.value
        }

        // sign in user
        signInUser(payload)
    }

    const handleFocus = e => {
        // destructure event
        const { name } = e.target

        // reset corresponding key in authErrors
        setAuthErrors({ ...authErrors, [name]: '' })
    }

    // update authErrors after errors change
    useEffect(() => {
        setAuthErrors(errors)
    }, [errors])

    // reset authErrors after component mount
    useEffect(() => {
        setAuthErrors({})
    }, [])

    return (
        <div className="col s12">
            <div className="card-panel">
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
                    <div className={`input-field col s12 ${authErrors.password ? "invalid-input" : null}`}>
                        <i className="material-icons prefix">lock</i>
                        <input
                            {...password}
                            name="password"
                            onFocus={handleFocus}
                            placeholder="Password"
                        />
                        {authErrors.password ? <span className="invalid-span">{authErrors.password}</span> : null}
                    </div>
                </div>
                <div className="row center-align">
                    <div className="col s12">
                        <button className="black-text btn orange lighten-2" onClick={handleClick}>Sign In</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignInForm
