import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import RecipesList from '../components/recipe/RecipesList'
import Preloader from '../components/utility/Preloader'

import icon from '../images/icons/icon@4x.png'

const GetRecipes = ({ recipes }) => {
    const [recipesList, setRecipesList] = useState(null)
    const [halvedList, setHalvedList] = useState(null)

    // const getRecipes = async () => {
    //     // const response = await fetch(/* api endpoint goes here */)
    //     // const json = await response.json()
    //     // setRecipes(json)
    // }

    useEffect(() => {
        if (recipesList) {
            const half = Math.ceil(recipesList.length / 2)
            const halvedList = []

            for (let i = 0; i < 2; i++) {
                const startSlice = i * half
                const endSlice = startSlice + half
                const slicedList = recipes.slice(startSlice, endSlice)
                halvedList.push(slicedList)
            }

            setHalvedList(halvedList)
        }
    }, [recipes, recipesList])

    useEffect(() => {
        setTimeout(() => {
            setRecipesList(recipes)
        }, 1000)
    }, [recipes])

    if (recipesList && recipesList.length > 0) {
        return <RecipesList recipes={halvedList} />
    } else if (recipesList && recipesList.length === 0) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col no-recipes s12">
                        <h3>No Recipes Found</h3>
                        <p>You haven't added any recipes yet</p>
                        <img src={icon} alt="" />
                        <Link className="black-text btn lighten-2 orange" to="/recipes/create">
                            Create Recipe
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
    return <Preloader />
}

export default GetRecipes
