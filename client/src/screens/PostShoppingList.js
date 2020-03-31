// import dependencies
import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// // import actions
// import { createShoppingList } from '../actions/shoppingListActions'

// import components
import CreateShoppingList from '../components/shopping/CreateShoppingList'

const PostShoppingList = props => {
    // destructure props
    const {
        auth,
        utilities
    } = props

    // destructure auth
    const { isAuthenticated } = auth

    // destructure utilities
    const { routerHeight } = utilities

    // allow access if user is not authenticated
    if (isAuthenticated) {
        return (
            <div className="container router" id="create-recipe" style={{ height: routerHeight }}>
                <div className="row">
                    <div className="col s12">
                        <h3>Create New Shopping List</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col s12">
                        <CreateShoppingList />
                    </div>
                </div>
            </div>
        )
    }
    // redirect if user is not authenticated
    return <Redirect to='/sign-in' />
}

PostShoppingList.propTypes = {
    auth: PropTypes.object.isRequired,
    // createShoppingList: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    utilities: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    utilities: state.utilities
})

export default connect(
    mapStateToProps,
    // { createShoppingList }
)(PostShoppingList)
