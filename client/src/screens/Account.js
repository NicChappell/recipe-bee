// import dependencies
import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// import components
import Comms from '../components/account/Comms'
import Details from '../components/account/Details'

const Account = props => {
    console.log(props)
    // destructure props
    const {
        auth,
        errors
    } = props

    // destructure auth
    const {
        isAuthenticated,
        user
    } = auth

    // allow access if user is authenticated
    if (isAuthenticated) {
        return (
            <div className="container">
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
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(
    mapStateToProps
)(Account)
