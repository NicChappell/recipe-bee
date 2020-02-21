import React from 'react'
import { NavLink } from 'react-router-dom'

const MobileSignedInLinks = (props) => {
    // destructure props
    const {
        closeSideNav,
        signOut
    } = props

    const handleSignOutClick = () => {
        // close side nav
        closeSideNav()
        // wait for side nav to close
        setTimeout(() => {
            signOut()
        }, 300)
    }

    return (
        <ul>
            <li><NavLink className="black-text" to="/account/full-name" onClick={closeSideNav}>My Account</NavLink></li>
            <li><NavLink className="black-text" to="/" onClick={handleSignOutClick}>Sign Out</NavLink></li>
        </ul>
    )
}

export default MobileSignedInLinks
