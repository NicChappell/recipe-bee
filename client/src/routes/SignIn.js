// import dependencies
import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// import actions
import { signInUser } from '../actions/authActions'

// import components
import SignInForm from '../components/auth/SignInForm'

const Banner = ({ location }) => {
    // destructure location
    const { state } = location

    // display banner if new user
    if (state && state.newUser) {
        return (
            <div className="card-panel new-user">
                <span>Welcome to RecipeBee!</span> <span>Please sign in to continue.</span>
            </div>
        )
    }
    return null
}

Banner.propTypes = { location: PropTypes.object }

const SignIn = props => {
    // destructure props
    const {
        auth,
        location,
        signInUser
    } = props

    // destructure auth
    const {
        isAuthenticated,
        user
    } = auth

    // allow access if user is not authenticated
    if (!isAuthenticated) {
        return (
            <div className="container" id="sign-in">
                <div className="row">
                    <div className="col s12 m10 push-m1 l8 push-l2 xl6 push-xl3">
                        <Banner location={location} />
                        <SignInForm signInUser={signInUser} />
                    </div>
                </div>
            </div>
        )
    }
    // redirect if user is authenticated
    return <Redirect to={`/account/${user.slug}`} />
}

SignIn.propTypes = {
    auth: PropTypes.object,
    location: PropTypes.object,
    signInUser: PropTypes.func
}

const mapStateToProps = state => ({ auth: state.auth })

const actionCreators = { signInUser }

export default connect(mapStateToProps, actionCreators)(SignIn)
