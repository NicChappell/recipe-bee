// import dependencies
import React from 'react'

// import components
import RecipeCardList from '../recipe/RecipeCardList'

const Recipes = props => {
    // destructure props
    const {
        auth,
        recipes,
        updateRecipe
    } = props

    // destructure auth
    const {
        isAuthenticated,
        user
    } = auth

    // destructure recipes
    const { userRecipes } = recipes

    // destructure userRecipes
    const {
        downVoted,
        favorites,
        submissions,
        upVoted
    } = userRecipes

    return (
        <div className="card-panel">
            <div className="row">
                <div className="col s12">
                    <h5>Your Recipes</h5>
                </div>
                <div className="col s12">
                    <RecipeCardList
                        isAuthenticated={isAuthenticated}
                        recipes={submissions}
                        updateRecipe={updateRecipe}
                        user={user}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col s12">
                    <h5>Favorite Recipes</h5>
                </div>
                <div className="col s12">
                    <RecipeCardList
                        isAuthenticated={isAuthenticated}
                        recipes={favorites}
                        updateRecipe={updateRecipe}
                        user={user}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col s12">
                    <h5>Up-Voted Recipes</h5>
                </div>
                <div className="col s12">
                    <RecipeCardList
                        isAuthenticated={isAuthenticated}
                        recipes={upVoted}
                        updateRecipe={updateRecipe}
                        user={user}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col s12">
                    <h5>Down-Voted Recipes</h5>
                </div>
                <div className="col s12">
                    <RecipeCardList
                        isAuthenticated={isAuthenticated}
                        recipes={downVoted}
                        updateRecipe={updateRecipe}
                        user={user}
                    />
                </div>
            </div>
        </div>
    )
}

export default Recipes
