// import dependencies
import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// import actions
import { createRecipe } from '../actions/recipeActions'

// import components
import PostRecipeForm from '../components/post-recipe/PostRecipeForm'

const PostRecipe = props => {
    // destructure props
    const {
        auth,
        createRecipe,
        errors,
        history,
        tags
    } = props

    // destructure auth
    const {
        isAuthenticated,
        user
    } = auth

    // allow access if user is authenticated
    if (isAuthenticated) {
        return (
            <div className="container" id="post-recipe">
                <div className="row center-align">
                    <div className="col s12">
                        <PostRecipeForm
                            errors={errors}
                            history={history}
                            recipeAction={createRecipe}
                            tags={tags}
                            user={user}
                        />
                    </div>
                </div>
            </div>
        )
    }
    // redirect if user is not authenticated
    return <Redirect to='/sign-in' />
}

PostRecipe.propTypes = {
    auth: PropTypes.object,
    createRecipe: PropTypes.func,
    errors: PropTypes.object,
    tags: PropTypes.array
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    tags: state.tags
})

const actionCreators = { createRecipe }

export default connect(mapStateToProps, actionCreators)(PostRecipe)
