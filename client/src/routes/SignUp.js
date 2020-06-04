// import dependencies
import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// import actions
import { signUpUser } from '../actions/authActions'

// import components
import SignUpForm from '../components/auth/SignUpForm'

const SignUp = props => {
    // destructure props
    const {
        auth,
        errors,
        history,
        signUpUser
    } = props

    // destructure auth
    const {
        isAuthenticated,
        user
    } = auth

    // allow access if user is not authenticated
    if (!isAuthenticated) {
        return (
            <div className="container">
                <div className="row">
                    <SignUpForm
                        errors={errors}
                        history={history}
                        signUpUser={signUpUser}
                    />
                </div>
            </div>
        )
    }
    // redirect if user is authenticated
    return <Redirect to={`/account/${user.name}`} />
}

SignUp.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    signUpUser: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(
    mapStateToProps,
    { signUpUser }
)(SignUp)
