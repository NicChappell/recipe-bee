import React from 'react'
import { Link } from 'react-router-dom'

function SignedInLinks(props) {
    const { handleSignOut } = props

    return (
        <ul className="right">
            <li><Link className="black-text btn-flat" onClick={handleSignOut} to="/">Sign Out</Link></li>
            <li><Link className="btn-floating orange lighten-2" to="/account/fname-lname"><i className="black-text material-icons">person</i></Link></li>
        </ul>
    )
}

export default SignedInLinks
