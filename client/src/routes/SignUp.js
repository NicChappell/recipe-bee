// import dependencies
import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// import components
import SignUpForm from '../components/sign-up/SignUpForm'

const SignUp = props => {
    // destructure props
    const {
        auth,
        history
    } = props

    // destructure auth
    const {
        isAuthenticated,
        user
    } = auth

    // allow access if user is not authenticated
    if (!isAuthenticated) {
        return (
            <div className="container" id="sign-up">
                <div className="row">
                    <div className="col s12 m10 push-m1 l8 push-l2 xl6 push-xl3">
                        <SignUpForm history={history} />
                    </div>
                </div>
            </div>
        )
    }
    // redirect if user is authenticated
    return <Redirect to={`/account/${user.name}`} />
}

SignUp.propTypes = {
    auth: PropTypes.object.isRequired,
    history: PropTypes.object
}

const mapStateToProps = state => ({ auth: state.auth })

const actionCreators = {}

export default connect(mapStateToProps, actionCreators)(SignUp)
