import React from 'react'
import { Link } from 'react-router-dom'

const SignedInLinks = props => {
    // destructure props
    const {
        signOutUser,
        user
    } = props

    return (
        <ul className="right hide-on-small-and-down">
            <li><Link className="black-text btn-flat" onClick={signOutUser} to="/">Sign Out</Link></li>
            <li><Link className="btn-floating orange lighten-2" to={`/account/${user.slug}`}><i className="black-text material-icons">person</i></Link></li>
        </ul>
    )
}

export default SignedInLinks
