// import dependencies
import React from 'react'
import { NavLink } from 'react-router-dom'

// import components
import MobileSignedInLinks from '../auth/MobileSignedInLinks'
import MobileSignedOutLinks from '../auth/MobileSignedOutLinks'

// import images
import logo from '../../images/logos/logo.png'

const SideNav = (props) => {
    // destructure props
    const {
        auth,
        closeSideNav,
        open,
        signOutUser
    } = props

    // destructure auth
    const {
        isAuthenticated,
        user
    } = auth

    const authLinks = isAuthenticated ? 
        <MobileSignedInLinks
            closeSideNav={closeSideNav}
            signOutUser={signOutUser}
            user={user}
        /> :
        <MobileSignedOutLinks
            closeSideNav={closeSideNav}
        />

    return (
        <div className={`side-nav ${open ? 'open' : 'closed'}`}>
            <div className="control">
                <div className="brand">
                    <img src={logo} alt="RecipeBee" />
                    RecipeBee
                </div>
                <i className="black-text material-icons" onClick={closeSideNav}>close</i>
            </div>
            <div className="links">
                {authLinks}
                <ul>
                    <li><NavLink className="black-text" to="/" onClick={closeSideNav}>Home</NavLink></li>
                    <li><NavLink className="black-text" to="/recipes" onClick={closeSideNav}>Recipes</NavLink></li>
                </ul>
            </div>
        </div>
    )
}

export default SideNav
