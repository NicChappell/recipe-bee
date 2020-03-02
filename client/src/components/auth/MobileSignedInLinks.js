import React from 'react'
import { NavLink } from 'react-router-dom'

const MobileSignedInLinks = (props) => {
    // destructure props
    const {
        closeSideNav,
        signOutUser,
        user
    } = props

    const handleClick = () => {
        // close side nav
        closeSideNav()
        // wait for side nav to close
        setTimeout(() => {
            signOutUser()
        }, 300)
    }

    return (
        <ul>
            <li><NavLink className="black-text" to={`/account/${user.slug}`} onClick={closeSideNav}>My Account</NavLink></li>
            <li><NavLink className="black-text" to="/" onClick={handleClick}>Sign Out</NavLink></li>
        </ul>
    )
}

export default MobileSignedInLinks
