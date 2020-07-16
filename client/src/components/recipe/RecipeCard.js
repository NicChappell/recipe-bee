// import dependencies
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

// import components
import HeartAction from './HeartAction'
import VoteAction from './VoteAction'

const RecipeCard = props => {
    // destructure props
    const {
        changeHeart,
        changeVote,
        isAuthenticated,
        recipe,
        userId
    } = props

    // destructure recipe object
    const {
        downVotes,
        hearts,
        netVotes,
        photo,
        slug,
        tagList,
        totalHearts,
        upVotes,
        _id: recipeId
    } = recipe

    return (
        <div className="card recipe-card">
            <Link to={`/recipes/${slug}/${recipeId}`}>
                <div className="card-image">
                    <img alt="" src={`/api/v1/uploads/image/${photo.filename}`} />
                </div>
                <div className="card-content">
                    <h5>{recipe.title}</h5>
                    <p>{recipe.description}</p>
                </div>
            </Link>
            <div className="card-action recipe-action">
                <div className="actions">
                    <HeartAction
                        action={changeHeart}
                        hearts={hearts}
                        isAuthenticated={isAuthenticated}
                        recipeId={recipeId}
                        totalHearts={totalHearts}
                        userId={userId}
                    />
                    <VoteAction
                        action={changeVote}
                        downVotes={downVotes}
                        isAuthenticated={isAuthenticated}
                        recipeId={recipeId}
                        netVotes={netVotes}
                        upVotes={upVotes}
                        userId={userId}
                    />
                </div>
                <div className="tags">
                    {tagList.slice(0, 2).map((tag, i) => <div className="chip amber lighten-2" key={i}>{tag}</div>)}
                    {tagList.slice(2).length ? <div className="chip amber lighten-2">+{tagList.slice(2).length}</div> : null}
                </div>
            </div>
        </div>
    )
}

RecipeCard.propTypes = {
    changeHeart: PropTypes.func,
    changeVote: PropTypes.func,
    isAuthenticated: PropTypes.bool,
    recipe: PropTypes.object,
    userId: PropTypes.string
}

export default RecipeCard
