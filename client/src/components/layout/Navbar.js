// import dependencies
import React from 'react'
import {
    Link,
    NavLink
} from 'react-router-dom'

// import components
import SignedInLinks from '../auth/SignedInLinks'
import SignedOutLinks from '../auth/SignedOutLinks'

// import images
import logo from '../../images/logos/logo.svg'

const Navbar = (props) => {
    // destructure props
    const {
        auth,
        openSideNav,
        signOutUser
    } = props

    // destructure auth
    const {
        isAuthenticated,
        user
    } = auth

    const authLinks = isAuthenticated ? <SignedInLinks user={user} signOutUser={signOutUser} /> : <SignedOutLinks />

    return (
        <nav className="grey lighten-2">
            <div className="container">
                <div className="row">
                    <div className="col s12">
                        <ul className="left hide-on-med-and-up">
                            <li><i className="black-text material-icons" onClick={openSideNav}>menu</i></li>
                        </ul>
                        <ul className="left hide-on-small-and-down">
                            <li><NavLink className="black-text" exact to="/">Home</NavLink></li>
                            <li><NavLink className="black-text" exact to="/recipes">Recipes</NavLink></li>
                        </ul>
                        <Link to="/" className="brand-logo center">
                            <div className="logo">
                                <img src={logo} alt="RecipeBee" />
                            </div>
                        </Link>
                        {authLinks}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
