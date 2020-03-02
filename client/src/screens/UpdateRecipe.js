// import dependencies
import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const UpdateRecipe = ({ auth }) => {
    // destructure auth
    const { isAuthenticated } = auth

    // allow access if user is authenticated
    if (isAuthenticated) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col s12">
                        Update Recipe
                    </div>
                </div>
            </div>
        )
    }
    // redirect if user is not authenticated
    return <Redirect to='/sign-in' />
}

UpdateRecipe.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(
    mapStateToProps
)(UpdateRecipe)
