// import dependencies
import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'

// // import actions
// import { createRecipe } from '../actions/recipeActions'
import { getTags } from '../actions/tagActions'

// import components
import CreateRecipe from '../components/recipe/CreateRecipe'

const PostRecipe = props => {
    // destructure props
    const {
        auth,
        addRecipe,
        getTags,
        history,
        tags,
        utilities
    } = props

    // destructure auth
    const { isAuthenticated } = auth

    // destructure utilities
    const { routerHeight } = utilities

    // get tags after component mount
    useEffect(() => {
        if (isEmpty(tags)) {
            getTags()
        }
    }, [])

    // allow access if user is authenticated
    if (isAuthenticated) {
        return (
            <div className="container router" id="post-recipe" style={{ height: routerHeight }}>
                <div className="row">
                    <div className="col s12">
                        <CreateRecipe
                            addRecipe={addRecipe}
                            history={history}
                            tags={tags}
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
    auth: PropTypes.object.isRequired,
    // createRecipe: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    getTags: PropTypes.func.isRequired,
    tags: PropTypes.array.isRequired,
    utilities: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    tags: state.tags,
    utilities: state.utilities
})

export default connect(
    mapStateToProps,
    { /* createRecipe, */ getTags }
)(PostRecipe)
