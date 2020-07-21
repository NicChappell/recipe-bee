// import dependencies
import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// import actions
import {
    getRecipe,
    updateRecipe
} from '../actions/recipeActions'
import { deleteFile } from '../actions/uploadActions'

// import components
import PutRecipeForm from '../components/recipe/PutRecipeForm'

const PutRecipe = props => {
    // destructure props
    const {
        auth,
        deleteFile,
        errors,
        getRecipe,
        history,
        match,
        recipes,
        tags,
        updateRecipe
    } = props

    // destructure auth
    const {
        isAuthenticated,
        user
    } = auth

    // destructure recipes
    const { recipe } = recipes

    // get recipe after component mount
    useEffect(() => {
        // destructure router props
        const { recipeId } = match.params

        // dispatch getRecipe action
        getRecipe(recipeId)

        // reset recipe when component unmounts
        return () => getRecipe('reset')

		// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // allow access if user is authenticated
    if (isAuthenticated) {
        return (
            <div className="container" id="put-recipe">
                <div className="row center-align">
                    <div className="col s12">
                        <PutRecipeForm
                            recipeAction={updateRecipe}
                            errors={errors}
                            history={history}
                            recipe={recipe}
                            tags={tags}
                            uploadAction={deleteFile}
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

PutRecipe.propTypes = {
    auth: PropTypes.object,
    deleteFile: PropTypes.func,
    errors: PropTypes.object,
    getRecipe: PropTypes.func,
    recipes: PropTypes.object,
    tags: PropTypes.array,
    updateRecipe: PropTypes.func
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    recipes: state.recipes,
    tags: state.tags
})

const actionCreators = {
    deleteFile,
    getRecipe,
    updateRecipe
}

export default connect(mapStateToProps, actionCreators)(PutRecipe)
