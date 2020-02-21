import React from 'react'
import { Redirect } from 'react-router-dom'

import SignInForm from '../components/auth/SignInForm'

function SignIn(props) {
    // destructure props
    const {
        auth,
        signIn
    } = props

    if (!auth) {
        return (
            <div className="container">
                <div className="row">
                    <SignInForm signIn={signIn} />
                </div>
            </div>
        )
    }
    return <Redirect to="/" />
}

export default SignIn
