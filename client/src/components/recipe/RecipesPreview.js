// import dependencies
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'

// import components
import RecipeCard from './RecipeCard'
import Preloader from '../utility/Preloader'

const RecipeCardList = props => {
    // destructure props
    const {
        isAuthenticated,
        recipes,
        updateRecipe,
        user
    } = props

    // destructure user
    const { id } = user

    if (!isEmpty(recipes)) {
        return (
            <div className="row recipes-preview">
                <div className="col s12 overflow-x-container">
                    <div className="overflow-x-content">
                        {recipes.map(recipe => {
                            return (
                                <RecipeCard
                                    action={updateRecipe}
                                    isAuthenticated={isAuthenticated}
                                    key={recipe._id}
                                    recipe={recipe}
                                    userId={id}
                                />
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
    return <Preloader />
}

RecipeCardList.propTypes = {
    isAuthenticated: PropTypes.bool,
    recipes: PropTypes.array,
    updateRecipe: PropTypes.func,
    user: PropTypes.object
}

export default RecipeCardList
