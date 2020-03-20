// import dependencies
import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// import components
import Comms from '../components/account/Comms'
import Details from '../components/account/Details'

const Account = props => {
    // destructure props
    const {
        auth,
        errors,
        utilities
    } = props
    console.log(errors)

    // destructure auth
    const {
        isAuthenticated,
        user
    } = auth

    // destructure utilities
    const { routerHeight } = utilities

    // allow access if user is authenticated
    if (isAuthenticated) {
        return (
            <div className="container router" style={{ height: routerHeight }}>
                <Details user={user} />
                <Comms />
            </div>
        )
    }
    // redirect if user is not authenticated
    return <Redirect to='/sign-in' />
}

Account.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    utilities: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    utilities: state.utilities
})

export default connect(
    mapStateToProps
)(Account)
