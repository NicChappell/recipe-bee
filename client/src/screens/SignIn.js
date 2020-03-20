// import dependencies
import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// import actions
import { signInUser } from '../actions/authActions'

// import components
import SignInForm from '../components/auth/SignInForm'

const SignIn = props => {
    // destructure props
    const {
        auth,
        errors,
        signInUser,
        utilities
    } = props

    // destructure auth
    const {
        isAuthenticated,
        user
    } = auth

    // destructure utilities
    const { routerHeight } = utilities

    // allow access if user is not authenticated
    if (!isAuthenticated) {
        return (
            <div className="container router" style={{ height: routerHeight }}>
                <div className="row">
                    <SignInForm
                        errors={errors}
                        signInUser={signInUser}
                    />
                </div>
            </div>
        )
    }
    // redirect if user is authenticated
    return <Redirect to={`/account/${user.slug}`} />
}

SignIn.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    signInUser: PropTypes.func.isRequired,
    utilities: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    utilities: state.utilities
})

export default connect(
    mapStateToProps,
    { signInUser }
)(SignIn)
