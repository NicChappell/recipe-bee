import React from 'react'
import { Link } from 'react-router-dom'

import RecipeCard from './RecipeCard'
import Preloader from '../utility/Preloader'

const RecipesList = ({ recipes }) => {
    if (recipes) {
        return (
            <div className="container">
                <div className="row">
                    {/* {recipes.map((half, index) => {
                        return (
                            <div className="col s12 m6" key={index}>
                                <div className="card center-align grey darken-1">
                                    <div className="card-content white-text">
                                        <p className="flow-text">RecipeBee keeps track of your favorite recipes and generates shopping lists to make meal planning easy and fun</p>
                                    </div>
                                    <div className="card-action create-buttons">
                                        <Link className="black-text btn create-recipe lighten-2 orange" to="/recipes/create">
                                            Create Recipe
                                    </Link>
                                        <Link className="black-text btn create-shopping-list lighten-2 orange" to="/recipes/create">
                                            Shopping Lists
                                    </Link>
                                    </div>
                                </div>
                                {half.map(recipe => <RecipeCard recipe={recipe} key={recipe.id} />)}
                            </div>
                        )
                    })} */}
                    <div className="col s12 m6">
                        <div className="card grey darken-1">
                            <div className="card-content white-text">
                                <p className="flow-text">RecipeBee keeps track of your favorite recipes and generates shopping lists to make meal planning easy and fun</p>
                            </div>
                            <div className="card-action create-buttons">
                                <Link className="black-text btn create-recipe lighten-2 orange" to="/recipes/create">
                                    Create Recipe
                                </Link>
                                <Link className="black-text btn create-shopping-list lighten-2 orange" to="/shopping-lists">
                                    Shopping Lists
                                </Link>
                            </div>
                        </div>
                        {recipes[1].map(recipe => <RecipeCard recipe={recipe} key={recipe.id} />)}
                    </div>
                    <div className="col s12 m6">
                        {recipes[0].map(recipe => <RecipeCard recipe={recipe} key={recipe.id} />)}
                    </div>
                </div>
            </div>
        )
    }
    return <Preloader />
}

export default RecipesList
