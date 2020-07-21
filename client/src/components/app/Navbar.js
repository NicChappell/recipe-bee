// import dependencies
import React from 'react'
import {
    Link,
    NavLink
} from 'react-router-dom'
import PropTypes from 'prop-types'

// import images
import logo from '../../images/logos/logo.svg'

const SignedInLinks = props => {
    // destructure props
    const {
        signOutUser,
        user
    } = props

    return (
        <ul className="right hide-on-small-and-down">
            <li>
                <Link className="black-text" onClick={signOutUser} to="/">
                    Sign Out
                </Link>
            </li>
            <li>
                <Link className="btn-floating amber lighten-2 z-depth-0" to={`/account/${user.slug}`}>
                    <i className="black-text material-icons">person</i>
                </Link>
            </li>
        </ul>
    )
}

SignedInLinks.propTypes = {
    signOutUser: PropTypes.func,
    user: PropTypes.object
}

const SignedOutLinks = () => {
    return (
        <ul className="right hide-on-small-and-down">
            <li>
                <NavLink className="black-text" to="/sign-in">
                    Sign In
                </NavLink>
            </li>
            <li>
                <Link className="black-text btn-flat amber lighten-2" to="/sign-up">
                    Sign Up
                </Link>
            </li>
        </ul>
    )
}

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

    return (
        <nav>
            <div className="container">
                <div className="row">
                    <div className="col s12">
                        <ul className="left hide-on-med-and-up">
                            <li>
                                <i className="black-text material-icons" onClick={openSideNav}>menu</i>
                            </li>
                        </ul>
                        <ul className="left hide-on-small-and-down">
                            <li>
                                <NavLink className="black-text" exact to="/">
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className="black-text" exact to="/recipes">
                                    Recipes
                                </NavLink>
                            </li>
                        </ul>
                        <Link to="/" className="brand-logo center">
                            <div className="logo">
                                <img src={logo} alt="RecipeBee" />
                            </div>
                        </Link>
                        {
                            isAuthenticated
                                ? <SignedInLinks user={user} signOutUser={signOutUser} />
                                : <SignedOutLinks />
                        }
                    </div>
                </div>
            </div>
        </nav>
    )
}

SignedInLinks.propTypes = {
    auth: PropTypes.object,
    openSideNav: PropTypes.func,
    signOutUser: PropTypes.func
}

export default Navbar
