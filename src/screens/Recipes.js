import React from 'react'

import RecipeList from '../components/recipe/RecipeList'

import recipes from '../data/recipes.json'

function Recipes() {
    return (
        <RecipeList recipes={recipes} />
    )
}

export default Recipes
