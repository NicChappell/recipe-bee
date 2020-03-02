// import dependencies
import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// // import actions
// import { createRecipe } from '../actions/recipeActions'

// import components
import CreateRecipe from '../components/recipe/CreateRecipe'

const NewRecipe = props => {
    // destructure props
    const {
        auth,
        addRecipe,
        history
    } = props

    // destructure auth
    const { isAuthenticated } = auth

    // allow access if user is not authenticated
    if (isAuthenticated) {
        return (
            <div className="container" id="create-recipe">
                <div className="row">
                    <div className="center-align col s12">
                        <h3>Create New Recipe</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col s12">
                        <CreateRecipe
                            addRecipe={addRecipe}
                            history={history}
                        />
                    </div>
                </div>
            </div>
        )
    }
    // redirect if user is not authenticated
    return <Redirect to='/sign-in' />
}

NewRecipe.propTypes = {
    auth: PropTypes.object.isRequired,
    // createRecipe: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(
    mapStateToProps,
    // { createRecipe }
)(NewRecipe)
