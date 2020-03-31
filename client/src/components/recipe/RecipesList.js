// import dependencies
import React from 'react'
import { isEmpty } from 'lodash'

// import components
import RecipeCard from './RecipeCard'
import Preloader from '../utility/Preloader'

const RecipesList = props => {
    // destructure props
    const {
        isAuthenticated,
        recipes,
        updateRecipe,
        user
    } = props

    // destructure user
    const { id } = user

    if (!isEmpty(recipes[0]) || !isEmpty(recipes[1])) {
        return (
            <div className="row">
                <div className="col s12 m6">
                    {recipes[0].map(recipe => <RecipeCard isAuthenticated={isAuthenticated} key={recipe._id} recipe={recipe} updateRecipe={updateRecipe} userId={id} />)}
                </div>
                <div className="col s12 m6">
                    {recipes[1].map(recipe => <RecipeCard isAuthenticated={isAuthenticated} key={recipe._id} recipe={recipe} updateRecipe={updateRecipe} userId={id} />)}
                </div>
            </div>
        )
    }
    return <Preloader />
}

export default RecipesList
