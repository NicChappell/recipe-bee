// import dependencies
import React from 'react'
import PropTypes from 'prop-types'

// import components
import RecipeCardList from '../recipe/RecipeCardList'

const Recipes = props => {
    // destructure props
    const {
        auth,
        changeHeart,
        changeVote,
        recipes
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
                        changeHeart={changeHeart}
                        changeVote={changeVote}
                        isAuthenticated={isAuthenticated}
                        recipes={submissions}
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
                        changeHeart={changeHeart}
                        changeVote={changeVote}
                        isAuthenticated={isAuthenticated}
                        recipes={favorites}
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
                        changeHeart={changeHeart}
                        changeVote={changeVote}
                        isAuthenticated={isAuthenticated}
                        recipes={upVoted}
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
                        changeHeart={changeHeart}
                        changeVote={changeVote}
                        isAuthenticated={isAuthenticated}
                        recipes={downVoted}
                        user={user}
                    />
                </div>
            </div>
        </div>
    )
}

Recipes.propTypes = {
    auth: PropTypes.object,
    changeHeart: PropTypes.func,
    changeVote: PropTypes.func,
    recipes: PropTypes.object
}

export default Recipes
