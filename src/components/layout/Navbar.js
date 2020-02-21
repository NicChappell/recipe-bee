import React from 'react'
import { Link, NavLink } from 'react-router-dom'

import SignedInLinks from '../auth/SignedInLinks'
import SignedOutLinks from '../auth/SignedOutLinks'

import logo from '../../images/logos/logo.png'

const Navbar = (props) => {
    // destructure props
    const {
        auth,
        openSideNav,
        signOut
    } = props

    const authLinks = auth ? <SignedInLinks signOut={signOut} /> : <SignedOutLinks />

    return (
        <nav className="grey lighten-2">
            <div className="container">
                <div className="nav-wrapper">
                    <ul className="left hide-on-med-and-up">
                        <li><i className="black-text material-icons" onClick={openSideNav}>menu</i></li>
                    </ul>
                    <ul className="left hide-on-small-and-down">
                        <li><NavLink className="black-text" to="/recipes">Recipes</NavLink></li>
                        <li><NavLink className="black-text" to="/shopping-lists">Shopping</NavLink></li>
                    </ul>
                    <Link to="/" className="brand-logo center">
                        <div className="logo">
                            <img src={logo} alt="Recipe Bee" />
                        </div>
                    </Link>
                    {authLinks}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
