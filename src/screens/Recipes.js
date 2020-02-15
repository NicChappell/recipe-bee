import React, { useEffect, useState } from 'react'

// recipe components
import CreateRecipe from '../components/recipe/CreateRecipe'
import RecipeList from '../components/recipe/RecipeList'
// utility components
import Preloader from '../components/utility/Preloader'

import json from '../data/recipes.json'

const Recipes = () => {
    const [recipes, setRecipes] = useState([])

    const addRecipe = recipe => {
        // console.log(recipes)
        // console.log(recipe)
        setRecipes([...recipes, recipe])
    }

    // const getRecipes = async () => {
    //     // const response = await fetch(/* api endpoint goes here */)
    //     // const json = await response.json()
    //     // setRecipes(json)
    // }

    const getRecipes = recipes => setRecipes(recipes)

    useEffect(() => {
        const recipes = json
        setTimeout(() => {
            getRecipes(recipes)
        }, 1000)
    }, [])

    if (recipes.length > 0) {
        return (
            <div>
                <CreateRecipe addRecipe={addRecipe} />
                <RecipeList recipes={recipes} />
            </div>
        )
    }
    return <Preloader />
}

export default Recipes
