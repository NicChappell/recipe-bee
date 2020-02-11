import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'

import SignedInLinks from '../../components/auth/SignedInLinks'
import SignedOutLinks from '../../components/auth/SignedOutLinks'

import logo from '../../images/logos/logo.png'

class Navbar extends Component {
    state = {
        auth: false
    }

    handleSignIn = () => {
        console.log('sign in')

        this.setState({
            auth: true
        })
    }

    handleSignOut = () => {
        console.log('sign out')

        this.setState({
            auth: false
        })
    }

    render() {
        const { auth } = this.state

        const authLinks = auth ? <SignedInLinks handleSignOut={this.handleSignOut} /> : <SignedOutLinks handleSignIn={this.handleSignIn} />

        return (
            <nav className="grey lighten-2">
                <div className="container">
                    <div className="nav-wrapper">
                        <ul className="left hide-on-med-and-down">
                            <li><NavLink className="black-text" to="/">Explore</NavLink></li>
                            <li><NavLink className="black-text" to="/recipes">Recipes</NavLink></li>
                        </ul>
                        <Link to="/" className="brand-logo center">
                            <div className="logo">
                                <img src={logo} alt="Recipe Bee" />
                            </div>
                        </Link>
                        <ul className="right hide-on-med-and-down">
                            {authLinks}
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Navbar
