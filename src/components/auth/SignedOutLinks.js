import React from 'react'
import { Link } from 'react-router-dom'

function SignedOutLinks(props) {
    const { handleSignIn } = props

    return (
        <ul className="right hide-on-small-and-down">
            <li><Link className="black-text btn-flat" onClick={handleSignIn} to="/sign-in">Sign in</Link></li>
            <li><Link className="black-text btn orange lighten-2" to="/sign-up">Sign Up</Link></li>
        </ul>
    )
}

export default SignedOutLinks
