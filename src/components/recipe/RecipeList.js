import React from 'react'

import RecipeCard from './RecipeCard'

function RecipeList({ recipes }) {
    return (
        <div className="container">
            <div className="row">
                {recipes.map(recipe => <RecipeCard recipe={recipe} key={recipe.id} />)}
            </div>
        </div>
    )
}

export default RecipeList
