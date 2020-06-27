import React from 'react'
import { Link } from 'react-router-dom'

const SignedOutLinks = () => {
    return (
        <ul className="right hide-on-small-and-down">
            <li><Link className="black-text btn-flat" to="/sign-in">Sign In</Link></li>
            <li><Link className="black-text btn-flat amber lighten-2" to="/sign-up">Sign Up</Link></li>
        </ul>
    )
}

export default SignedOutLinks
