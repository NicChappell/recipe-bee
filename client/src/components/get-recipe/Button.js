// import dependencies
import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const Button = props => {
    // destructure props
    const {
        auth,
        recipes
    } = props

    // destructure auth
    const { user } = auth

    // destructure recipes
    const { recipe } = recipes

    // destructure recipe
    const {
        slug,
        user: recipeUser,
        _id: recipeId
    } = recipe

    return (
        <div className="col s12 right-align">
            {user._id === recipeUser._id
                ? <Link to={`/recipes/${slug}/${recipeId}/edit`} className="btn-flat btn-small amber lighten-2 black-text">
                    Edit Recipe
                  </Link>
                : null
            }
        </div>
    )
}

Button.propTypes = {
    auth: PropTypes.object,
    recipes: PropTypes.object
}

export default Button
