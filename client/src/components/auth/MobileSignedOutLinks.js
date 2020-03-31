import React from 'react'
import { NavLink } from 'react-router-dom'

const MobileSignedOutLinks = ({ closeSideNav }) => {
    return (
        <ul>
            <li><NavLink className="black-text" to="/sign-in" onClick={closeSideNav}>Sign In</NavLink></li>
            <li><NavLink className="black-text" to="/sign-up" onClick={closeSideNav}>Sign Up</NavLink></li>
        </ul>
    )
}

export default MobileSignedOutLinks
