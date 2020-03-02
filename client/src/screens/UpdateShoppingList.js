// import dependencies
import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const UpdateShoppingList = ({ auth }) => {
    // destructure auth
    const { isAuthenticated } = auth

    // allow access if user is authenticated
    if (isAuthenticated) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col s12">
                        Update Shopping List
                    </div>
                </div>
            </div>
        )
    }
    // redirect if user is not authenticated
    return <Redirect to='/sign-in' />
}

UpdateShoppingList.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(
    mapStateToProps
)(UpdateShoppingList)
