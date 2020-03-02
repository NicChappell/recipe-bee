// import dependencies
import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// // import actions
// import { createShoppingList } from '../actions/shoppingListActions'

// import components
import CreateShoppingList from '../components/shopping/CreateShoppingList'

const NewShoppingList = props => {
    // destructure props
    const { auth } = props

    // destructure auth
    const { isAuthenticated } = auth

    // allow access if user is not authenticated
    if (isAuthenticated) {
        return (
            <div className="container" id="create-recipe">
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

NewShoppingList.propTypes = {
    auth: PropTypes.object.isRequired,
    // createShoppingList: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(
    mapStateToProps,
    // { createShoppingList }
)(NewShoppingList)
