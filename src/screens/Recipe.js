import React from 'react'

import recipes from '../data/recipes.json'

function Recipe(props) {
    console.log(props)

    const { params } = props.match
    console.log(params)

    const index = recipes.map(recipe => recipe.id).indexOf(params.id)
    console.log(index)

    const recipe = recipes[index]
    console.log(recipe)

    const ingredients = recipe.ingredients.map(ingredient => <li>{ingredient.quantity} {ingredient.unit} {ingredient.name} {ingredient.misc}</li>)

    const directions = recipe.directions.map(direction => <li>{direction}</li>)

    return (
        <div className="container">
            <div className="row">
                <div className="col s8">
                    <h3>{recipe.title}</h3>
                    <p>{recipe.description}</p>
                </div>
                <div className="col s4">
                    <img alt={recipe.title} className="recipe-photo" src={recipe.photo} />
                </div>
            </div>
            <div className="row">
                <div className="col s6">
                    <h5>Ingredients</h5>
                    <ul>
                        {ingredients}
                    </ul>
                </div>
                <div className="col s6">
                    <h5>Directions</h5>
                    <ol>
                        {directions}
                    </ol>
                </div>
            </div>
        </div>
    )
}

export default Recipe
