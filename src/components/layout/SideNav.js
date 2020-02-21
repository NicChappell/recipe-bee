import React from 'react'
import { NavLink } from 'react-router-dom'

import MobileSignedInLinks from '../auth/MobileSignedInLinks'
import MobileSignedOutLinks from '../auth/MobileSignedOutLinks'

import icon from '../../images/icons/icon.png'

const SideNav = (props) => {
    // destructure props
    const {
        auth,
        closeSideNav,
        sideNav,
        signOut
    } = props

    const authLinks = auth ? <MobileSignedInLinks closeSideNav={closeSideNav} signOut={signOut} /> : <MobileSignedOutLinks closeSideNav={closeSideNav} />

    return (
        <div className={`side-nav ${sideNav ? 'open' : 'closed'}`}>
            <div className="control">
                <div className="brand">
                    <img src={icon} alt="Recipe Bee" />
                    RecipeBee
                </div>
                <i className="black-text material-icons" onClick={closeSideNav}>close</i>
            </div>
            <div className="links">
                {authLinks}
                <ul>
                    <li><NavLink className="black-text" to="/recipes" onClick={closeSideNav}>Recipes</NavLink></li>
                    <li><NavLink className="black-text" to="/shopping-lists" onClick={closeSideNav}>Shopping</NavLink></li>
                </ul>
            </div>
        </div>
    )
}

export default SideNav
