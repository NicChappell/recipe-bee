// import dependencies
import React from 'react'
import PropTypes from 'prop-types'

// import components
import HeartAction from '../recipe/HeartAction'
import VoteAction from '../recipe/VoteAction'

const Recipe = props => {
    // destructure props
    const {
        auth,
        changeHeart,
        changeVote,
        recipe
    } = props

    // destructure auth
    const {
        isAuthenticated,
        user
    } = auth

    // destructure recipe
    const {
        cookTime,
        description,
        downVotes,
        hearts,
        ingredients,
        instructions,
        netVotes,
        notes,
        photo,
        prepTime,
        preparations,
        production,
        servings,
        tagList,
        title,
        totalHearts,
        upVotes,
        user: recipeUser,
        _id: recipeId
    } = recipe

    return (
        <div className="col s12">
            <div className="card-panel">
                <div className="row">
                    <div className="col s12 m6">
                        <div className="row">
                            <div className="col s12">
                                <h3>{title}</h3>
                            </div>
                            <div className="col s12">
                                <p>Crafted by {recipeUser.fullName}</p>
                            </div>
                            <div className="col s6 m12 l6">
                                <p>
                                    <i className="material-icons left">timer</i>
                                    Prep Time: {prepTime.hours ? `${prepTime.hours} hours` : null} {prepTime.minutes ? `${prepTime.minutes} minutes` : null}
                                </p>
                                <p>
                                    <i className="material-icons left">timer</i>
                                    Cook Time: {cookTime.hours ? `${cookTime.hours} hours` : null} {cookTime.minutes ? `${cookTime.minutes} minutes` : null}
                                </p>
                            </div>
                            <div className="col s6 m12 l6">
                                <p><i className="material-icons left">room_service</i> Servings: {servings}</p>
                                <p><i className="material-icons left">add_circle_outline</i> Yield: {production.quantity} {production.unit} {production.name}</p>
                            </div>
                            <div className="col s12">
                                <p className="flow-text">{description}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col s12 m6">
                        <div className="row">
                            <div className="col s12 recipe-image">
                                <img alt="" src={photo && `/api/v1/uploads/image/${photo.filename}`} />
                            </div>
                            <div className="col s12 recipe-action">
                                <div className="actions">
                                    <HeartAction
                                        action={changeHeart}
                                        hearts={hearts}
                                        isAuthenticated={isAuthenticated}
                                        recipeId={recipeId}
                                        totalHearts={totalHearts}
                                        userId={user._id}
                                    />
                                    <VoteAction
                                        action={changeVote}
                                        downVotes={downVotes}
                                        isAuthenticated={isAuthenticated}
                                        recipeId={recipeId}
                                        netVotes={netVotes}
                                        upVotes={upVotes}
                                        userId={user._id}
                                    />
                                </div>
                                <div className="tags">
                                    {tagList.map((tag, i) => <div className="chip amber lighten-2" key={i}>{tag}</div>)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col s12 m6">
                        <h5>Ingredients</h5>
                        <ul>
                            {ingredients && ingredients.map(ingredient => <li className="ingredient" key={ingredient.id}>{ingredient.quantity} {ingredient.unit} {ingredient.name}</li>)}
                        </ul>
                    </div>
                    <div className="col s12 m6">
                        <h5>Preparations</h5>
                        <ul>
                            {preparations && preparations.map(preparation => <li className="preparation" key={preparation.id}>{preparation.value}</li>)}
                        </ul>
                    </div>
                    <div className="col s12">
                        <h5>Instructions</h5>
                        <ul>
                            {instructions && instructions.map(instruction => <li className="instruction" key={instruction.id}>{instruction.value}</li>)}
                        </ul>
                    </div>
                </div>
                <div className="row">
                    <div className="col s12">
                        <h5>Notes</h5>
                        <p>{notes}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

Recipe.propTypes = {
    auth: PropTypes.object,
    changeHeart: PropTypes.func,
    changeVote: PropTypes.func,
    recipe: PropTypes.object
}

export default Recipe
