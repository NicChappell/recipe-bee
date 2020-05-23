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
        action,
        isAuthenticated,
        recipe,
        userId
    } = props

    // destructure recipe object
    const {
        cookTime,
        createdAt,
        description,
        downVotes,
        hearts,
        ingredients,
        instructions,
        netVotes,
        notes,
        percentDownVotes,
        percentUpVotes,
        photo,
        prepTime,
        preparations,
        share,
        slug,
        tagList,
        title,
        totalHearts,
        upVotes,
        updatedAt
        // user
        // _id
    } = recipe
    const recipeUser = recipe.user
    const recipeId = recipe._id

    return (
        <div className="card z-depth-1 recipe-card">
            <Link to={`/recipes/${slug}/${recipeId}`}>
                <div className="card-image">
                    <img alt="" src={`/api/v1/uploads/image/${photo.filename}`} />
                    {/* <span className="card-title">{recipe.title}</span> */}
                </div>
                <div className="card-content">
                    <span className="card-title">{recipe.title}</span>
                    <p>{recipe.description}</p>
                </div>
            </Link>
            <div className="card-action recipe-action">
                <div className="actions">
                    <HeartAction
                        action={action}
                        hearts={hearts}
                        isAuthenticated={isAuthenticated}
                        recipeId={recipeId}
                        totalHearts={totalHearts}
                        userId={userId}
                    />
                    <VoteAction
                        action={action}
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
    action: PropTypes.func,
    isAuthenticated: PropTypes.bool,
    recipe: PropTypes.object,
    userId: PropTypes.string
}

export default RecipeCard
