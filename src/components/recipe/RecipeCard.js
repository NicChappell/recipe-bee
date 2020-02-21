import React from 'react'
import { Link } from 'react-router-dom'

function RecipeCard({ recipe }) {
    return (
        <div className="card">
            <div className="card-image">
                <img src={recipe.image} alt="" />
                <span className="card-title">{recipe.title}</span>
            </div>
            <div className="card-content">
                <p>{recipe.description}</p>
            </div>
            <div className="card-action">
                <Link className="black-text btn orange lighten-2" to={`recipes/${recipe.id}`}>
                    Details
                </Link>
            </div>
        </div>
    )
}

export default RecipeCard
