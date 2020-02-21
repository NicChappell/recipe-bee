import React from 'react'
import { Link } from 'react-router-dom'

const SignedInLinks = ({ signOut }) => {
    return (
        <ul className="right hide-on-small-and-down">
            <li><Link className="black-text btn-flat" onClick={signOut} to="/">Sign Out</Link></li>
            <li><Link className="btn-floating orange lighten-2" to="/account/full-name"><i className="black-text material-icons">person</i></Link></li>
        </ul>
    )
}

export default SignedInLinks
