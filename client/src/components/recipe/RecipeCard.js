// import dependencies
import React from 'react'
import { Link } from 'react-router-dom'

// import components
import HeartAction from './HeartAction'
import VoteAction from './VoteAction'

// import custom hooks
import { useDidMount } from '../../helpers/customHooks'

const RecipeCard = props => {
    // custom hook variables
    const didMount = useDidMount()

    // destructure props
    const {
        isAuthenticated,
        recipe,
        updateRecipe,
        userId
    } = props

    // destructure recipe object
    const {
        createdAt,
        updatedAt,
        // user,
        title,
        description,
        photo,
        ingredients,
        preparation,
        instructions,
        prepTime,
        cookTime,
        shared,
        upVotes,
        downVotes,
        netVotes,
        percentDownVotes,
        percentUpVotes,
        hearts,
        totalHearts,
        tags
    } = recipe
    const recipeId = recipe._id

    return (
        <div className="card recipe-card">
            <Link to={`recipes/${recipe._id}`}>
                {/* <div className="card-image">
                    <img src={recipe.image} alt="" />
                    <span className="card-title">{recipe.title}</span>
                    <button className="btn-floating btn-large halfway-fab amber">
                        <i className="material-icons">favorite_border</i>
                    </button>
                </div> */}
                <div className="card-image">
                    <img src="https://via.placeholder.com/400x300" alt="" />
                    <span className="card-title">{recipe.title}</span>
                </div>
                <div className="card-content">
                    <p>{recipe.description}</p>
                </div>
            </Link>
            <div className="card-action recipe-actions">
                <HeartAction
                    hearts={hearts}
                    isAuthenticated={isAuthenticated}
                    recipeId={recipeId}
                    totalHearts={totalHearts}
                    updateRecipe={updateRecipe}
                    userId={userId}
                />
                <VoteAction
                    downVotes={downVotes}
                    isAuthenticated={isAuthenticated}
                    recipeId={recipeId}
                    netVotes={netVotes}
                    updateRecipe={updateRecipe}
                    upVotes={upVotes}
                    userId={userId}
                />
            </div>
        </div>
    )
}

export default RecipeCard
